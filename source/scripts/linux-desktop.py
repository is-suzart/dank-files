#!/usr/bin/env python3
"""GIO/GDK desktop APIs for the Node app. No shell commands or privileged actions."""
import json, sys, threading
import gi
gi.require_version('Gtk', '4.0')
from gi.repository import Gio, GLib, Gdk, Gtk

loop = GLib.MainLoop()
lock = threading.Lock()
try:
    Gtk.init()
    display = Gdk.Display.get_default()
except Exception:
    display = None
clipboard = display.get_clipboard() if display else None

def emit(value):
    with lock:
        print(json.dumps(value, ensure_ascii=False), flush=True)

def reply(request, value=None, error=None):
    emit({'id': request['id'], 'value': value, 'error': str(error) if error else None})

def changed(*_):
    formats = clipboard.get_formats()
    emit({'event': 'clipboard', 'available': any(formats.contain_mime_type(t) for t in ['x-special/gnome-copied-files', 'text/uri-list'])})

if clipboard:
    clipboard.connect('changed', changed)
    changed()

def file_for(value):
    if not isinstance(value, str) or not value or '\0' in value:
        raise ValueError('Invalid file location')
    return Gio.File.new_for_uri(value) if '://' in value else Gio.File.new_for_path(value)

def handle(request):
    try:
        action = request.get('action')
        if action == 'clipboard-write':
            if not clipboard: raise ValueError('Desktop clipboard unavailable')
            urls = request.get('urls', [])
            if not isinstance(urls, list) or len(urls) > 10000 or any(not isinstance(u,str) or not u.startswith('file://') or '\n' in u or '\r' in u for u in urls):
                raise ValueError('Invalid file clipboard')
            mode = request.get('mode')
            if mode not in ['copy','move']: raise ValueError('Invalid clipboard action')
            if not urls:
                clipboard.set_content(None)
            else:
                data = [('x-special/gnome-copied-files', ('cut' if mode == 'move' else 'copy')+'\n'+'\n'.join(urls)+'\n'),
                        ('text/uri-list', '\r\n'.join(urls)+'\r\n'), ('application/x-kde-cutselection', '1' if mode == 'move' else '0')]
                clipboard.set_content(Gdk.ContentProvider.new_union([Gdk.ContentProvider.new_for_bytes(t, GLib.Bytes.new(v.encode())) for t,v in data]))
            reply(request, True)
        elif action == 'clipboard-read':
            if not clipboard: raise ValueError('Desktop clipboard unavailable')
            if not any(clipboard.get_formats().contain_mime_type(t) for t in ['x-special/gnome-copied-files','text/uri-list']):
                reply(request, None); return False
            def opened(source, result):
                try:
                    stream, mime = source.read_finish(result)
                    chunks = bytearray()
                    def received(stream, result):
                        try:
                            data = stream.read_bytes_finish(result).get_data()
                            if data:
                                chunks.extend(data)
                                if len(chunks) > 2*1024*1024: raise ValueError('Clipboard too large')
                                stream.read_bytes_async(65536, GLib.PRIORITY_DEFAULT, None, received); return
                            stream.close(None)
                            lines = chunks.decode('utf8').splitlines()
                            mode = 'copy'
                            if mime == 'x-special/gnome-copied-files':
                                if not lines or lines[0] not in ['copy','cut']: raise ValueError('Invalid clipboard format')
                                mode = 'move' if lines.pop(0) == 'cut' else 'copy'
                            urls = list(dict.fromkeys(line for line in lines if line and not line.startswith('#')))
                            if len(urls)>10000: raise ValueError('Clipboard too large')
                            reply(request, {'urls':urls,'mode':mode})
                        except Exception as e:
                            stream.close(None);reply(request,error=e)
                    stream.read_bytes_async(65536, GLib.PRIORITY_DEFAULT, None, received)
                except Exception as e: reply(request,error=e)
            clipboard.read_async(['x-special/gnome-copied-files','text/uri-list'],GLib.PRIORITY_DEFAULT,None,opened)
        elif action == 'resolve':
            file = file_for(request.get('uri'))
            def complete():
                path = file.get_path()
                if not path: raise ValueError('A localização requer um backend GVfs com acesso FUSE.')
                reply(request,path)
            try:
                if file.get_path() and file.query_exists(None): complete()
                else:
                    operation = Gtk.MountOperation.new(None) if display else Gio.MountOperation()
                    def mounted(source, result):
                        try:
                            source.mount_enclosing_volume_finish(result);complete()
                        except GLib.Error as e:
                            if e.matches(Gio.io_error_quark(),Gio.IOErrorEnum.ALREADY_MOUNTED):
                                try: complete()
                                except Exception as e:reply(request,error=e)
                            else:reply(request,error=e)
                        except Exception as e: reply(request,error=e)
                    file.mount_enclosing_volume(Gio.MountMountFlags.NONE,operation,None,mounted)
            except Exception as e: reply(request,error=e)
        elif action == 'quit':
            reply(request,True);loop.quit()
        else: raise ValueError('Unknown desktop action')
    except Exception as e: reply(request,error=e)
    return False

xml='''<node><interface name="org.freedesktop.FileManager1">
<method name="ShowFolders"><arg type="as" direction="in"/><arg type="s" direction="in"/></method>
<method name="ShowItems"><arg type="as" direction="in"/><arg type="s" direction="in"/></method>
<method name="ShowItemProperties"><arg type="as" direction="in"/><arg type="s" direction="in"/></method>
</interface></node>'''
def bus_ready(connection, name):
    def called(connection, sender, path, interface, method, params, invocation):
        urls, startup = params.unpack()
        if len(urls)>1000:
            invocation.return_dbus_error('org.freedesktop.DBus.Error.InvalidArgs','Too many locations');return
        emit({'event':'reveal','method':method,'urls':urls})
        invocation.return_value(GLib.Variant('()',()))
    connection.register_object('/org/freedesktop/FileManager1',Gio.DBusNodeInfo.new_for_xml(xml).interfaces[0],called,None,None)
if '--dbus' in sys.argv[1:]:
    Gio.bus_own_name(Gio.BusType.SESSION,'org.freedesktop.FileManager1',Gio.BusNameOwnerFlags.DO_NOT_QUEUE,bus_ready,
                    lambda *_:emit({'event':'dbus','owned':True}),lambda *_:emit({'event':'dbus','owned':False}))

def read_input():
    for line in sys.stdin:
        try:
            if len(line)>3*1024*1024: raise ValueError('Request too large')
            request=json.loads(line)
            if not isinstance(request,dict) or not isinstance(request.get('id'),int): raise ValueError('Invalid request')
            GLib.idle_add(handle,request)
        except Exception as e: emit({'event':'error','error':str(e)})
    GLib.idle_add(loop.quit)
threading.Thread(target=read_input,daemon=True).start()
loop.run()

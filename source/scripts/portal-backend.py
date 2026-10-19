#!/usr/bin/env python3
"""Dank Files' FileChooser implementation. UI runs in one isolated process group per request."""
import json
import os
from pathlib import Path
import shutil
import signal
import stat
import subprocess
import sys
import tempfile
from urllib.parse import unquote, urlsplit
import gi
from gi.repository import Gio, GLib

BUS = 'org.freedesktop.impl.portal.desktop.dankfiles'
PATH = '/org/freedesktop/portal/desktop'
IFACE = 'org.freedesktop.impl.portal.FileChooser'
REQUEST_IFACE = 'org.freedesktop.impl.portal.Request'
METHOD_ARGS = '<arg type="o" direction="in"/><arg type="s" direction="in"/><arg type="s" direction="in"/><arg type="s" direction="in"/><arg type="a{sv}" direction="in"/><arg type="u" direction="out"/><arg type="a{sv}" direction="out"/>'
XML = '<node><interface name="'+IFACE+'">'+''.join('<method name="'+method+'">'+METHOD_ARGS+'</method>' for method in ['OpenFile','SaveFile','SaveFiles'])+'<property name="version" type="u" access="read"/></interface></node>'
REQUEST_XML = '<node><interface name="'+REQUEST_IFACE+'"><method name="Close"/></interface></node>'


def unpack(value):
    if isinstance(value, GLib.Variant): return unpack(value.unpack())
    if isinstance(value, (bytes, bytearray, tuple, list)): return [unpack(item) for item in value]
    if isinstance(value, dict): return {key: unpack(item) for key, item in value.items()}
    return value


def results_variant(results):
    values = {}
    uris = results.get('uris', [])
    if not isinstance(uris, list) or not uris or len(uris)>4096: raise ValueError('Invalid URI result')
    for uri in uris:
        if not isinstance(uri, str) or len(uri)>32768: raise ValueError('Invalid URI result')
        parsed = urlsplit(uri)
        if parsed.scheme!='file' or parsed.netloc or not parsed.path.startswith('/') or '\0' in unquote(parsed.path) or parsed.query or parsed.fragment:
            raise ValueError('Chooser results must contain local file URIs')
    values['uris'] = GLib.Variant('as', uris)
    if 'choices' in results:
        choices = results['choices']
        if not isinstance(choices,list) or len(choices)>64 or any(not isinstance(pair,list) or len(pair)!=2 or any(not isinstance(v,str) for v in pair) for pair in choices): raise ValueError('Invalid choice result')
        values['choices'] = GLib.Variant('a(ss)', choices)
    if 'current_filter' in results:
        item = results['current_filter']
        if isinstance(item,dict): item = [item['name'], [[0,p] for p in item.get('patterns',[])] + [[1,m] for m in item.get('mimeTypes',[])]]
        if not isinstance(item,list) or len(item)!=2 or not isinstance(item[0],str) or not isinstance(item[1],list): raise ValueError('Invalid filter result')
        if any(not isinstance(rule,list) or len(rule)!=2 or rule[0] not in [0,1] or not isinstance(rule[1],str) for rule in item[1]): raise ValueError('Invalid filter result')
        values['current_filter'] = GLib.Variant('(sa(us))', (item[0],item[1]))
    if 'writable' in results:
        if not isinstance(results['writable'],bool): raise ValueError('Invalid writable result')
        values['writable'] = GLib.Variant('b',results['writable'])
    return values


class Request:
    def __init__(self, service, sender, handle, method, app, parent, title, options, invocation):
        self.service,self.sender,self.handle,self.invocation = service,sender,handle,invocation
        self.directory = Path(tempfile.mkdtemp(prefix='request-',dir=service.directory))
        self.result = self.directory/'result.json'
        request = self.directory/'request.json'
        self.method,self.options = method,options
        payload = {'method':method,'appId':app,'parentWindow':parent,'title':title,'options':options,'resultFile':str(self.result)}
        with request.open('x',encoding='utf8') as file: json.dump(payload,file,ensure_ascii=False)
        request.chmod(0o600)
        self.registration = service.connection.register_object(handle,Gio.DBusNodeInfo.new_for_xml(REQUEST_XML).interfaces[0],self.close_call,None,None)
        self.process,self.timer,self.finished = None,None,False
        try:
            env = {**os.environ,'DANK_FILES_PORTAL_REQUEST':str(request),'NANDOMO_FM_DESKTOP_INTEGRATION':'0'}
            self.process = subprocess.Popen([*service.chooser,str(request)],env=env,start_new_session=True,stdin=subprocess.DEVNULL,stdout=sys.stderr)
            service.children.add(self.process)
            self.timer = GLib.timeout_add(60,self.poll)
        except OSError as error:
            print('Dank Files chooser launch failed:',error,file=sys.stderr,flush=True)
            self.finish(2)

    def close_call(self, connection, sender, path, interface, method, parameters, invocation):
        if sender!=self.sender:
            invocation.return_dbus_error('org.freedesktop.DBus.Error.AccessDenied','Only the requesting portal can close this request');return
        invocation.return_value(GLib.Variant('()',()))
        self.finish(1)

    def poll(self):
        if self.finished: return GLib.SOURCE_REMOVE
        if self.result.exists():
            try:
                info=self.result.lstat()
                if not stat.S_ISREG(info.st_mode) or info.st_size>1024*1024: raise ValueError('Invalid result file')
                answer=json.loads(self.result.read_text(encoding='utf8'))
                response=answer.get('response')
                if type(response) is not int or response not in [0,1,2]: raise ValueError('Invalid response')
                results=answer.get('results',{})
                if not isinstance(results,dict): raise ValueError('Invalid results')
                self.finish(response,results_variant(results) if response==0 else {})
            except (OSError,ValueError,TypeError,KeyError) as error:
                print('Dank Files invalid chooser result:',error,file=sys.stderr,flush=True);self.finish(2)
            return GLib.SOURCE_REMOVE
        if self.process and self.process.poll() is not None:
            self.finish(1 if self.process.returncode==0 else 2)
            return GLib.SOURCE_REMOVE
        return GLib.SOURCE_CONTINUE

    def finish(self,response,results=None):
        if self.finished:return
        self.finished=True
        if self.timer:GLib.source_remove(self.timer);self.timer=None
        if self.process:
            try:os.killpg(self.process.pid,signal.SIGTERM)
            except ProcessLookupError:pass
            process=self.process
            def reap():
                self.service.children.discard(process)
                if process.poll() is None:
                    try:os.killpg(process.pid,signal.SIGKILL)
                    except ProcessLookupError:pass
                    GLib.timeout_add(100,lambda: process.poll() is None)
                return GLib.SOURCE_REMOVE
            GLib.timeout_add(800,reap)
        self.service.connection.unregister_object(self.registration)
        self.service.requests.pop(self.handle,None)
        self.invocation.return_value(GLib.Variant('(ua{sv})',(response,results or {})))
        shutil.rmtree(self.directory,ignore_errors=True)


class Service:
    def __init__(self,chooser):
        self.chooser=chooser or [os.environ.get('NANDOMO_FM_NODE','node'),str(Path(__file__).with_name('portal-launch.mjs'))]
        self.directory=Path(tempfile.mkdtemp(prefix='dank-files-portal-',dir=os.environ.get('XDG_RUNTIME_DIR') or None))
        self.children=set();self.requests={};self.loop=GLib.MainLoop();self.connection=Gio.bus_get_sync(Gio.BusType.SESSION,None)

    def call(self,connection,sender,path,interface,method,parameters,invocation):
        handle,app,parent,title,options=parameters.unpack()
        if not handle.startswith('/org/freedesktop/portal/desktop/request/') or len(title)>4096 or len(app)>1024 or len(parent)>4096:
            invocation.return_dbus_error('org.freedesktop.DBus.Error.InvalidArgs','Invalid chooser request');return
        if handle in self.requests or len(self.requests)>=16:
            invocation.return_dbus_error('org.freedesktop.DBus.Error.LimitsExceeded','Too many chooser requests');return
        options=unpack(options)
        if len(json.dumps(options))>1024*1024:
            invocation.return_dbus_error('org.freedesktop.DBus.Error.LimitsExceeded','Chooser options are too large');return
        request=Request(self,sender,handle,method,app,parent,title,options,invocation)
        if not request.finished:self.requests[handle]=request

    def vanished(self,connection,sender,path,interface,name,parameters):
        owner,old,new=parameters.unpack()
        if not new:
            for request in list(self.requests.values()):
                if request.sender==owner:request.finish(1)

    def stop(self,*args):
        for request in list(self.requests.values()):request.finish(1)
        self.loop.quit();return GLib.SOURCE_REMOVE

    def run(self):
        self.connection.register_object(PATH,Gio.DBusNodeInfo.new_for_xml(XML).interfaces[0],self.call,lambda *args:GLib.Variant('u',3),None)
        self.connection.signal_subscribe('org.freedesktop.DBus','org.freedesktop.DBus','NameOwnerChanged','/org/freedesktop/DBus',None,Gio.DBusSignalFlags.NONE,self.vanished)
        Gio.bus_own_name_on_connection(self.connection,BUS,Gio.BusNameOwnerFlags.DO_NOT_QUEUE,None,lambda *args:self.stop())
        GLib.unix_signal_add(GLib.PRIORITY_DEFAULT,signal.SIGTERM,self.stop)
        GLib.unix_signal_add(GLib.PRIORITY_DEFAULT,signal.SIGINT,self.stop)
        print('Dank Files portal ready',file=sys.stderr,flush=True)
        try:self.loop.run()
        finally:
            for process in self.children:
                try:process.wait(timeout=.2)
                except subprocess.TimeoutExpired:
                    try:os.killpg(process.pid,signal.SIGKILL)
                    except ProcessLookupError:pass
                    process.wait(timeout=1)
            shutil.rmtree(self.directory,ignore_errors=True)

if __name__=='__main__':Service(sys.argv[1:]).run()

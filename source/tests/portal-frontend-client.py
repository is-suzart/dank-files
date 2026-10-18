"""The public desktop portal forwards a request to our implementation on a private bus."""
import os,sys,time,tempfile,subprocess,shutil
from pathlib import Path
from gi.repository import Gio,GLib
root=Path(tempfile.mkdtemp(prefix='dank-frontend-'))
children=[]
try:
 data=root/'data/xdg-desktop-portal/portals';data.mkdir(parents=True)
 (data/'dank-files.portal').write_text('[portal]\nDBusName=org.freedesktop.impl.portal.desktop.dankfiles\nInterfaces=org.freedesktop.impl.portal.FileChooser;\nUseIn=niri;\n')
 config=root/'config/xdg-desktop-portal';config.mkdir(parents=True)
 (config/'portals.conf').write_text('[preferred]\ndefault=dank-files\norg.freedesktop.impl.portal.FileChooser=dank-files\n')
 native=os.environ.get('PORTAL_NATIVE_APP')
 folder=Path(os.environ['PORTAL_NATIVE_FOLDER']) if native else root
 fixture=folder/'sub/photo.png' if native else root/'test.png'
 if not native:fixture.write_text('fixture')
 env={**os.environ,'XDG_DATA_HOME':str(root/'data'),'XDG_CONFIG_HOME':str(root/'config'),'XDG_CURRENT_DESKTOP':'niri','XDG_DESKTOP_PORTAL_DIR':str(data),'PORTAL_TEST_FILE':str(fixture)}
 connection=Gio.bus_get_sync(Gio.BusType.SESSION,None)
 def wait(name,process):
  for _ in range(150):
   owner=connection.call_sync('org.freedesktop.DBus','/org/freedesktop/DBus','org.freedesktop.DBus','NameHasOwner',GLib.Variant('(s)',(name,)),None,Gio.DBusCallFlags.NONE,1000,None).unpack()[0]
   if owner:return
   if process.poll() is not None:raise AssertionError('process exited: '+process.stderr.read())
   time.sleep(.03)
  raise AssertionError('Timed out waiting for '+name)
 launcher=str(Path(native)/'portal-launch.mjs') if native else sys.argv[2]
 backend=subprocess.Popen(['python3',sys.argv[1],os.environ['PORTAL_TEST_NODE'],launcher],env=env,stderr=subprocess.PIPE,text=True);children.append(backend)
 wait('org.freedesktop.impl.portal.desktop.dankfiles',backend)
 frontend=subprocess.Popen(['/usr/lib/xdg-desktop-portal','--verbose'],env=env,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE,text=True);children.append(frontend)
 wait('org.freedesktop.portal.Desktop',frontend)
 loop=GLib.MainLoop();answers=[]
 def response(conn,sender,path,interface,name,params):answers.append(params.unpack());loop.quit()
 connection.signal_subscribe(None,'org.freedesktop.portal.Request','Response',None,None,Gio.DBusSignalFlags.NONE,response)
 request=connection.call_sync('org.freedesktop.portal.Desktop','/org/freedesktop/portal/desktop','org.freedesktop.portal.FileChooser','OpenFile',GLib.Variant('(ssa{sv})',('','Private portal test',{'handle_token':GLib.Variant('s','danktest'),'current_folder':GLib.Variant('ay',list(os.fsencode(folder)+b'\0')),'filters':GLib.Variant('a(sa(us))',[('Images',[(0,'*.png')])])})),None,Gio.DBusCallFlags.NONE,5000,None).unpack()[0]
 assert request.startswith('/org/freedesktop/portal/desktop/request/')
 timer=GLib.timeout_add(20000,lambda:(loop.quit(),False)[1]);loop.run()
 if answers:GLib.source_remove(timer)
 assert answers and answers[0][0]==0,answers
 assert answers[0][1]['uris']==[fixture.as_uri()],answers
 print('PORTAL_FRONTEND_PASS')
finally:
 for child in reversed(children):
  child.terminate()
  try:child.wait(timeout=2)
  except subprocess.TimeoutExpired:child.kill();child.wait()
  if os.environ.get('PORTAL_NATIVE_APP') and child is children[0]:print(child.stderr.read(),file=sys.stderr)
 shutil.rmtree(root,ignore_errors=True)

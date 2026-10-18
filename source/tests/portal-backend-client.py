import os,sys,time,tempfile,subprocess,shutil
from pathlib import Path
from gi.repository import Gio,GLib
BUS='org.freedesktop.impl.portal.desktop.dankfiles'
PATH='/org/freedesktop/portal/desktop'
IFACE='org.freedesktop.impl.portal.FileChooser'
HANDLE='/org/freedesktop/portal/desktop/request/test/'
root=Path(tempfile.mkdtemp(prefix='dank-portal-test-'))
env={**os.environ,'HOME':str(root),'XDG_RUNTIME_DIR':str(root),'XDG_DATA_HOME':str(root/'data'),'XDG_CONFIG_HOME':str(root/'config'),'PORTAL_TEST_FILE':str(root/'a ç.png')}
(root/'a ç.png').write_text('fixture')
child=subprocess.Popen(['python3',sys.argv[1],os.environ['PORTAL_TEST_NODE'],sys.argv[2]],env=env,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE,text=True)
connection=Gio.bus_get_sync(Gio.BusType.SESSION,None)
try:
 for _ in range(100):
  value=connection.call_sync('org.freedesktop.DBus','/org/freedesktop/DBus','org.freedesktop.DBus','NameHasOwner',GLib.Variant('(s)',(BUS,)),GLib.VariantType.new('(b)'),Gio.DBusCallFlags.NONE,1000,None).unpack()[0]
  if value:break
  if child.poll() is not None:raise AssertionError(child.stderr.read())
  time.sleep(.03)
 else:raise AssertionError('backend did not register')
 version=connection.call_sync(BUS,PATH,'org.freedesktop.DBus.Properties','Get',GLib.Variant('(ss)',(IFACE,'version')),None,Gio.DBusCallFlags.NONE,1000,None).unpack()[0]
 assert version==3,version
 def request(method='OpenFile',token='one',title='open',options=None,after=None):
  options=options or {};loop=GLib.MainLoop();answers=[]
  def done(conn,result):
   try:answers.append(conn.call_finish(result).unpack())
   except GLib.Error as error:answers.append(error)
   loop.quit()
  connection.call(BUS,PATH,IFACE,method,GLib.Variant('(osssa{sv})',(HANDLE+token,'org.test.App','',title,options)),GLib.VariantType.new('(ua{sv})'),Gio.DBusCallFlags.NONE,5000,None,done)
  if after:GLib.timeout_add(150,after)
  timed=[False]
  def timeout():timed[0]=True;loop.quit();return False
  timer=GLib.timeout_add(6000,timeout);loop.run()
  if not timed[0]:GLib.source_remove(timer)
  assert answers, 'backend call did not finish'
  return answers[0]
 response,results=request(options={'filters':GLib.Variant('a(sa(us))',[('Images',[(0,'*.png'),(1,'image/png')])]),'choices':GLib.Variant('a(ssa(ss)s)',[('toggle','Label',[],'true')]),'current_folder':GLib.Variant('ay',list(os.fsencode(root)+b'\0'))})
 assert response==0 and results['uris'][0].startswith('file:///') and '%C3%A7' in results['uris'][0],(response,results)
 assert results['choices']==[('toggle','true')],results
 assert results['current_filter']==('Images',[(0,'*.png'),(1,'image/png')]),results
 for method in ['SaveFile','SaveFiles']:
  response,_=request(method,token=method,options={'current_name':GLib.Variant('s','name.txt')} if method=='SaveFile' else {'files':GLib.Variant('aay',[list(b'a.txt\0'),list(b'b.txt\0')])})
  assert response==0,(method,response)
 response,_=request(token='invalid',title='bad-result');assert response==2,response
 def close():
  connection.call_sync(BUS,HANDLE+'cancel','org.freedesktop.impl.portal.Request','Close',None,None,Gio.DBusCallFlags.NONE,1000,None);return False
 response,_=request(token='cancel',title='wait',after=close);assert response==1,response
 # A second request completes while the first is still waiting; Close only cancels its own handle.
 first=[];loop=GLib.MainLoop()
 def done_first(conn,result):first.append(conn.call_finish(result).unpack());loop.quit()
 connection.call(BUS,PATH,IFACE,'OpenFile',GLib.Variant('(osssa{sv})',(HANDLE+'parallel','org.test.App','','wait',{})),None,Gio.DBusCallFlags.NONE,5000,None,done_first)
 response,_=request(token='parallel2');assert response==0 and not first
 connection.call_sync(BUS,HANDLE+'parallel','org.freedesktop.impl.portal.Request','Close',None,None,Gio.DBusCallFlags.NONE,1000,None)
 limit=GLib.timeout_add(2000,lambda:(loop.quit(),False)[1]);loop.run();GLib.source_remove(limit)
 assert first[0][0]==1,first
 # Losing the caller's bus connection cancels and cleans its outstanding request.
 address=os.environ['DBUS_SESSION_BUS_ADDRESS'];other=Gio.DBusConnection.new_for_address_sync(address,Gio.DBusConnectionFlags.AUTHENTICATION_CLIENT|Gio.DBusConnectionFlags.MESSAGE_BUS_CONNECTION,None,None)
 other.call(BUS,PATH,IFACE,'OpenFile',GLib.Variant('(osssa{sv})',(HANDLE+'disconnect','org.test.App','','wait',{})),None,Gio.DBusCallFlags.NONE,5000,None,lambda *_:None)
 time.sleep(.1);other.close_sync(None);time.sleep(.2)
 assert not list(root.glob('dank-files-portal-*/request-*')),'request storage leaked'
 print('PORTAL_BACKEND_PASS: delayed replies, version, choices/filters, save methods, cancellation, concurrency, disconnect and URI validation')
finally:
 child.terminate()
 try:child.wait(timeout=2)
 except subprocess.TimeoutExpired:child.kill();child.wait()
 errors=child.stderr.read()
 if 'Traceback' in errors:print(errors,file=sys.stderr)
 shutil.rmtree(root)

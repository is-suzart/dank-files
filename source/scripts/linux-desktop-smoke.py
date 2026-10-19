#!/usr/bin/env python3
"""Run with dbus-run-session; never claims the real session name or clipboard."""
import json, os, pathlib, queue, subprocess, sys, tempfile, threading
with tempfile.TemporaryDirectory(prefix='nandomo-linux-desktop-') as root:
    env=dict(os.environ,HOME=root,XDG_CONFIG_HOME=root+'/config',XDG_DATA_HOME=root+'/data',GDK_BACKEND='x11',DISPLAY='',WAYLAND_DISPLAY='')
    file=pathlib.Path(root)/'fixture.txt';file.write_text('preserve')
    dbus='--dbus' in sys.argv[1:]
    child=subprocess.Popen(['python3',str(pathlib.Path(__file__).with_name('linux-desktop.py'))]+(['--dbus'] if dbus else []),stdin=subprocess.PIPE,stdout=subprocess.PIPE,stderr=subprocess.PIPE,text=True,env=env)
    events=queue.Queue();logs=[]
    def output():
        for line in child.stdout:
            try:events.put(json.loads(line))
            except Exception:logs.append(line)
    def errors():
        for line in child.stderr:logs.append(line)
    threading.Thread(target=output,daemon=True).start();threading.Thread(target=errors,daemon=True).start()
    def get(predicate):
        for _ in range(30):
            try:value=events.get(timeout=3)
            except queue.Empty:raise AssertionError('Desktop helper timeout: '+''.join(logs))
            if predicate(value):return value
        raise AssertionError('Too many responses')
    def send(value):child.stdin.write(json.dumps(value)+'\n');child.stdin.flush()
    try:
        if dbus:get(lambda v:v.get('event')=='dbus' and v.get('owned'))
        send({'id':1,'action':'resolve','uri':file.as_uri()});result=get(lambda v:v.get('id')==1);assert result.get('value')==str(file),result
        owner=subprocess.run(['gdbus','call','--session','--dest','org.freedesktop.DBus','--object-path','/org/freedesktop/DBus','--method','org.freedesktop.DBus.NameHasOwner','org.freedesktop.FileManager1'],check=True,capture_output=True,text=True,env=env).stdout
        assert owner.strip()==('(true,)' if dbus else '(false,)'),owner
        send({'id':2,'action':'clipboard-read'});result=get(lambda v:v.get('id')==2);assert result.get('error'),result
        for method in (['ShowItems','ShowFolders','ShowItemProperties'] if dbus else []):
            subprocess.run(['gdbus','call','--session','--dest','org.freedesktop.FileManager1','--object-path','/org/freedesktop/FileManager1','--method','org.freedesktop.FileManager1.'+method,"['"+file.as_uri()+"']",''],check=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE,text=True,env=env)
            value=get(lambda v:v.get('event')=='reveal');assert value['method']==method and value['urls']==[file.as_uri()],value
        child.stdin.close();assert child.wait(timeout=5)==0
        assert file.read_text()=='preserve'
        print('LINUX_DESKTOP_PASS: FileManager1 '+('enabled' if dbus else 'disabled')+', URI resolution, clipboard failure fallback, clean EOF')
    finally:
        if child.poll() is None:child.kill();child.wait()

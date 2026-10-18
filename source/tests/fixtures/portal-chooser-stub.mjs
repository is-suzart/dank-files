import {readFile,writeFile,rename} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
const request=JSON.parse(await readFile(process.argv[2],'utf8'));
if(request.title==='wait')setInterval(()=>{},1000);
else {
 const results={uris:[request.title==='bad-result'?'https://example.invalid/file':pathToFileURL(process.env.PORTAL_TEST_FILE).href]};
 if(request.options.choices)results.choices=request.options.choices.map(choice=>[choice[0],choice[3]]);
 if(request.options.filters)results.current_filter=request.options.filters[0];
 await writeFile(request.resultFile+'.tmp',JSON.stringify({response:0,results}),{mode:0o600});await rename(request.resultFile+'.tmp',request.resultFile);
}

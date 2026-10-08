// Local-only preview; run from any directory with Node.js 22+.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = fs.realpathSync(__dirname);
const port = Number(process.env.GOIMON_PREVIEW_PORT || 8765);
const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.gif':'image/gif','.mp3':'audio/mpeg','.wav':'audio/wav','.woff2':'font/woff2','.ico':'image/x-icon'};
const server = http.createServer((req,res)=>{
  function fail(status){res.writeHead(status,{'Content-Type':'text/plain; charset=utf-8'});res.end(String(status));}
  if(!['GET','HEAD'].includes(req.method))return fail(405);
  try{
    let name = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if(name.split('/').some(part=>part.startsWith('.')))return fail(403);
    if(name.endsWith('/'))name+='index.html';
    const filename=fs.realpathSync(path.join(root,name));
    if(!filename.startsWith(root+path.sep)||!mime[path.extname(filename)])return fail(403);
    const stat=fs.statSync(filename);if(!stat.isFile())return fail(404);
    res.writeHead(200,{'Content-Type':mime[path.extname(filename)],'Content-Length':stat.size,'Cache-Control':'no-store','Referrer-Policy':'no-referrer-when-downgrade','X-Content-Type-Options':'nosniff'});
    if(req.method==='HEAD')return res.end();
    fs.createReadStream(filename).on('error',()=>res.destroy()).pipe(res);
  }catch{return fail(404);}
});
server.on('error',error=>{console.error(error.code==='EADDRINUSE'?'Port '+port+' is in use. Stop the previous preview with Control+C.':error.message);process.exitCode=1;});
server.listen(port,'localhost',()=>console.log('GOIMON preview: http://localhost:'+port+'/cloud.html\nStop: Control+C'));

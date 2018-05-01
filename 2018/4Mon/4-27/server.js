/**
 * @Created by Jason
 * @Date: 2018/4/27 23:51
 */
 const http = require('http');
 const fs = require('fs');
 const url = require('url');
 const zlib = require('zlib');
 
 
 let server = http.createServer((req,res)=>{
     let {pathname,query} = url.parse(req.url,true);
     console.log(pathname)
     res.setHeader('Content-Encoding','gzip');
     let rs = fs.createReadStream(`www${pathname}`);
     let gz = zlib.createGzip();
     rs.pipe(gz).pipe(res);
     
     rs.on('error',()=>{
         res.writeHead(404);
         res.write('Not Found!');
         res.end();
     })
 });
 server.listen(8081);
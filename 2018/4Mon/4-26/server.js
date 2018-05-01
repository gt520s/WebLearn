/**
 * @Created by Jason
 * @Date: 2018/4/26 21:33
 */

let http = require('http');
let url = require('url');
let querystring = require('querystring');

let server = http.createServer((req,res)=>{
    let {pathname, query} = url.parse(req.url, true);
    
    
    //post数据
    let aBuffer = [];
    req.on('data',(data)=>{
        aBuffer.push(data)
    });
    req.on('end',()=>{
        let data = Buffer.concat(aBuffer);
        const post = querystring.parse(data.toString());
        console.log(post)
    })
});
server.listen(8080)
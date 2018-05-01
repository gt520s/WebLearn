/**
 * @Created by Jason
 * @Date: 2018/4/3 16:25
 */
const http = require('http');
const fs = require('fs');

let server = http.createServer((req,res)=>{
	fs.readFile( `www${req.url}`,(error, data)=>{
		if( error ){
			res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
			res.write('您的页面被外星人偷走了!')
		}else {
			res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
			res.write(data)
		};
		res.end()
	} )
});
server.listen(9090);
/**
 * @Created by Jason
 * @Date: 2018/4/3 16:33
 */
//引入模块
const http = require('http');
const fs= require('fs');

//创建服务器
let server = http.createServer((req,res)=>{
	//读取文件
	fs.readFile(`www${req.url}`,(err,data)=>{
		if( err ){
			res.writeHead(404);
			res.write('404~')
		}else {
			res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
			res.write(data);
		}
		res.end()
	})
});
server.listen(8080);
console.log(`服务器运行成功!`)



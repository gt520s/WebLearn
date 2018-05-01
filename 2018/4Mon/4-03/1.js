/**
 * @Created by Jason
 * @Date: 2018/4/3 13:59
 */

const http = require('http');
let server = http.createServer((req,res)=>{
	if( req.url == '/aaa' ){
		res.write('请求的是aaa')
	}else if( req.url == '/bbb' ){
		res.write('请求是BBB');
	}
	res.end()


});
server.listen(6060);
console.log(`监听成功!`)
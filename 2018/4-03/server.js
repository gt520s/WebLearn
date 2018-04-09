/**
 * @Created by Jason
 * @Date: 2018/4/3 10:51
 */

const http = require('http');
const io = require('socket.io');
//1.创建 http服务器
let httpServer = http.createServer();
httpServer.listen(8080);
console.log('服务器启动成功')
//2.创建webSocket服务
let wsServer = io.listen(httpServer);
wsServer.on('connection',(sock)=>{
	sock.on('aa',(num1,num2)=> {
		console.log(`接到了就浏览器发送的数据:${num1},${num2}`)
	});
	setInterval( ()=>{
		sock.emit('_random',Math.random())
	},500)

})


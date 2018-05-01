/**
 * @Created by Jason
 * @Date: 2018/4/14 17:08
 */


const net = require('net');
var server = net.createServer(sock=>{
    console.log('有人连接我了');
    //接受浏览器传过来的数据.
    sock.on('data',data=>{
        //第一次传输
        //把数据转化为json数据
        let str = data.toString();
        let aHead = str.split('\r\n');
        aHead.shift();
        aHead.pop();
        aHead.pop();
        let json = {};
        aHead.forEach((item)=>{
            let [key,value] = item.split(': ');
            json[key] = value;
        })
        
        
        console.log(json)
    })
});
server.listen(8080)
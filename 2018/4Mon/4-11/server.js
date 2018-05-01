/**
 * @Created by Jason
 * @Date: 2018/4/11 9:12
 */

const http = require('http');
const fs = require('fs');
const mysql = require('mysql');
const url = require('url');
const io = require('socket.io');
const regs = require('./lib/regs');


//连接数据库
let db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'20180409'
});

//创建服务器
let server = http.createServer((req,res)=>{
    fs.readFile(`www'${req.url}'`,(err,data)=>{
        if(err){
            res.writeHead(404);
            res.write('404');
        }else{
            res.write(data);
        }
        res.end()
    })
});
server.listen(8080);
console.log('服务器已启动!')

//3.创建websocket服务器
/*
* 接口
* 'reg',user,pass   => 'reg_ret',code,msg
* 'login',user,pass => 'login_ret',code,msg
* 'msg' txt         => 'msg_ret',code,msg
* */
let aSock = [];
let wsServer = io.listen(server);
wsServer.on('connection',sock=>{
    aSock.push(sock);
    let cur_username = '';
    let cur_id = '';
    //注册接口
    sock.on('reg',(user,pass)=>{
        //验证数据
        if(  ! regs.username.test(user) ){
            sock.emit('reg_ret',1,'用户名不符合规范!')
        }else if ( ! regs.password.test(pass) ) {
            sock.emit('reg_ret',1,'密码不符合规范!')
        }else {
            //1.验证用户名是否存在
            db.query(`SELECT ID FROM user_table WHERE username='${user}'`,(err,data)=>{
                if( err ){
                    sock.emit('reg_ret',1,'数据库出错~')
                }else if ( data.length>0 ) {
                    sock.emit( 'reg_ret',1,'用户名重复!' )
                }else {
                    db.query(`INSERT INTO user_table (username,password,online) VALUES ('${user}','${pass}',0)`,err=>{
                        if (err) {
                            sock.emit('reg_ret',1,'数据库出错!')
                        } else {
                            sock.emit('reg_ret',0,'注册成功!')
                        }
                    })
                }
            })
        }
    });
    //登陆接口
    sock.on('login',(user,pass)=>{
        //验证数据
        if( ! regs.password.test( user ) ){
            sock.emit('login_ret',1,'用户名不符合规范!')
        }else if( !regs.password.test(pass) ){
            sock.emit('login_ret',1,'密码不符合规范!')
        }else {
            //查询用户名是否存在密码是否正确
            db.query(`SELECT ID,password FROM user_table WHERE username='${user}'`,(err,data)=>{
                if( err ){
                    sock.emit('login_ret',1,'数据库出错~~');
                }else {
                    if( data.length == 0 ){
                        sock.emit('login_ret',1,'用户名不存在!');
                    }else if( data[0].password != pass ){
                        sock.emit('login_ret',1,'密码错误!');
                    }else {
                        db.query(`UPDATE user_table SET online=1 WHERE ID=${data[0].ID}`,err=>{
                            if( err ){
                                sock.emit('login_ret',1,'数据库出错~~');
                            }else {
                                sock.emit('login_ret',0,'登陆成功!');
                                cur_username = user;
                                cur_id = data[0].ID;
                            }
                        })
                    }
                }
            })
        }
    });
    //用户离线
    sock.on('disconnect',()=>{
        //更新用户状态
        db.query(`UPDATE user_table SET online=0 WHERE ID=${cur_id}`,err=>{
            if( err ){
                console.log(`服务器错误,${err}`);
            }else {
                console.log(`用户${cur_username}已经下线~`);
                cur_username = '';
                cur_id = '';
                //去掉离线用户
                aSock = aSock.filter(item=>item != sock);
            }
        })
    });
    //发送消息
    sock.on('msg',txt=>{
        //数据验证
        if( !txt ){
            sock.emit('msg_ret',1,'消息不能为空!')
        }else{
            aSock.forEach(item=>{
                if( item == sock ) return;
                item.emit('msg',cur_username,txt);
            });
            sock.emit('msg_ret',0,'发送成功!')
        }
    })
})

/**
 * @Created by Jason
 * @Date: 2018/4/9 21:29
 */

//引入模块
const http = require('http');
const fs = require('fs');
const db = require('mysql');
const url = require('url');


//1.连接数据库
db.createPool({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'20180409'
})
//2.创建服务器
let server = http.createServer((req,res)=>{
    //接口请求
    let { pathname,query } = url.parse(req.url,true);
    if( pathname == '/reg' ){
        let {username,pass} = query;
        //检验数据
        if( ! /\w{4,16}/.test(username) ){
            res.write(JSON.stringify({code:1,msg:'用户名不规范!'}))
            res.end();
        }else if( !/\w{4,16}/.test(pass) ){
            res.write(JSON.stringify({code:1,msg:'密码不规范!'}))
            res.end();
        }else {
            //验证用户名是否重复
            db.query(`SELECT * FROM user_table WHERE username='${username}'`,(error, data)=>{
                if( err ){
                    res.write(JSON.stringify({code:1,msg:'数据库出错!'}));
                    res.end();
                }else if( data.length > 0 ){
                    res.write(JSON.stringify({code:1,msg:'用户名已经存在!'}));
                    res.end();
                }else {
                    //插入数据
                    db.query(`INSERT INTO user_table (username,password,online) VALUES ('${username}','${pass}',1) `);
                    res.end();
                }
            })
        }

    }
    else {
        fs.readFile(`www${req.url}`,(err,data)=>{
            if( err ){
                res.writeHead(404);
                res.writeHead('您的页面被外星人抓走了~');
                res.end();
            }else {
                res.writeHead(data);
                res.end();
            }
        })
    }



    //文件请求
})
server.listen('8080');
console.log('服务器已启动!')




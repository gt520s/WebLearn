	/**
 * @Created by Jason
 * @Date: 2018/4/9 12:43
 */
const http = require('http');
const fs = require('fs');
const mysql = require('mysql');
const url = require('url');

//数据库
let db = mysql.createPool({
	host:'localhost',
	user:'root',
	password:'1234',
	database:'20180409'
});

//1.创建http服务器
let server = http.createServer((req,res)=>{
	let {pathname,query} = url.parse(req.url, true)
	if( pathname == '/reg' ){
		let {user,pass} = query;
		//1.检验数据
		if( ! /^\w{6,32}$/.test(user) ){
			res.write( JSON.stringify({code:1,msg:'用户名不规范'}) )
			res.end()
		}else if( !/^\w{6,18}$/.test(pass) ){
			res.write( JSON.stringify({code:1,msg:'密码不规范'}) )
			res.end()
		}else {
			//2.验证用户名是否重复
			db.query(`SELECT * FROM user_table WHERE username='${user}'`,(err,data)=>{
				if( err ){
					res.write( JSON.stringify({code:1,msg:'数据库出错了啊!'}));
					res.end();
				}else if( data.length > 0 ){
					res.write( JSON.stringify({code:1,msg:'用户名已存在!'}));
					res.end();
				}else {
					//3.插入数据
                    db.query(`INSERT INTO user_table (username,password,online) VALUES('${user}','${pass}',0)`,err=>{
                        if( err ){
                            res.write( JSON.stringify({code:1,msg:'数据库出错!'}));
                            res.end();
                        }else {
                            res.write( JSON.stringify({code:0,msg:'注册成功!'}));
                            res.end();
                        }
                    })
					
				}
			})

		}

	}else if( pathname == '/login' ){
	}else {
		//读取文件
		fs.readFile(`www${req.url}`,(err,data)=>{
			if(err){
				res.writeHead(404);
				res.write('Not Found')
			}else {
				res.write(data);
			}
			res.end();
		})
	}


})
server.listen(8080);
console.log('服务器启动成功!')
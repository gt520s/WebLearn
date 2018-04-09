	/**
 * @Created by Jason
 * @Date: 2018/4/9 10:54
 */
const mysql = require('mysql');
let db = mysql.createPool({
	host:'localhost',
	user:'root',
	password:'1234',
	database:'20180409'
});
db.query('SELECT * FROM user_table',(err, data)=>{
	if( err ){
		console.log(err)
	}else {
		console.log(data);
	}
})


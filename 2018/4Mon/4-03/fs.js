/**
 * @Created by Jason
 * @Date: 2018/4/3 16:08
 */

const fs = require('fs');
// fs.readFile('1.html',(err, data)=>{
// 	if(err){
// 		console.log(err);
// 	}else {
// 		console.log(data);
// 	}
// })
fs.writeFile('2.txt','写点文字',(err)=>{
	if(err){
		console.log('false')
	}else {
		console.log('写入成功!')
	}
})
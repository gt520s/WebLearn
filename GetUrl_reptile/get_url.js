/*引入模块*/
const superagent = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs');
const http = require('http');
const request = require('request');
const async = require('async');//控制并发数量
/*定义地址*/
const url = 'https://www.rails365.net/playlists/webpack-3-ling-ji-chu-ru-men-shi-pin-jiao-cheng';

/*发起请求*/
superagent.get(url).end(function (err,res) {
	//拦截报错
	if( err ){
		throw Error(err);
		return
	};
	GetVideoUrl(res.text);
});

/*获取每个视频的连接*/
function GetVideoUrl(text) {
	let $ = cheerio.load(text);
	var arr_page_2 = [],
		url = '',
		dir_name = $('.page-header h4').text();

	fs.mkdir(dir_name,function () {
		console.log('文件夹创建成功!')
	});

	$('.video-box a').each(function () {
		url = 'https://www.rails365.net' + $(this).attr('href');
		arr_page_2.push(url);
		url = '';

	});

	fs.writeFile('./连接.txt', arr_page_2, function (err) {
		console.log('连接生成成功!')
	})

	//遍历链接,准备下载
	arr_page_2.forEach(function (e) {
		superagent.get(e).end(function (err,res) {
			if(err){
				throw Error(err);
				return
			};
			var _$ = cheerio.load(res.text),
				sub_title = _$('.panel-body h1').text();
			// downLoadPic( _$('#vid').attr('src'), sub_title, dir_name);
		})
	});

	// superagent.get(arr_page_2[0]).end(function (err,res) {
	// 	if(err){
	// 		throw Error(err);
	// 		return
	// 	};
	// 	var _$ = cheerio.load(res.text),
	// 		sub_title = _$('.panel-body h1').text();
	//
	// 	downLoadPic( _$('#vid').attr('src'), sub_title, dir_name);
	// })
};




/*下载视频*/
function downLoadPic( src , file_name, dir_name) {

		console.log('连接抓取成功,准备下载文件!');
		console.log(file_name);
		request(src).pipe( fs.createWriteStream('./'+ dir_name+ '/' +file_name) ).on('close',function(){
			console.log('下载完成!');
	})



})




	// //初始化options
	// var options={
	// 	hostname:src,
	// 	method:'POST',
	// };
	//
	//
	// var stream = fs.createWriteStream(dir_name);
	// request(url).on('error',function(){
	// 	console.log('done no');
	// }).pipe(stream).on('close', function () {
	// 	console.log('下载成功!');
	// });
	//
	//
	//
	// request.head(src,function (err,res) {
	// 	var video_data = '';
	// 	res.on('data',function (res) {
	// 		video_data += res;
	// 	});
	// 	res.on('end',function () {
	// 		fs.writeFile(file_name,video_data,function (err) {
	// 			if( err ){
	// 			    console.log('文件下载失败:'+err);
	// 			    return;
	// 			};
	// 			console.log(file_name + ' ==> 下载成功!');
	// 		})
	// 	})
	// })
	
	
}


//=================


var download = function(url, filename, callback) {

	filename = filename.replace(/\(.*\)/,'') + '.mp4';

	var dirPath = savePath + courseTitle + '/'
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath);
	}

	console.log('开始下载第' + courseTotalCount + '个视频' + filename + ' 地址: ' + url);
	var writeStream = fs.createWriteStream(dirPath + filename);
	writeStream.on('close', function() {
		callback(filename);
	});

	var req = superagent.get(url)
	req.pipe(writeStream);

}



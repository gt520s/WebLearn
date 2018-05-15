/**
 * @Created by Jason
 * @Date: 2018/5/7 22:17
 */

const fetch = require('./fetch-html-blue');
const zlib = require('zlib');
const fs = require('fs')

fetch('https://h5.ele.me/restapi/shopping/v3/restaurants?latitude=25.78604&longitude=113.100551&offset=24').then(res=>{
    let {buffer,headers} = res;
    if( headers['content-encoding'] == 'gzip' ){
        zlib.gunzip(buffer,(err,data)=>{
            if( err ){
                console.log(err)
            }else {
                fs.writeFile('./eleme_shopping.json',data.toString())
                console.log('数据已抓取!')
            }
        })
    }
})


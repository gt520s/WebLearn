/**
 * @Created by Jason
 * @Date: 2018/4/27 23:30
 */

const fs = require('fs');
const zlib = require('zlib');
let gz = zlib.createGzip();
let rs = fs.createReadStream('1.html');
let ws = fs.createWriteStream('2.html.gz');
rs.pipe(gz).pipe(ws);
ws.on('finish',()=>{console.log('写入成功!')});
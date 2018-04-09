/**
 * @Created by Jason
 * @Date: 2018/4/9 15:18
 */
const url =require('url');
let str = 'https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_15759144535435739006%22%7D&n_type=0&p_from=1';
let obj = url.parse(str,true)
console.log(obj)
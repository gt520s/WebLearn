/**
 * @Created by Jason
 * @Date: 2018/4/27 18:38
 */
Buffer.prototype.split = Buffer.prototype.split || function (spliter) {
    let b1 = this;
    let result = [];
    let n;
    
    while ((n = b1.indexOf('==')) != -1){
        let res1 = b1.slice(0,n);
        let res2 = b1.slice(n+2);
        result.push(res1);
        b1 = res2;
    }
    result.push(b1);
    return result;
}
let b1 = new Buffer('sadasd==fr=dfgdfgdfgbcvb=grtg=erter==rete');
let res = b1.slice('==');
console.log(res)
/**
 * @Created by Jason
 * @Date: 2018/5/6 21:34
 */

module.exports = {
    entry:'./script/1.js',
    output:{
        filename:'2.bundle.js',
        path:`${__dirname}/dist/`
    },
    //模块
    module:{
        rules:[
            {
                test:/\.css/i,
                use:['style-loader','css-loader']
            },
            {
                test:/\.(jpg|pen|gif|ico)/i,
                use:['file-loader']
            }
        ]
    }
}
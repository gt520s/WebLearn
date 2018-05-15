/**
 * @Created by Jason
 * @Date: 2018/5/3 16:59
 */

class MyVue {
    constructor(options){
        //el
        this.$el = document.querySelectorAll(options.el);
        //data
        this.$data = options.data || {};
    }
}
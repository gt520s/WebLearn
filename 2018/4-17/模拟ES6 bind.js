/**
 * @Created by Jason
 * @Date: 2018/4/17 16:37
 */

Function.prototype.bind = Function.prototype.bind || function (_this) {
    let __this = this;
        return function (...args) {
            __this.call(_this,args);
        }
    }
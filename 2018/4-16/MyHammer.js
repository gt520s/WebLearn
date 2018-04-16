/**
 * @Created by Jason
 * @Date: 2018/4/16 18:53
 */

class MyHammer{
    constructor (obj,options={}){
        //事件队列
        this.eventQueue = [];
        this._start_time = 0;
        this._timer = null;
        obj.addEventListener('touchstart',this._start.bind(this),false);
        obj.addEventListener('touchmove',this._move.bind(this),false);
        obj.addEventListener('touchend',this._end.bind(this),false);
    };
    on(name,fn){
        this.eventQueue.push(name, fn)
    }
    _start(){
        //记录时间,tap
        this._start_time = Date.now();
        //设置定时器,press
        clearTimeout(this._timer);
        this._timer = setTimeout(()=>{
            console.log('触发了press')
        },250)
        
    };
    _move(){
    
    };
    _end(){
        //记录时间
        if( Date.now() - this._start_time <= 200 ){
            console.log('触发了tap事件');
            clearTimeout(this._timer);
    
        }
    }
    
    
}
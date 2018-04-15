/**
 * @Created by Jason
 * @Date: 2018/4/15 22:01
 */

class MyScroll{
    constructor(selector,options={}){
        //处理默认参数
        bounce : options.bounce || true;
        bounceTime : options.bounceTime || 600;
        scrollX: options.scrollX || false;
        scrollY: options.scrollY || true;
        freeScroll: options.freeScroll || false;
        startX: options.startX || 0;
        startY: options.startY || 0;
        
        //选出父级
        let aParent = Array.from(document.querySelectorAll(selector));
        aParent.forEach(parent =>{
            //选出里面的第一个子元素
            let child = parent.children[0];
            if( child ) return;
            
            let disX = 0, disY = 0, startX = 0, startY = 0;
            let translateX = options.startX, translateY = options.startY;
            child.style.transform = `translate(${translateX}px,${translateY}px)`;
            //添加事件
            child.addEventListener('touchstart',start,false);
            child.addEventListener('touchmove',move,false);
            child.addEventListener('touchend',end,false);
            
            function start(ev) {
                startX = ev.targetTouchs[0].clientX;
                startY = ev.targetTouchs[0].clientY;
                disX = startX - translateX;
                disY = startY - translateY;
            }
            function move() {
            
            }
            function end() {
            
            }
        })
    }
}
import { request } from "http";

/**
 * 存储localStrorage
 */
export const setStore = (name, content) => {
    if (!name) return;
    if(typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}
/**
 * 获取localStorage
 */
export const getStore = name =>{
    if(!name) return;
    return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name =>{
    if(!name) return;
    window.localStorage.removeItem(name)
}
/**
 * 获取style样式
 */

 export const getStyle = (element, attr, NumberMode= 'int') => {
    let target;
    //  scrollTop获取方式不同,没有它不属于style,而且只有document.body才能用
    if(attr === 'scrollTop') {
        target = element.scrollTop;
    }else if(element.currentStyle){
        target = element.currentStyle[attr]
    }else{
        target = document.defaultView.getComputedStyle(element,null)[attr];
    }
    // 在获取opacity 时需要获取小数parseFloat
    return NumberMode == 'float'?parseFloat(target): parseInt(target);
 }


 /**
  * 页面到达底部,加载更多
  */
export const loadMore = (element, callback) => {
    let windowHeight = window.screen.height;
    let height;
    let setTop;
    let paddingBottom;
    let marginBottom;
    let requestFram;
    let oldScrollTop;

    document.body.addEventListener('scroll',()=>{
        loadMore();
    }, false)
    // 运动开始时获取元素高度和 offseTop, pading, margin
    element.addEventListener('tounchstart', ()=>{
        height = element.offsetHeight;
        setTop = element.offsetTop;
        paddingBottom = getStyle(element, 'paddingBottom');
        marginBottom = getStyle(element, 'marginBottom');
    },{passive:true})

    // 运动过程中保持监听 scrollTop 的值判断是否到达底部
    element.addEventListener('touchmove',()=>{
        loadMore();
    },{passive:true})
    
    // 运动结束时判断是否有惯性运动,惯性运动结束判断是否到达底部
    element.addEventListener('touched', ()=>{
        oldScrollTop = document.body.scrollTop;
        moveEnd();
    },{passive: true})

    const moveEnd = () =>{
        requestFram = requestAnimationFrame(()=>{
            if (document.body.scrollTop != oldScrollTop) {
                oldScrollTop = document.body.scrollTop;
                loadMore();
                moveEnd();
            }else{
                cancelAnimationFrame(requestFram);
                // 为了防止鼠标抬起时已经渲染好数据从而导致重新获取数据,应该重新获取dom高度
                height = element.offsetHeight;
                loadMore();
            }
        })
    }
    const loadMore = () =>{
        if(document.body.scrollTop + windowHeight >= height + setTop + paddingBottom + marginBottom){
            callback();
        }
    }
}

/**
 * 显示返回顶部按钮, 开始,结束,运动 三个过程中调用函数判断是否达到目标点
 */
export const showBack = callback =>{
    let requestFram;
    let oldScrollTop;

    document.addEventListener('scroll', ()=>{
        showBackFun();
    },false)

    document.addEventListener('touchstart', ()=>{
        showBackFun();
    },{passive: true})

    document.addEventListener('touchmove', ()=>{
        showBackFun();
    },{passive:true})

    document.addEventListener('touchend', ()=>{
        oldScrollTop = document.body.scrollTop;
        moveEnd();
    },{passive: true})

    const moveEnd = () =>{
        requestFram = requestAnimationFrame(() =>{
            if(document.body.scrollTop != oldScrollTop){
                oldScrollTop = document.body.scrollTop;
                moveEnd();
            }else{
                cancelAnimationFrame(requestFram)
            }
            showBackFun();
        })
    }

    // 判断是否到达目标点
    const showBackFun = ()=>{
        if(document.body.scrollTop > 500) {
            callback(true);
        }else{
            callback(false);
        }
    }
}
/**
 * 运动效果
 * @param {HTMLElement} element     运动对象,必选
 * @param {JSON}        target      属性:目标值,必选
 * @param {number}      duration    运动时间,可选
 * @param {string}      mode        运动模式,可选
 * @param {function}    callback    可选,回调函数,链式动画
 */

 export const animate = (element, target, duration = 400, mode = 'ease-out', callback) =>{
    clearInterval(element.timer);

    //  判断不同参数的情况
    if (duration instanceof Function) {
        callback = duration;
        duration = 400;
    }else if(duration instanceof String){
        mode = duration;
        duration = 400;
    }

    // 判断不同参数的情况
    if (mode instanceof Function){
        callback = mode;
        mode = 'ease-out';
    }
 }
    
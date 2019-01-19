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
        marginBottom = getStyle()
    })
 }
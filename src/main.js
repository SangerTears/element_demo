// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import App from './App'
import routes from './router'
import store from './store/'
import {routerMode} from './config/env'
import './config/rem'
import  FastClick from 'fastclick'
import VueRouter from 'vue-router';

if('addEventListener' in document) {
  document.addEventListener('DOMcontentLoaded', function () {
      FastClick.attach(document.body);
  }, false);
}
//移动设备上的浏览器默认会在用户点击屏幕大约延迟300毫秒后才会触发点击事件，这是为了检查用户是否在做双击。
// 为了能够立即响应用户的点击事件，才有了FastClick。

Vue.use(VueRouter)
const router = new VueRouter({
  routes,
  mode: routerMode,
  /**
   * 严格模式下, delete运算符后跟随非法标识符(即delete 不存在的标识符)，会抛出语法错误； 非严格模式下，会静默失败并返回false
   * 严格模式中，对象直接量中定义同名属性会抛出语法错误； 非严格模式不会报错
   * 严格模式中，函数形参存在同名的，抛出错误； 非严格模式不会
   * 严格模式不允许八进制整数直接量（如：023）
   * 严格模式中，arguments对象是传入函数内实参列表的静态副本；非严格模式下，arguments对象里的元素和对应的实参是指向同一个值的引用
   * 严格模式中 eval和arguments当做关键字，它们不能被赋值和用作变量声明
   * 严格模式会限制对调用栈的检测能力，访问arguments.callee.caller会抛出异常
   * 严格模式 变量必须先声明，直接给变量赋值，不会隐式创建全局变量，不能用with,
   * 严格模式中 call apply传入null undefined保持原样不被转换为window
   */
  strict: process.env.NODE_ENV !== 'production', //在开发环境中使用严格模式的检查 //线上关闭环境检查
  /**
   * scrollBehavior这个整体做的是：在路由的history模式下，一些列表页利用缓存模式来
   * 记录位置（一般是返回不刷新，前进刷新）,一般用了scrollBehavior，
   * 同时还用keep-alive(缓存),activated(缓存下触发的钩子)配合做列表页的返回记录位置。
   * 缓存模式也有坑，就是何时清除缓存，一般是从新进入页面就清除。回到主题，
   * 滚动行为就是：例如一个列表页，滑动了很多，点进去、再返回记录刚刚的位置
   */
  scrollBehavior (to, from, savePosition) {
    if (savePosition) {
      return savePosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savePosition = document.body.scrollTop;
      }
      return {x:0, y:to.meta.savePosition || 0 }
    }
  }
})
Vue.config.productionTip = false

/* eslint-disable no-new */
// 在实例化Vue的时候，两种方式挂载数据
// new Vue({
//   router,
//   store,
// }).$mount('#app')
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

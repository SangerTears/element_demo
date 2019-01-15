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
  
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

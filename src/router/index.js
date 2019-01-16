// import Vue from 'vue'
// import Router from 'vue-router'

// Vue.use(Router)
import App from '../App'
const home = r => require.ensure([], () => r(require('../page/home/home.vue')), 'home')
const city = r => require.ensure([], () => r(require('../page/city/city.vue')), 'city')



// export default new Router({
// })
export default [{
  path: '/',
  component: App, //顶层路由,对应index.html
  children:[ //二级路由.对应App.vue
    // 地址为空时跳转home页面
    {
      path: '',
      redirect: '/home'
    },
    // 首页城市列表
    {
      path: '/home',
      component: home
    },
    // 当前选择城市页
    {
      path:'/city/:cityid',
      component:city
    }
  ]
}]
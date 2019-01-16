<template>
  <div>
    <!-- 首先将要过渡的元素用transition包裹，并设置过渡的name，然后添加触发这个元素过渡的按钮 -->
    <!-- 
      in-out：新元素先进行过渡，完成之后当前元素过渡离开。
      out-in：当前元素先进行过渡，完成之后新元素过渡进入。
     -->
    <transition name="router-fade" mode="out-in">
      <!-- 重新创建动态组件的行为通常是非常有用的，但是在这个案例中，我们更希望那些标签的组件实例
      能够被在它们第一次被创建的时候缓存下来。为了解决这个问题，
      我们可以用一个 <keep-alive> 元素将其动态组件包裹起来。 
      注意这个 <keep-alive> 要求被切换到的组件都有自己的名字，不论是通过组件的 name 选项还是局部/全局注册。
      -->
      <keep-alive>
        <!-- 增加 router.meta 属性在route里面配置也要缓存的 https://www.jianshu.com/p/0b0222954483-->
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="route-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
import svgIcon from './components/common/svg'
export default {                   
  components:{
    svgIcon
  }
}
</script>

<style lang="scss">
  @import './style/common.scss';
  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }
  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }
</style>

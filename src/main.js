import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
// 三级联动组件--全局组件
import TypeNav from '@/components/TypeNav'
// 第一个参数，全局组件的名；第二个参数，哪一个组件
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import {Button,MessageBox} from 'element-ui'

// elementUI中有两种加载方式
Vue.prototype.$msgbox=MessageBox;
Vue.prototype.$alert=MessageBox.alert;

Vue.component(Button.name, Button)
Vue.component(Pagination.name,Pagination)
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)

// 引入mockServe.js---mock数据, mockServe没有暴露，此处表示立即执行
import '@/mock/mockServe';

// 统一接收API文件夹中的所有接口
import * as API from '@/api';


Vue.config.productionTip = false
import store from './store'
import "swiper/css/swiper.css"

import jt from '@/assets/images/jt.jpg'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
  // 懒加载默认的图片
  loading:jt,
})

// 引入插件
import myPlugin from '@/plugins/myPlugin'
Vue.use(myPlugin,{
  name:'uppercase'
})

// 引入表单验证插件
import "@/plugins/validate";



new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
    // 直接把接口绑定到Vue原型上
    Vue.prototype.$API=API;
  },

  router,
  // 组件身上都有$router和$route
  // 注册仓库，组件实例身上会多一个属性$store
  store
}).$mount('#app')

复习:
1)完成商品分类的三级列表路由跳转一级路由传参(合并参数)
2)完成了search模块中对于typeNav的使用(有过渡动画)
3)对typeNav请求次数进行优化
4)swiper插件
swiper插件:经常制作轮播图(移动端和PC端都可以用)
使用步骤:
    第一步:引入依赖包
    第二步:页面中的结构
    第三步:初始化swiper实例,为轮播图添加动态效果
5)mock数据的使用,通过mockjs模块


1)轮播图异步加载的最终解决方案
watch:数据监听:监听已有数据的变化
利用watch对象写法中的handler并且加上nextTick才能完成.
nextTick:在下次DOM更新结束之后执行延迟回调。在修改数据之后，立即使用这个方法，获取更新后的DOM
$nextTick中的回调可以保证在数据更新视图后执行,经常和很多插件一起使用[都需要存在更新后的DOM]

2)开发floor组件
切记:仓库中state的数据格式,不能瞎写/乱写,数据格式取决于服务器返回的数据

2.1getFloorList这个action哪里触发? 需要在Home路由组件中触发.不能在floor组件内部发action.因为需要用v-for渲染派发得到的数据.

2.2v-for也可以在自定义标签中使用

2.3组件通信的方式有哪些?面试频率极高
props:用于父子组件通信
自定义事件,$on和$emit实现子给父通信
全局事件总线:$bus
pubsub-js:在vue中几乎不用,全能
插槽:(默认插槽,具名插槽,作用域插槽)
vuex


3)把首页中的轮播图拆分为一个共用的全局组件
```js
  watch: {
    // 监听bannerList数据的变化：因为这条数据发生过变化--由空数组变为数组里有元素
    bannerList: {
      immediate:true,
      /*现在通过watch监听bannerList属性的属性值的变化 
        如果执行handler方法，代表组件实例身上的这个属性已经有了
      */
      //  当目前只能保证数据已经发生改变（即获取到了数据），但是并不能保证DOM结点被渲染了
      // v-for执行完毕，才有结构。但现在无法保证v-for执行完毕。
      // nextTick:在下次DOM更新结束之后执行延迟回调。在修改数据之后，立即使用这个方法，获取更新后的DOM。
      handler(newValue, oldValue) {
        this.$nextTick(() => {
          // 当执行这个回调的时候，保证服务器中的数据回来了，且v-for执行完毕【轮播图所需的DOM结构存在了】
          var mySwiper = new Swiper(this.$refs.mySwiper, {
            // 用ref获取DOM
            // direction: "vertical", // 垂直切换选项
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
```
切记:以后 在开发项目时,如果看到某一个组件在很多地方都使用,可以将其变成全局组件.
注册一次,可以在任意地方使用,共用的组件|非路由组件放到components文件夹中.

5)Search模块开发
    1.先写静态页面+静态组件拆分
    2.发请求(API)
    3.vuex
    4.组件获取仓库数据,动态展示数据
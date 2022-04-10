1)个人中心完成
面试会问-是否自行封装过组件? 分页器,日历,轮播图,搜索框?
个人中心当中:用到了自己封装的组件-分页器

2)全局守卫

未登录访问:交易相关trade,支付相关(pay,paysuccess),用户中心(center)相关跳转到登录页面

decodeURIComponent函数可以解析URL中的乱码字符串

3)路由独享守卫
在定义路由时直接设置 beforeEnter:(to,from,next)=>{}
只有从购物车界面才能跳转到交易页面(创建订单)
只有从交易页面(创建订单)页面才能跳转到支付页面
只有从支付页面才能跳转到支付成功页面

4)组件内守卫
```js
beforeRouteEnter(to,from,next) {},
beforeRouteUpdate(to, from, next) {
/* 
    当前路由改变，但是该组件被复用时调用
    举例来说，对于一个带有动态参数的路径 /foo:id,在/foo/1和/foo/2之间跳转时
    由于会渲染同样的Foo组件，因此组件实例会被复用，而这个钩子就会在这种情况下被调用。
    这个钩子里可以访问组件实例 this
    */
// console.log("this:", this);
next();
},
beforeRouteLeave(to,from,next) {}

```
5)图片懒加载:vue-lazyload

6)vee-validate 表单验证-了解
  该验证库很复杂



7)打包上线

6.1打包 npm run build
项目打包后,代码都是经过压缩加密的,如果运行时报错,输出的错误信息无法准确得知是哪里的代码报错.
有了map就可以像未加密的代码一样,准确的输出是哪一行那一列报错.
所以该文件如果项目不需要是可以去除掉.----map文件太大了
vue.config.js配置
productionSourceMap:false
7)路由懒加载



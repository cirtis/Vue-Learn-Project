复习:
1)商品分类的三级列表由静态变为动态形式[获取服务器数据:解决跨域的问题]
2)函数的防抖与节流(面试的频率很高)
3)路由的跳转和传参(使用了编程式路由导航)
当需要使用声明式导航时，如果router-link组件太多,将会很占用内存.
编程式导航采用自定义属性 解决事件委派时对子节点的精确定位问题.


1)开发Search模块中TypeNav商品分类菜单(过渡动画效果)

过渡动画:前提是组件|元素 务必要有v-if和v-show指令才可以进行过渡动画

2)三级联动组件哪些地方可以优化?
在APP根组件中发请求[根组件mounted],因为根组件中只执行一次

3)合并params和query参数

4)开发home首页中 ListContainer和Floor组件?
注意:服务器返回的数据只有商品分类菜单数据,对于ListContainer组件与Floor组件的数据,服务器没有提供
mock数据(模拟:如果想mock数据,需要用到一个插件mock.js)
mockjs的使用步骤:
    1)在项目src文件夹下创建mock文件夹
    2)准备JSON数据(mock文件夹中创建相应的json文件) JSON数据一定要格式化
    3)把mock数据需要的图片放置到public文件夹中(public文件夹在打包的时候,会把相应的资源原封不动打包到dist文件夹中)
    4)开始mock(虚拟的数据),通过mockjs模块实现----创建mockServe.js
    5)mockServe.js的文件在入口文件处引入
    6)创建mock对应的api
    7)组件中mounted中dispatch action;
    8)在action中通过mock的方法获取数据并通过mutations存入state中.
    9)在组件中computed中,通过mapstate获取到vuex中对应的数据.

5)ListContainer组件开发重点?
安装Swiper插件
    
    第一步 引包 main.js中引入css,组件内引入Swiper
    第二步 页面中结构必须要有
    第三步 new Swiper实例[轮播图添加动态效果]
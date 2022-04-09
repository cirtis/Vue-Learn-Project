1.vue-cli 脚手架初始化项目
node+webpack+淘宝镜像

node_modules文件夹:项目依赖文件夹

public文件夹:一般放置一些静态资源(图片),需要注意,放在public文件夹中的静态资源,webpack进行打包的时候,会原封不动的打包到dist文件夹中
src文件夹(程序员源代码文件夹)
    assets文件夹:一般也是防止静态资源(一般防止多个组件共用的静态资源),需要注意,放置在assets文件夹里面的静态资源,在webpack打包的时候,webpack会把静态资源当作一个模块,打包到JS文件里面.
    components文件夹 一般放置的是非路由组件(全局组件)
    App.vue:项目的唯一根组件,Vue当中的组件都是.vue组件
    main.js 程序的入口文件,也是程序中最先执行的文件
babel.config.js:配置文件(babel相关)
package.json文件:认为是项目的身份证.项目名/脚本命令/依赖信息
package-lock.json文件:缓存性文件
----以上两者真的是对的嘛?
package-lock.json 的作用是锁定依赖结构，即只要你目录下有 package-lock.json 文件，那么你每次执行 npm install 后生成的 node_modules 目录结构一定是完全相同的.
开发系统应用时，建议把 package-lock.json 文件提交到代码版本仓库，从而保证所有团队开发者以及 CI 环节可以在执行 npm install 时安装的依赖版本都是一致的。
而开发npm包时,则不应该把package.json发布.



2.项目的其他配置
2.1项目运行时,让浏览器自动打开
--package.json
    serve后加上--open
2.2 esline校验功能关闭
    根目录下vue.config.js中配置
    lintOnsave:false
2.3 src文件夹的简写方式,配置别名:@ [@代表src文件夹]
    在jsconfig.json文件中配置

3.项目的路由分析
vue-router
前端所谓的路由,KV键值对
key:URL(地址栏中的路径)
value:相应的路由组件

路由组件
Home首页路由组件,Seach路由组件,Login登录路由,Register注册路由
非路由组件
Header
Footer[在首页/搜索页],但是在登录/注册页面没有

4.完成非路由组件Header与Footer业务
在本项目中,不再以HTML+CSS为主,主要搞业务/逻辑
在开发项目的时候:
1.书写静态页面(HTML+CSS)
2.拆分组件
3.获取服务器的数据动态展示
4.完成响应的动态业务逻辑

注意1:创建组件的时候,组件结构+组件的样式+图片资源
注意2:本项目采用less样式,浏览器不识别less样式,需要less/less-loader进行处理
注意3:如果想让组件识别less样式,需要在style标签上加上lang="less"

(5).路由组件的搭建
vue-router
路由组件有四个 Home Search Login Register
-components文件夹,经常放置非路由组件(共用全局组件)
-pages|views文件夹,经常放置路由组件

5.1配置路由
项目中配置的路由一般防止在router文件夹中

5.2总结
路由组件与非路由组件的区别
1:路由组件一般都是放置在page|views文件夹,而非路由组件一般放置在components文件夹中
2:路由组件一般需要在router文件夹中进行注册(使用的即为组件的名字),非路由组件在使用的时候,一般都是以标签的形式使用
3.注册完路由:不管是路由组件,还是非路由组件身上都有$route和$router属性
$route:一般获取路由信息[路径/query|params等]
$router:一般进行编程式导航进行路由跳转[push|replace]

5.3路由的跳转
路由的跳转有两种形式
声明式导航router-link,可以进行路由的跳转
编程式导航push|replace,可以进行路由跳转
编程式导航:声明式导航能做的,它都能做.且还可以做其他的业务逻辑 

(6)Footer组件的显示与隐藏
显示或者隐藏组件:v-show或者v-if
Footer组件:在Home/Search显示,在登录/注册时隐藏

6.1可以根据组件身上的$route获取当前路由的信息,通过路由路径判断Footer显示与隐藏---这种解决方式不好
6.2配置路由的时候,可以给路由添加路由原信息[meta],路由需要配置对象,它的key不能随意写.

8)路由传参

8.1路由跳转有几种方式?
比如A->B
声明式导航:router-link(务必要使用to属性),可以实现路由的跳转
编程式导航:利用的是组件实例的$router.push|replace方法,可以实现路由的跳转
8.2路由传参,参数有几种写法?
params参数:属于路径当中的一部分,需要注意,在配置路由的时候,需要占位
query参数:不属于路径当中的一部分,类似于ajax的queryString, /home?k=v&k2=v2,不需要占位
对象写法,需要使用路由的name

9).路由传参相关面试题
1:路由传递参数(对象写法)path是否可以结合params参数一起使用? 
对象写法,可以使用path和name,但是params不能和path一起用
2:如何指定params参数可传可不传?
①在params占位后加上?②使用对象传参,且进行占位
3:params参数可以传递也可以不传递,但是如果传递是空串,如何解决?
使用undefined,在params后||undefined
4:路由组价能不能传递props数据?
可以的,且有三种写法.布尔值/对象/函数

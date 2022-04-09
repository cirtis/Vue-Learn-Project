复习
1)Search模块需要的服务器的数据,已经请求到了,而且存储于vuex的仓库中,而且有一些数组数据,(已经通过getters进行简化)
切记:getters是为了简化数据而生
2)商品列表以及平台的售卖属性已经转为动态数据(来自服务器的数据)



1)动态开发面包屑中的分类名
编程式导航路由跳转[自己跳自己]
2)动态开发面包屑中的关键字
2.1x掉面包屑中的关键字后,需要将header组件中输入框中的keyword也置空
使用$bus来实现,全局事件总线
子组件给父组件通信:自定义事件
子组件处:
@click="sendData(trademark)"
sendData(trademark){
    // 触发在父组件中中的自定义事件，传递数据
    console.log('数据正在发送');
    this.$emit('sendTrademark',trademark);
        console.log('数据已经发送');
}
父组件处:
@sendTrademark="getTrademark"
getTrademark(trademark){
    console.log('自定义事件已经被触发,并执行了对应的回调');
    console.log('trademark',trademark);
},
@click事件默认向回调函数注入一个参数pointerEvent对象,且位于回调函数的参数末尾.@click=test($event),可以精确接收该pointerEvent对象.即使不接收,也会默认作为函数最后一个参数传入

对于$route的理解,Vue为每个组件都注入了$route,其中的信息是相同的.
JS中没有equals方法. splice的用法:直接切割数组,返回值是割去的部分.

----------------------------------------------------------------
商品搜索模块中的排序操作
问题1:综合|价格 谁应该有类名? 通过order属性值,如果包含1则是综合,包含2则是价格.
问题2:谁该有升降箭头?
    谁有类名,谁就应该有箭头.
    在模板字符串中使用三目运算符可以快捷地在两种状态之间进行切换.
问题3:iconfont图标库的使用

2)很多电商平台为什么需要分页
    数据多时,每一页加载将不会引起卡顿.
由于分页组件在项目中多次用到,可以抽取称为全局组件.
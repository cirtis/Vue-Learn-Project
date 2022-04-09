// 创建一个插件
// Vue的插件一定是暴露一个对象
let myPlugin={};

myPlugin.install = function(Vue,options){
    // 借助Vue可以向原型链上加东西
    // console.log('调用自定义插件',options);
    Vue.directive(options.name,(element,vnode)=>{
        console.log(vnode);
        element.innerHTML = vnode.value.toUpperCase();
    })
}

export default myPlugin;
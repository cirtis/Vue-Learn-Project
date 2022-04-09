// 配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
// 使用插件
Vue.use(VueRouter);
import store from '@/store'

// 引入路由配置
import routes from './routes'

// 先把VueRouter原型对象的push，保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写push
// 第一个参数：告诉原来push方法，该往哪里跳转（传递哪些参数）
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        /* 
        call和apply的区别
        相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        不同点：call与apply传递 参数，call传递时用逗号隔开，而apply传递数组
        */
        originPush.call(this, location, resolve, reject);
        // 直接调用，上下文是window
        // originPush(location,resolve,reject);

    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}




// 配置路由
let router = new VueRouter({
    // 配置路由
    routes,
    // 路由跳转后的滚动行为
    scrollBehavior(to, from, savedPosition) {
        // y=0表示滚动条位于最上方
        return { y: 0 };
    }
})

// 全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
    /* 
        to:目的路由的信息
        from：源路由的信息
        next：放行函数 next() 放行
        next('/login') 放行至指定路由
        next(false) 中断导航，URL改变后回到from的路由
    */
    next();
    //   用户已经登录
    let token = store.state.user.token;
    // 用户信息
    let name = store.state.user.userInfo.name;//如果有用户名，则表示已经获取了用户信息。
    if (token) {
        // 用户已经登录了仍然还想去login
        if (to.path.indexOf('/login') !=-1) {
            next('/')
        } else {
            // 登录了，但是去的不是login
            // 如果用户名已有
            if (name) {
                // console.log('有用户名,放行');
                next();
            } else {
                // 没有用户信息，让仓库派发action，存储用户信息后再跳转
                try {
                    // 获取用户信息成功
                    await store.dispatch('getUserInfo');
                    next();
                    // console.log('没有用户信息,让仓库派发action获取信息成功.');
                } catch (e) {
                    // console.log('*',e.message);
                    // token失效了，获取不了用户信息，重新登录
                    // 清除token
                    await store.dispatch('userLogout');
                    next('/login');
                }

            }
        }
    } else {
        // 未登录，不能去交易相关|支付相关（pay|paysuccess）|个人中心
        // 未登录状态下，去上面这些路由，应该让用户去登录
        let toPath = to.path;
        if (toPath.indexOf('/trade') != -1||toPath.indexOf('/pay') != -1||toPath.indexOf('/center') != -1) {
            // 把未登录的时候去但是没成功到达的路由，存储于地址栏中。
            next('/login?redirect='+toPath)
            // next('/tohome?fromPath='+toPath)//添加一个中转倒计时页面，可将上面的next进行替换
            console.log('路由守卫中的topath',toPath);
        } else {
            next();
        }

    }

});

export default router;
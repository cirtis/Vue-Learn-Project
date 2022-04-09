// 路由配置信息

// 引入路由组件--上来就直接执行了
// --实际生产中应让所有路由都懒加载
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import Tohome from '@/pages/Tohome'

// 引入二级路由组件
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'

/* 
当打包构建应用时，JavaScript包会变得非常大，影响页面加载。
如果能把不同的路由对应的组件分割成不同代码块，然后当路由被访问到的时候才加载对应的组件
这样就更加高效了。
*/


export default [
    {   
        name:'center',
        path:"/center",
        component: Center,
        meta:{show:true},
        // 二级路由组件
        children:[
            {
                // 路径要么只写在外层路由下的名字，要么就写全称
                path:'myorder',
                component:myOrder,
            },
            {
                path:'groupOrder',
                component:groupOrder,
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
    {   
        name:'tohome',
        path:"/tohome",
        component: Tohome,
        meta:{show:false}
    },
    {   
        name:'paysuccess',
        path:"/paysuccess",
        component: PaySuccess,
        meta:{show:true},
    },
    {   
        name:'pay',
        path:"/pay",
        component: Pay,
        meta:{show:true},
        beforeEnter:(to, from, next)=>{
            if(from.path=='/trade'){
                next();
            }else{
                next(false);
            }
        }
    },
    {   
        name:'trade',
        path:"/trade",
        component: Trade,
        meta:{show:true},
        beforeEnter: (to, from, next) => {
            // 只能从购物车页面进入trade页面
            if(from.path=='/shopcart'){
                next();//放行
            }else{
                next(false);
                // 中断当前的导航，如果浏览器的URL改变了，那么URL地址会重置到from路由对应的地址。
                // 如果未登录时在导航栏里输入了trade，则会在login界面死锁。
            }
        }
    },
    {   
        name:'shopcart',
        path:"/shopcart",
        component: ShopCart,
        meta:{show:true}
    },
    {   
        name:'addcartsuccess',
        path:"/addcartsuccess",
        component: AddCartSuccess,
        meta:{show:true}
    },
    {
        // 需要params传参，因此需要占位
        path:"/detail/:skuid?",
        component: Detail,
        meta:{show:true}
    },
    {
        path:"/home",
        component: ()=> import('@/pages/home'),//路由懒加载的简写形式
        meta:{show:true}
    },
    {
        // params参数需要占位
        path:"/search/:keyword?",
        // path:"/search",
        component: Search,
        meta:{show:true},
        // 传参采用对象写法时，需要使用name
        name:'search',
        // props能不能传递props数据？
        // 1.布尔值写法，只能传递params
        // props:true,
        // 2.对象写法:额外给路由组件传递一些props
        // props:{a:1,b:2}
        // 3.函数写法，可以写params参数，query参数，通过props传递给路由组件
        /* props:($route)=>{
            return{keyword:$route.params.keyword,k:$route.query.k}
        } */
        // 简写为
        props:($route)=>({keyword:$route.params.keyword,k:$route.query.k})
        // 路由传参一般不用props，直接通过$route使用
    
    },
    {
        path:"/register",
        component: Register,
        meta:{show:false}
    },
    {
        path:"/login",
        component: Login,
        meta:{show:false}
    },
    // 重定向
    {
        path:"*",
        redirect:'/home'
    }
]
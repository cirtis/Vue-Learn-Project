// 对于axios进行二次封装
import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
// start和end表示请求开始和结束
// 引入进度条的样式
import "nprogress/nprogress.css"

// 引入store，以便于在请求头中加入临时身份id
import state from "@/store"
import store from "@/store";


// 1.利用axios对象的方法create，去创建一个axios实例
// 2.request就是axios，只不过稍微配置一下
const requests=axios.create({
    // 配置对象
    // 基础路径，发请求的时候，路径中自动加上/api
    baseURL:'/api',
    // 请求超时时间5s
    timeout:5000,
});

// 请求拦截器，在发请求前，请求拦截器可以监测到
requests.interceptors.request.use((config) => {
    // config:配置对象，对象里面有一个属性很重要，headers 请求头
    if(store.state.detail.uuid_token){//为请求头添加一个字段userTempId,该字段是与后端协商的，有对应的处理方式
        config.headers.userTempId=store.state.detail.uuid_token;
    }

    // 需要携带token给服务器(如果有的话)
    if(store.state.user.token){
        config.headers.token=store.state.user.token;
    }

    nprogress.start();
    // console.log('开始请求数据===');
    return config;
})

// 响应拦截器
requests.interceptors.response.use((res) => {
    // 成功的回调函数，服务器响应数据后，响应拦截器可以监测到并做一些事情
    // console.log('收到数据===');
    nprogress.done();
    return res.data;
},(error)=>{
    // 失败的回调函数
    return Promise.reject(new Error('fail'));
})

// 对外暴露
export default requests;
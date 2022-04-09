// 对于axios进行二次封装
import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
// start和end表示请求开始和结束
// 引入进度条的样式
import "nprogress/nprogress.css"
// 1.利用axios对象的方法create，去创建一个axios实例
// 2.request就是axios，只不过稍微配置一下
const requests=axios.create({
    // 配置对象
    // 基础路径，发请求的时候，路径中自动加上/api
    baseURL:'/mock',
    // 请求超时时间5s
    timeout:5000,
});

// 请求拦截器，在发请求前，请求拦截器可以监测到
requests.interceptors.request.use((config) => {
    // config:配置对象，对象里面有一个属性很重要，headers 请求头
    nprogress.start();
    return config;
})

// 响应拦截器
requests.interceptors.response.use((res) => {
    // 成功的回调函数，服务器响应数据后，响应拦截器可以监测到并做一些事情
    nprogress.done();
    return res.data;
},(error)=>{
    // 失败的回调函数
    return Promise.reject(new Error('fail'));
})

// 对外暴露
export default requests;
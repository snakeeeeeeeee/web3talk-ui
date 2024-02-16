import axios from 'axios';

// 创建一个axios实例
const http = axios.create({
    baseURL: 'http://114.132.177.135:12345',
    //baseURL: 'http://127.0.0.1:8080',
    timeout: 30000,
    headers: { 'X-Custom-Header': 'foobar' }
});

// 应用请求拦截器
http.interceptors.request.use(function (config) {
    let userWalletAddress = window.localStorage.getItem("userWalletAddress");
    if (userWalletAddress == null) {
        console.log("请先登录")
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 应用响应拦截器
http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


export default http
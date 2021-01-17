//拦截器，当读取接口的时候，都会通过这个js文件进行拦截，拦截后再进行其他操作
import axios from "axios";

//1创建一个axios实例
const service = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 5000,
});

//2请求拦截
// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

//3响应拦截
// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default service;

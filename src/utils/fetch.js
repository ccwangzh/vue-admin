import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import store from '../store';


// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000                  // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers.Authorization = 'Bearer ' + store.getters.token; 
  }
  return config;
}, error => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非200是抛错 可结合自己业务进行修改
  */
    const data = response.data;
    if (data.status !== 200) {
      Message({
        message: data.message,
        type: 'error',
        duration: 5 * 1000
      });

      // 401:需要用户登录;
      if (data.status === 401) {
        MessageBox.confirm('你无权访问，或者登录已经过期', '提示', {
          confirmButtonText: '重新登录',
          type: 'warning'
        }).then(paras => {
          console.log(paras);
          store.dispatch('LogOut').then(() => {
            location.reload();// 为了重新实例化vue-router对象 避免bug
          });
        })
      }
      return Promise.reject(data);
    } else {
      return data;
    }
  },
  error => {
    console.log('err' + error);// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
)

export default service;

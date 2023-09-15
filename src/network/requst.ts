import axios from "axios"

import { ElMessage, ElNotification } from 'element-plus';
import { getStorage } from "@/utils/common";

const request = axios.create({
    // API 请求的默认前缀
    // baseURL: import.meta.env.VUE_APP_API_BASE_URL as string | undefined,
  
    withCredentials: true,
    timeout: 60000 // 请求超时时间
  });

  // 异常拦截处理器
const errorHandler = (res: any) => {
    // loading.close();
    const data = res.response && res.response.data;
    if (data.code === 2 || data.code === 3) {
      location.href = './login';
    } else if (data.error && data.error[0]) {
      ElMessage.error(data.error[0]);
    } else {
      ElNotification({
        title: '请求失败',
        message: res.message,
        type: 'error'
      });
    }
    return Promise.reject(res);
  };
  
  // request interceptor
  request.interceptors.request.use((config: any) => {
    // loading = ElLoading.service({
    //   lock: true,
    //   text: 'Loading',
    //   spinner: 'el-icon-loading',
    //   background: 'rgba(0, 0, 0, 0.4)'
    // });
    const token = getStorage('token');
    // 如果 token 存在
    // 让每个请求携带自定义 token 请根据实际情况自行修改
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    if (config.isBlob) {
      config.responseType = 'blob';
    }
    //修改请求格式
    if (config.formData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
  
    config.url = 'api' + config.url; // 代理加api
    return config;
  }, errorHandler);

  export function $post(url: string, params: object) {
    return request({
      url: '/' + url,
      method: 'post',
      data: params
    });
  }
  export function $get(url: string, query: object) {
    return request({
      url: '/' + url,
      method: 'get',
      params: query
    });
  }
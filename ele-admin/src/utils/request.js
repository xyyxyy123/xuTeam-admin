'use strict' // 使用严格模式

// import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'

const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi'
const serivce = axios.create({
  baseURL: BASEURL,
  timeout: 5000
})

// 添加请求拦截器
serivce.interceptors.request.use(config => {
  // 在发送请求之前做些什么
//   if (token) {
//     config.headers['X-Token'] = token
//   }
//   config.headers['X-Token'] = '2'
  //   config.headers['Content-Type'] = 'application/json;charset=UTF-8'
  return config // return的意思是谁调用就返回给谁
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
serivce.interceptors.response.use(response => {
  // 对响应数据做点什么
  // 一般是请求接口不通过时，后台会返回相对应的code码，然后前端给出相应的提示就可以，
  // 这就是对响应做的处理,这里做的目的是前后台双方都做防护。不仅前台要做处理，后台也会返回相应的code码表示相应的处理
  let data = response.data
  if (data.resCode !== 0) {
    Message.error(data.message) // 当前台没有做判断的时候，这里做的判断前台也能提示出来
  }
  // ...接下来这里会根据项目写等于相应的code码时，会做出不同的提示
  return response // --->这里的return先返回给apidoc下的接口处理中，然后接口处理处理再return返回给实际请求接口的then成功回调中
}, error => {
  // 对响应错误做点什么
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error) // --->这里的return先返回给apidoc下的接口处理中，然后接口处理处理再return返回给实际请求接口的catch失败回调中
})

export default serivce

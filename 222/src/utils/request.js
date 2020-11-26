import axios from 'axios'
import Config from '@/settings'
import { getToken } from '@/utils/auth'
import { Notification } from 'element-ui'
// import store from '@/store'
import router from '@/router/routers'

//创建axios,赋给变量
const service = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : '/',
  timeout: Config.timeout
})

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers['Authorization'] = getToken()
    }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    // 对请求错误做些什么
    console.log(error)
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  response => {
    // 判断响应状态码，具体状态码与后台对接
    const code = response.status
    if (code < 100 || code > 300) {
      //失败
      Notification.error({
        title: response.message
      })
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    let code = 0
    try {
      code = error.response.data.status
    } catch (e) {
      if (error.toString().indexOf('Error: timeout') !== -1) {
        Notification.error({
          title: '网络请求错误',
          duration: 5000
        })
      }
      if (code) {
        if (code === 401) {
          //token失效或过期
          // store.dispatch("LogOut").then(() => {
          //   //用户登录界面提示
          //   location.reload();
          // });
        } else if (code === 403) {
          //Forbidden - 拒绝访问
          router.push({ path: '/401' })
        } else {
          const errorMsg = error.response.data.message
          if (errorMsg !== undefined) {
            Notification.error({
              title: errorMsg,
              duration: 5000
            })
          }
        }
      } else {
        Notification.error({
          title: '接口请求失败',
          duration: 5000
        })
      }
    }
    return Promise.reject(error)
  }
)

export default service

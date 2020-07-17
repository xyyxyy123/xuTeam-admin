import request from '@/utils/request.js'
// 获取验证码接口，登录moudle:login  注册moudle:register只是参数不一样
export function GetInfo (data) {
  return request({
    url: '/getSms/', // 路径
    method: 'post', // 请求方式
    data
  })
}
// 注册接口
export function Register (data) {
  return request({
    url: '/register/', // 路径
    method: 'post', // 请求方式
    data
  })
}
// 登陆接口
export function Login (data) {
  return request({
    url: '/login/', // 路径
    method: 'post', // 请求方式
    data
  })
}

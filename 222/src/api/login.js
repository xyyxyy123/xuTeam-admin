import request from '@/utils/request'

/**
 * 登录按钮执行事件，判断用户是否有效
 * @param {string} username - 用户名
 * @param {string} password - 密码
 * @param {string} code - 验证码
 * @param {string} uuid - UUID
 */
export function login(username, password, code, uuid) {
  return request({
    url: 'auth/login',
    method: 'post',
    data: {
      username,
      password,
      code,
      uuid
    }
  })
}

/**
 * 获取用户信息
 */
export function getInfo() {
  return request({
    url: 'auth/info',
    method: 'get'
  })
}

/**
 * 登录页获取验证码
 */
export function getCodeImg() {
  return request({
    url: 'auth/code',
    method: 'get'
  })
}

/**
 * 用户退出
 */
export function logout() {
  return request({
    url: 'auth/logout',
    method: 'delete'
  })
}

/**
 * 登录页获取验证码（测试接口）
 */
export function getSms() {
  return request.request({
    url: '/article/list',
    method: 'get'
  })
}

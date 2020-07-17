// cookie存储token的方法的引入
import Cookies from 'js-cookie'

const admintoKen = 'admin_toKen' // 这里是提取公共的变量
const userName = 'user_name'

export function getToken () {
  return Cookies.get(admintoKen)
}
export function setToken (val) {
  return Cookies.set(admintoKen, val)
}
export function removeToken () {
  return Cookies.remove(admintoKen)
}
export function getUsername () {
  return Cookies.get(userName)
}
export function setUsername (val) {
  return Cookies.set(userName, val)
}
export function removeUsername () {
  return Cookies.remove(userName)
}

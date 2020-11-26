import Cookies from 'js-cookie'
import Config from '@/settings'

const TokenKey = Config.TokenKey

/**
 * 获取cookie中的token值
 */
export function getToken() {
  return Cookies.get(TokenKey)
}

/**
 * cookie中存储token值
 * @param {string} token token值
 * @param {boolean} rememberMe 是否记住我
 */
export function setToken(token, rememberMe) {
  if (rememberMe) {
    return Cookies.set(TokenKey, token, { expires: Config.tokenCookieExpires })
  } else {
    return Cookies.set(TokenKey, token)
  }
}

/**
 * 删除cookie中的token值
 */
export function removeToken() {
  return Cookies.remove(TokenKey)
}

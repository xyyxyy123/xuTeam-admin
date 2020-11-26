/**
 * 过滤特殊字符
 * @param {value}
 */
export function stripscript(value) {
  var pattern = new RegExp(
    "[`~!@#$%^&*()+=|{}':;',\\[\\]<>/?~！@#� \uE009\uF8F5￥%……&*（）——+|{}【】‘；：”“’。，、？]"
  )
  var rs = ''
  for (var i = 0; i < value.length; i++) {
    rs = rs + value.substr(i, 1).replace(pattern, '')
  }
  return rs
}
/**
 * 验证特殊字符
 * @param {value}
 */
export function validateScript(value) {
  var reg = new RegExp(
    "[`~!@#$^&*=|{}':;',\\[\\]<>《》/?~！@#￥……&*|{}【】‘；：”“'。，、？' ']"
  )
  return reg.test(value) ? true : false
}
/**
 * 验证邮箱
 */
export function validateEmail(value) {
  let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return reg.test(value) ? true : false
}
/* 大写字母*/
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}
/* 小写字母*/
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}
/* 大小写字母*/
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}
/* 校验金额保留两位小数金额*/
export function isMoney(money) {
  var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
  if (reg.test(money)) {
    return true
  } else {
    return false
  }
}
/* 中英文验证*/
export function validCharacter(str) {
  const characterReg = /^[\u4E00-\u9FA5A-Za-z]+$/
  return characterReg.test(str)
}
/* 手机号验证*/
export function validPhone(str) {
  const phoneReg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
  return phoneReg.test(str)
}

/* 名称验证*/
// export function validName(name) {
//   let nameRule = /[\u4E00-\u9FA5]+/
//   return nameRule.test(name)
// }

/**
 * 校验是否是外部图片
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

//数字、字母、下划线验证
export function validName(str) {
  const nameReg = /^[0-9a-zA-Z_]{1,}$/
  return nameReg.test(str)
}
//密码验证,大小写字母、数字、下划线任意三种组合,{0,}表示字符的限制
export function validPassword(str) {
  const passReg = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\\W_!@#$%^&*`~()-+=]+$)(?![0-9\\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\\W_!@#$%^&*`~()-+=]{0,}$/
  return passReg.test(str)
}

/**
 * 解析地址栏路径
 * @param {*} url
 */
function param2Obj(url) {
  // 正则：+ 号代表前面的字符必须至少出现一次
  // 匹配特殊字符，前面加反斜杠字符\进行转义，下面+是特殊字符
  // /g 表示该表达式将用来在输入字符串中查找所有可能的匹配，返回的结果可以是多个。如果不加/g最多只会匹配一个
  const params = url.split('?')[1]
  const search = params ? decodeURIComponent(params.replace(/\+/g, ' ')) : false
  // const search = decodeURIComponent(url.split('?')[1].replace(/\+/g, ' '))
  if (!search) {
    return {}
  }

  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

module.exports = {
  param2Obj
}

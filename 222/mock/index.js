const Mock = require('mockjs')
const { param2Obj } = require('./utils/utils')

const user = require('./modules/user')
const article = require('./modules/article')
const role = require('./modules/role/index')
const menu = require('./modules/menu')

const mocks = [
  {
    //设置一个开关，使模拟请求与真实请求并存
    intercept: true,
    fetchs: [...user, ...article, ...role, ...menu]
  }
  // {
  //   intercept: true,
  //   fetchs: [...list]
  // }
]

/**
 * for front mock, please use it cautiously, it will redefine XMLHttpRequest,
 * which will cause many of your third-party libraries to be invalidated(like progress event).
 *
 * XMLHttpRequest对象(简称XHR)，这是由微软首先引入的一个特性，其他浏览器提供商后来都提供了相同的实现。
 * XHR为向服务器发送请求和解析服务器响应提供了流畅的接口，能够以异步方式从服务器取得更多信息，意味着用户单击后，可以不必刷新页面也能取得新数据
 *
 * 重新定义XMLHttpRequest，针对Mock
 */
function mockXHR() {
  //使用 prototype 属性来向对象添加属性
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      //是否支持跨域
      this.custom.xhr.withCredentials = this.withCredentials || false
      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  /**
   * 解析api并根据url模拟数据
   * @param {*} respond 响应
   */
  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  // RegExp 对象用于存储检索模式,通过 new 关键词来定义 RegExp 对象。以下代码定义了名为 patt1 的 RegExp 对象，其模式是 "e"：
  // new RegExp('e') 当您使用该 RegExp 对象在一个字符串中检索时，将寻找的是字符 "e"。
  for (const i of mocks) {
    if (i.intercept) {
      for (const fetch of i.fetchs) {
        Mock.mock(
          new RegExp(fetch.url), // 拦截请求的地址，URL 字符串或 URL 正则 可选
          fetch.type || 'get', // 拦截Ajax类型 可选
          XHR2ExpressReqWrap(fetch.response) //生成数据的模板 对象或字符串 可选
        )
      }
    }
  }
}

module.exports = {
  mocks,
  mockXHR
}

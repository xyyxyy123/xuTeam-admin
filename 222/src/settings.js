module.exports = {
  /**
   * 项目名称
   */
  title: '预警系统',
  /**
   * 存储在cookie中的token名
   */
  TokenKey: 'PRE-WARNING-TOEKN',
  /**
   * 记住密码状态下token在Cookie中存储的天数，默认1天
   */
  tokenCookieExpires: 1,
  /**
   * 记住密码状态下的密码在Cookie中存储的天数，默认1天
   */
  passCookieExpires: 1,
  /**
   * @description 请求超时时间，毫秒（默认2分钟）
   */
  timeout: 2000, //1200000,
  /**
   * 是否显示设置的底部信息
   */
  showFooter: true,
  /**
   * 底部文字，支持html语法
   */
  footerTxt:
    '© 2019 Zheng Jie <a href="http://www.apache.org/licenses/LICENSE-2.0" target="_blank">Apache License 2.0</a>',
  /**
   * 备案号
   */
  caseNumber: '浙ICP备18005431号'
}

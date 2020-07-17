const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'assets',
  // webpack相关配置
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg')
    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear()
    // 添加要替换的 loader
    svgRule
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))
  },
  // 跨域配置服务
  devServer: {
    // open: true, // 是否自动弹出浏览器页面
    host: 'localhost', // 默认可以被访问的地址
    port: '8080',
    https: false, // 是否使用https协议
    hotOnly: false, // 是否开启热更新
    proxy: { // 配置代理
      // '/devApi': { // 只给网址的写法 http://www.web-jshtml.cn
      //   target: 'http://www.web-jshtml.cn', // API服务器的地址 其实是/devApi替换了这里的地址(API服务器的地址)然后再加上前面的localhot:8080/devApi/ 就是开发环境常见的地址了
      //   changeOrigin: true, // 是否跨域
      //   pathRewrite: { // 路径重写是一个正则的校验,正则查找如果遇到/devApi，就用后面的值代替
      //     '^/devApi': '/productapi'
      //   }
      // },
      '/devApi': { // 只给网址的写法 http://www.web-jshtml.cn
        target: 'http://www.web-jshtml.cn/productapi/token', // 加token的这个接口会返回token和username方便使用 // API服务器的地址 其实是/devApi替换了这里的地址(API服务器的地址)然后再加上前面的localhot:8080/devApi/ 就是开发环境常见的地址了
        changeOrigin: true, // 是否跨域
        pathRewrite: { // 路径重写是一个正则的校验,正则查找如果遇到/devApi，就用后面的值代替
          '^/devApi': ''
        }
      }
      // '/devApi': {  //给网址带文件夹的写法 http://www.web-jshtml.cn/productapi
      //   target: 'http://www.web-jshtml.cn/productapi', // API服务器的地址 其实是/devApi替换了这里的地址(API服务器的地址)然后再加上前面的localhot:8080/devApi/ 就是开发环境常见的地址了
      //   changeOrigin: true, // 是否跨域
      //   pathRewrite: { // 路径重写是一个正则的校验,正则查找如果遇到/devApi，就用后面的值代替
      //     '^/devApi': ''
      //   }
      // }
    }
  }

}

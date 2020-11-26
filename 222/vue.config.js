/**
 * vue.config.js 是一个可选的配置文件，如果项目的 (和 package.json 同级的) 根目录中存在这个文件，那么它会被 @vue/cli-service 自动加载。
 */
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // 选项
  // 基本路径。这个值也可以被设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径。
  publicPath: '/',
  //输出文件目录，当运行 vue-cli-service build 时生成的生产环境构建文件的目录。注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。
  outputDir: 'dist',
  //放置生成的静态资源 (js、css、img、fonts) 的目录。
  assetsDir: 'static',
  //指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  indexPath: 'index.html',
  //默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希
  filenameHashing: true,
  //用于多页配置，默认是 undefined。在 multi-page（多页）模式下构建应用。每个“page”应该有一个对应的 JavaScript 入口文件。
  pages: {
    //其值应该是一个对象，对象的 key 是入口的名字
    index: {
      // page 的入口文件,除了 entry 之外都是可选的
      entry: 'src/main.js',
      // 模板文件
      template: 'public/index.html',
      // 在 dist/index.html 的输出文件
      filename: 'index.html',
      //当使用页面 title 选项时，template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // 在这个页面中包含的块
      //默认情况下会包含提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
    // 当使用只有入口的字符串格式时
    //模板文件默认是 `public/subpage.html
    //如果不存在，就回退到 `public/index.html`
    //输出文件默认是 `subpage.html`。
    // subpage: "src/subpage/main.js"
  },
  //是否在保存的时候使用 `eslint-loader` 进行检查。
  lintOnSave: true,
  //是否使用带有浏览器内编译器的完整构建版本
  runtimeCompiler: false,
  //默认情况下 babel-loader 会跳过所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  transpileDependencies: [
    /* string or regex */
  ],
  //是否为生产环境构建生成 source map？如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  //设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。
  crossorigin: '',
  //在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)。
  //如果你构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性。
  integrity: false,

  // ===============================Webpack相关配置==================================
  //调整内部的 webpack 配置
  configureWebpack: () => {
    // 如果这个值是一个对象，则会通过webpack-merge合并到最终的配置中。
    // 如果这个值是一个函数，则会接收被解析的配置作为参数。该函数及可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
  },
  //(Object | Function)
  chainWebpack: config => {
    // 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))
      .set('@crud', resolve('src/components/Crud'))

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icon'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icon'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    config.module
      .rule('css')
      .test(/\.css$/)
      .oneOf('vue')
      .resourceQuery(/\?vue/)
      .use('px2rem')
      .loader('px2rem-loader')
      .options({
        remUnit: 192
      })
  },
  // 配置 webpack-dev-server 行为。有些值像 host、port 和 https 可能会被命令行参数覆写。
  devServer: {
    //open 在devServer启动且第一次构建完成时，自动用我们的系统的默认浏览器去打开要开发的网页
    open: false,
    host: '0.0.0.0',
    port: 8080,
    https: false,
    //热更新.hot和hotOnly的区别是在某些模块不支持热更新的情况下，前者会自动刷新页面，后者不会刷新页面，而是在控制台输出热更新失败
    hotOnly: false,
    // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#配置代理
    // 配置代理，处理本地跨域
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASE_API,
        // 如果接口跨域，需要进行这个参数配置
        changeOrigin: true,
        //默认情况下，不接受运行在 HTTPS 上，且使用了无效证书的后端服务器。如果你想要接受，只要设置 secure: false 就行
        // secure: false,
        pathRewrite: {
          '^/api': 'api'
        }
      },
      '/auth': {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        pathRewrite: {
          '^/auth': 'auth'
        }
      }
    },
    before: require('./mock/mock-server.js')
  },
  // CSS 相关选项
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (而不是动态注入到 JavaScript 中的 inline 代码)(只用在生产环境中)。生产环境下是 true，开发环境下是 false
    // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
    extract: true,
    // 是否开启 CSS source map？
    sourceMap: false,
    // 为预处理器的 loader 传递自定义选项。传递给Css-loader 时，使用 `{ Css: { ... } }`。
    loaderOptions: {
      // sass: {
      //   // 这里的选项会传递给 css-loader
      //   prependData: `@import "./src/styles/global.scss";`
      // }
      // postcss: {
      //   // 这里的选项会传递给 postcss-loader
      // }
    },
    // 为所有的 CSS 及其预处理文件开启 CSS Modules。 // 这个选项不会影响 `*.vue` 文件。
    //默认情况下，只有*.module.[ext]结尾的文件才会被视作 CSS Modules 模块。设置为rue后你就可以去掉文件名中的.module并将所有的*.(css|scss|sass|less|styl(us)?)文件视为 CSS Modules 模块。
    requireModuleExtension: true
  },
  // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader` 在多核机器下会默认开启。
  parallel: require('os').cpus().length > 1,
  // PWA 插件的选项。
  // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-pwa/README.md
  pwa: {},
  // 三方插件的选项
  pluginOptions: {
    //这是一个不进行任何 schema 验证的对象，因此它可以用来传递任何第三方插件选项。
  }
}

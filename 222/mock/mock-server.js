const path = require('path')
const Mock = require('mockjs')
//chalk是一个颜色的插件。可以通过chalk.blue(‘hello world’)来改变颜色
const chalk = require('chalk')
//chokidar 可以监控各种文件、文件夹变化事件，包含 add , change , unlink , addDir , unlinkDir 等
const chokidar = require('chokidar')
//在http请求种，POST、PUT、PATCH三种请求方法中包含着请求体，也就是所谓的request，在Nodejs原生的http模块中，请求体是要基于流的方式来接受和解析。
//body-parser是一个HTTP请求体解析的中间件，使用这个模块可以解析JSON、Raw、文本、URL-encoded格式的请求体，
const bodyParser = require('body-parser')

//path.join() 将路径片段使用特定的分隔符（window：\）连接起来形成路径，并规范化生成的路径
//process.cwd() 方法会返回 Node.js 进程的当前工作目录
const mockDir = path.join(process.cwd(), 'mock')

/**
 * 注册mock中各模块的路由
 * @param {*} app
 */
function registerRoutes(app) {
  let mockLastIndex
  const { mocks } = require('./index.js')
  const mocksForServer = mocks.map(route => {
    return responseFake(route.url, route.type, route.response)
  })
  for (const mock of mocksForServer) {
    app[mock.type](mock.url, mock.response)
    mockLastIndex = app._router.stack.length
  }
  //mock路由的长度
  const mockRoutesLength = Object.keys(mocksForServer).length
  return {
    mockRoutesLength: mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength
  }
}

/**
 * 清楚mock的注册路由
 * require.cache：获取模块的缓存
 * 使用require.resolve函数来查询某个模块文件的带有完整绝对路径的文件名
 */
function unregisterRoutes() {
  Object.keys(require.cache).forEach(i => {
    if (i.includes(mockDir)) {
      delete require.cache[require.resolve(i)]
    }
  })
}

/**
 * 生成模拟数据
 * @param {*} url 请求路径
 * @param {*} type 请求类型
 * @param {*} respond 响应
 */
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`${process.env.VUE_APP_BASE_API}${url}`),
    type: type || 'get',
    response(req, res) {
      console.log('request invoke' + req.path)
      res.json(
        Mock.mock(respond instanceof Function ? respond(req, res) : respond)
      )
    }
  }
}

module.exports = app => {
  // parse app.body
  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )

  const mockRoutes = registerRoutes(app)
  var mockRoutesLength = mockRoutes.mockRoutesLength
  var mockStartIndex = mockRoutes.mockStartIndex

  // watch files, hot reload mock server
  chokidar
    .watch(mockDir, {
      ignored: /mock-server/,
      ignoreInitial: true
    })
    .on('all', (event, path) => {
      if (event === 'change' || event === 'add') {
        try {
          // remove mock routers stack
          app._router.stack.splice(mockStartIndex, mockRoutesLength)
          // clear routes cache
          unregisterRoutes()

          const mockRoutes = registerRoutes(app)
          mockRoutesLength = mockRoutes.mockRoutesLength
          mockStartIndex = mockRoutes.mockStartIndex
          console.log(
            chalk.magentaBright(
              `\n > Mock Server hot reload success! changed  ${path}`
            )
          )
        } catch (error) {
          console.log(chalk.redBright(error))
        }
      }
    })
}

//引入文件系统模块
const fs = require('fs')
//引入path模块
const path = require('path')
const JSON5 = require('json5')

module.exports = {
  //读取json文件
  getJsonFile: function(filePath) {
    //读取指定json文件
    var json = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8')
    return JSON5.parse(json)
  }
}

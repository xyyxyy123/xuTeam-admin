import { parseTime } from '@/utils/parseTime'

// //引入文件系统模块
// const fs = require('fs')
// //引入path模块
// const path = require('path')

// module.exports = {
//   //读取json文件
//   getJsonFile: function(filePath) {
//     //读取指定json文件
//     var json = fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8')
//     return JSON.parse(json)
//   }
// }

// 下载文件
export function downloadFile(obj, name, suffix) {
  const url = window.URL.createObjectURL(new Blob([obj]))
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  const fileName = parseTime(new Date()) + '-' + name + '.' + suffix
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

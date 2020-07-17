import Vue from 'vue'
import SvgIcon from '@/components/svgicon'// svg组件

Vue.component('svg-icon', SvgIcon)
//  解析文件的规则
/*
 * 第一个参数表示解析哪个文件夹
 * 第二个参数表示是否遍历
 * 第三个参数表示以什么文件缀名结尾
*/
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)

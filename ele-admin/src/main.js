import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
// import './plugins/element.js'//vue3.0自动编译
import '@/styles/index.scss'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/router/premit'
import '@/icons/index.js'

Vue.use(Element)
// 自定义组件注册的一种写法 svg-icon是组件的一种名称
// Vue.component('svg-icon', {
//   template: '<div>sfdsfnsdjf</div>'
// })
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

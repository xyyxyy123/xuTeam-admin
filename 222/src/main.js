import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import App from './App.vue'
import router from './router/routers'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'
import './router/index'
//Svg-icon
import '@/components/SvgIcon/js'
// 权限指令
import permission from './components/Permission'
//屏幕分辩率
import 'lib-flexible'
if (process.env.NODE_ENV === 'development') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(ElementUI)
Vue.use(VueCompositionApi)
Vue.use(permission)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

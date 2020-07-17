import router from './index.js'
import { getToken, removeToken, removeUsername } from '@/utils/auth.js'
import store from '@/store/index'

/**
 * 路由白名单
 */
const WhiteRouter = ['/login'] // 不重定向会出现白名单
// 路由守卫也可以单独提出一个文件，在main.js中引入就可以
router.beforeEach((to, from, next) => { // 什么时候会触发路由守卫？在浏览器路径改变的时候，就会触发(即路由改变的时候)
  if (getToken()) {
    // 存在会做相应的处理,如果不做处理就会白屏
    // next()// 当不做任何处理时是直接跳过去，没有考虑判断的时候
    if (to.path === '/login') { // 如果退到登录页面时，cookie和vuex中存储的都要清空，目的是回到login登录的初始状态
      removeToken()
      removeUsername()
      store.commit('SET_TOKEN', '')
      store.commit('SET_USERNAME', '')
      // next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (WhiteRouter.indexOf(to.path) !== -1) { // 表示存在进去to钩子中
      next() // 进入下一个页面to钩子中,不带参数不会走路由的守卫
    } else {
      next('/login') // 不存在还留在login页面,手动发生了路由的改变
    }
  }
})

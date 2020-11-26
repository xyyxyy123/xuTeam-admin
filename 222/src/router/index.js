import router from './routers'
import store from '@/store'
import NProgress from 'nprogress'
import { getToken } from '@/utils/auth'
import Config from '@/settings'
import { buildMenus } from '@/api/system/menu'
import { filterAsyncRouter } from '@/store/modules/permission'

/**
 * 路由白名单
 */
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + '-' + Config.title
  }
  NProgress.start()
  debugger
  if (getToken()) {
    // 已登录且要跳转的页面是登录页
    if (to.path === '/login') {
      //如果是登录状态，退出，删除相关cookie
      store.dispatch('user/LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
      // next({ path: '/' })
      NProgress.done()
    } else {
      //登录到其他页面,判断当前用户是否已拉取完user_info信息
      if (store.getters.roles.length === 0) {
        // 拉取user_info
        store
          .dispatch('user/GetInfo')
          .then(() => {
            //动态路由，拉取菜单
            loadMenus(next, to)
          })
          .catch(err => {
            console.log(err, 'error')
            store.dispatch('user/LogOut').then(() => {
              //为了重新实例化vue-router对象，避免bug
              location.reload()
            })
          })
      } else if (store.getters.loadMenus) {
        //登录时未拉取菜单，在此处拉取
        //修改LoadMenus为false,防止死循环
        store.dispatch('user/updateLoadMenus').then(() => {})
        loadMenus(next, to)
      } else {
        next()
      }
    }
  } else {
    /* has no token  fullPath匹配路由，path匹配路径。*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

export const loadMenus = (next, to) => {
  //根据角色获取菜单
  const params = {
    roles: store.getters.roles
  }
  buildMenus(params)
    .then(res => {
      let asyncRouter = filterAsyncRouter(res.data)
      asyncRouter.push({ path: '*', redirect: '/404', hiddenn: true })
      store.dispatch('permission/GenerateRouters', asyncRouter).then(() => {
        //路由更新
        // router.options.routes = store.getters.permission_routers
        //动态添加可访问路由表
        router.addRoutes(asyncRouter)
        //重新载入 ...to es6扩展运算符，防止内容发生变化的情况  replace不被记录历史记录
        next({ ...to, replace: true })
      })
    })
    .catch(err => {
      console.log(err)
    })
}

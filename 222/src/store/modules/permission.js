import { constantRouterMap } from '@/router/routers'
import Dashboard from '@/views/dashboard/index.vue'

const permission = {
  namespaced: true,
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRouters({ commit }, asyncRouter) {
      return new Promise(resolve => {
        commit('SET_ROUTERS', asyncRouter)
        resolve(asyncRouter)
      })
    }
  }
}

// 遍历后台传来的路由字符串，转换为组件对象
export const filterAsyncRouter = routers => {
  return routers.filter(router => {
    if (router.component) {
      // Dashboard组件特殊处理
      if (router.component === 'Dashboard') {
        router.component = Dashboard
      } else {
        const component = router.component
        router.component = loadView(component)
      }
    }
    if (router.children && router.children.length) {
      router.children = filterAsyncRouter(router.children)
    }
    return true
  })
}

export const loadView = view => {
  return resolve => require([`@/views/${view}`], resolve)
}
export default permission

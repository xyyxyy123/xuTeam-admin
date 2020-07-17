import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/views/layout/layout'

Vue.use(Router)

export default new Router({
  routes: [
    // 首次进来项目时
    {
      path: '/',
      redirect: 'about',
      component: layout
    },
    // 登录页
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login.vue')
    },
    // 侧边栏
    {
      path: '/about',
      component: layout,
      redirect: 'about',
      children: [
        {
          path: '/about',
          name: 'about',
          component: () => import('@/views/dashboard/about.vue')
        },
        {
          path: '/seconde',
          name: 'seconde',
          component: () => import('@/views/dashboard/seconde.vue')
        },
        {
          path: '/firsd',
          name: 'firsd',
          component: () => import('@/views/dashboard/firsd.vue')
        },
        {
          path: '/foruth',
          name: 'foruth',
          component: () => import('@/views/dashboard/foruth.vue')
        },
        {
          path: '/five',
          name: 'five',
          component: () => import('@/components/search/play.vue')
        },
        {
          path: '/six',
          name: 'six',
          component: () => import('@/components/table/play.vue')
        }
      ]
    }
  ]
})

import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout/layout.vue'

Vue.use(VueRouter)

export const constantRouterMap = [
  {
    path: '/',
    name: '首页·预警动态',
    redirect: 'dashboard',
    component: Layout,
    // hidden: true,
    // icons: '风险为本-hover',
    // icons: '风险为本-hover',
    // icons: '风险为本-hover',
    icons: '设置',
    children: [
      {
        path: 'dashboard',
        component: resolve => require(['@/views/dashboard/index.vue'], resolve)
      }
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: resolve => require(['@/views/features/redirect'], resolve)
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: resolve => require(['@/views/login/login'], resolve)
  },
  {
    path: '/404',
    component: resolve => require(['@/views/features/404'], resolve),
    hidden: true
  },
  {
    path: '/401',
    component: resolve => require(['@/views/features/401'], resolve),
    hidden: true
  },
  {
    path: '/table',
    name: 'table',
    component: resolve => require(['@/components/Table/demo.vue'], resolve),
    hidden: true,
    caseSensitive: true
  },
  {
    path: '/system',
    component: Layout,
    name: '系统管理',
    icons: 'systemMenu',
    redirect: 'user',
    children: [
      {
        path: 'user',
        name: '用户管理',
        component: resolve =>
          require(['@/views/system/user/index.vue'], resolve)
      },
      {
        path: 'role',
        name: '角色管理',
        component: resolve =>
          require(['@/views/system/role/index.vue'], resolve)
      },
      {
        path: 'menu',
        name: '菜单管理',
        component: resolve =>
          require(['@/views/system/menu/index.vue'], resolve)
      },
      {
        path: 'dictionary',
        name: '字典管理',
        component: resolve =>
          require(['@/views/system/dictionary/index.vue'], resolve)
      },
      {
        path: 'dept',
        name: '机构管理',
        component: resolve =>
          require(['@/views/system/dept/index.vue'], resolve)
      }
    ]
  }
  // {
  //   path: '/sys',
  //   component: Layout,
  //   name: '管理',
  //   icons: 'menu',
  //   redirect: 'user',
  //   children: [
  //     {
  //       path: 'user',
  //       name: '用户管理',
  //       component: resolve =>
  //         require(['@/views/system/user/index.vue'], resolve)
  //     },
  //     {
  //       path: 'role',
  //       name: '角色管理',
  //       component: resolve =>
  //         require(['@/views/system/role/index.vue'], resolve)
  //     }
  //   ]
  // }
]

export default new VueRouter({
  //默认hash模式
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

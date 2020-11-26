// import Vue from 'vue'
// const Mock = require('mockjs')
const { asyncRoutes } = require('./routes.js')

const roles = [
  {
    key: 'admin',
    name: 'admin',
    description: 'Super Administrator. Have access to view all pages.',
    routes: asyncRoutes
  },
  {
    key: 'editor',
    name: 'editor',
    description: 'Normal Editor. Can see all pages except permission page',
    routes: asyncRoutes.filter(i => i.path !== '/permission') // just a mock
  },
  {
    key: 'visitor',
    name: 'visitor',
    description:
      'Just a visitor. Can only see the home page and the document page',
    routes: [
      {
        path: '/system/menu',
        name: 'ok',
        component: 'system/menu/index.vue',
        hidden: false
      }
    ]
  }
]

module.exports = [
  {
    url: 'api/system/loadMenu',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: roles.filter(i => config.body.roles.indexOf(i.key) >= 0)[0].routes
      }
    }
  },
  // mock get all roles form server
  {
    url: 'api/system/getRoles',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        data: roles
      }
    }
  }
]

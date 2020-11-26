const list = [
  {
    id: 13,
    parentId: -1,
    children: [
      {
        id: 5,
        parentId: 13,
        children: [
          {
            id: 1,
            parentId: 5,
            children: [
              {
                id: 1287638547270959106,
                parentId: 1,
                children: [],
                title: '按钮-新增用户',
                routingAddress: '的',
                path: '/save',
                mark: 'user:add',
                type: 2,
                orderNum: 0,
                createTime: '2020-07-27 14:38:47'
              },
              {
                id: 1287698710644314113,
                parentId: 1,
                children: [],
                title: '按钮-删除用户',
                routingAddress: 'user',
                path: '/remove',
                mark: 'user:remove',
                type: 2,
                orderNum: 0,
                createTime: '2020-07-27 18:37:51'
              },
              {
                id: 1287698792630374402,
                parentId: 1,
                children: [],
                title: '按钮-批量删除用户',
                routingAddress: 'user',
                path: '/batchRemove',
                type: 2,
                orderNum: 0,
                createTime: '2020-07-27 18:38:11'
              },
              {
                id: 1288313610823495682,
                parentId: 1,
                children: [],
                title: '按钮-编辑用户',
                routingAddress: 'user',
                path: '/update',
                mark: 'user:edit',
                type: 2,
                orderNum: 0,
                createTime: '2020-07-29 11:21:15'
              }
            ],
            icon: 'fa-user',
            title: '三级菜单',
            routingAddress: '/admin/user',
            path: '/adminSys/baseManager/userManager',
            type: 1,
            orderNum: 0,
            createTime: '2020-07-27 18:38:11'
          }
        ],
        icon: 'setting',
        title: '二级目录',
        routingAddress: '/admin',
        path: '/adminSys/baseManager',
        type: 0,
        orderNum: 0,
        createTime: '2020-07-27 18:38:11'
      }
    ],
    icon: 'password',
    title: '一级目录',
    routingAddress: '/base',
    path: '/adminSys',
    type: 0,
    orderNum: 5,
    mark: 'user:add',
    createTime: '2020-07-27 18:38:11'
  }
]

function getMenu(tree, pid, name) {
  let reMenu = []

  tree.forEach(item => {
    if ((name && item.title.indexOf(name) !== -1) || !name) {
      if (item.parentId === +pid) {
        const data = { ...item }
        data.children = undefined
        data.hasChildren = item.type !== 2 ? true : false
        reMenu.push(data)
      } else if (item.children && item.children.length > 0) {
        reMenu.push(getMenu(item.children, pid, name)[0])
      }
    }
  })

  return reMenu
}

function getMenuTree(tree, pid) {
  let reMenu = []
  tree.forEach(item => {
    if (
      (item.parentId === +pid || (item.parentId === -1 && pid === 0)) &&
      item.type < 1
    ) {
      const data = { ...item }
      data.children = undefined
      data.hasChildren = item.type !== 2 ? true : false
      if (data) {
        reMenu.push(data)
      }
    } else if (item.children && item.children.length > 0) {
      const data = getMenuTree(item.children, pid)[0]
      if (data) {
        reMenu.push(data)
      }
    }
  })

  return reMenu
}

module.exports = [
  {
    url: 'api/admin/menu/tree',
    method: 'get',
    response: config => {
      const reMenu = getMenu(
        list,
        config.query.pid || (config.body && config.body.pid) || -1,
        config.query.name ? config.query.name : null
      )
      return {
        status: 200,
        message: 'success',
        data: reMenu
      }
    }
  },
  {
    url: 'api/menus/lazy',
    method: 'get',
    response: config => {
      const reMenu = getMenuTree(list, config.body.pid)
      return {
        status: 200,
        message: 'success',
        data: reMenu
      }
    }
  }
]

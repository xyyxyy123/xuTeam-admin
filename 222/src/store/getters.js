const getters = {
  token: state => state.user.token,
  roles: state => state.user.roles,
  user: state => state.user.user,
  loadMenus: state => state.user.loadMenus,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  openNavside: state => state.sidemenu.openNavside
}

export default getters

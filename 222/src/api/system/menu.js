import request from '@/utils/request'

export function buildMenus(data) {
  return request({
    url: 'api/system/loadMenu',
    method: 'get',
    data
  })
}

export function getMenus(data) {
  return request({
    url: 'api/admin/menu/tree',
    method: 'get',
    data
  })
}

export function getMenusTree(pid) {
  return request({
    // url: 'api/menus/lazy?pid=' + pid,
    url: 'api/menus/lazy',
    method: 'get',
    data: { pid: pid }
  })
}

export function getMenuSuperior(ids) {
  const data = ids.length || ids.length === 0 ? ids : Array.of(ids)
  return request({
    url: 'api/menus/superior',
    method: 'post',
    data
  })
}

export function add(data) {
  return request({
    url: 'api/admin/menu/save',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'api/system/menus',
    method: 'delete',
    data: ids
  })
}

export function invalid(ids) {
  return request({
    url: 'api/system/menus',
    method: 'post',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: 'api/system/menus',
    method: 'put',
    data
  })
}

export default {
  add,
  edit,
  del,
  invalid,
  getMenus,
  getMenusTree,
  getMenuSuperior
}

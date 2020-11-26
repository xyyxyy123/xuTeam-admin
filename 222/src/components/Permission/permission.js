import store from '@/store'

export default {
  /**
   * 
   * 自定义vue permission指令
   * @param {*} el ：指令所绑定的元素，可以用来直接操作 DOM 
   * @param {*} binding ：一个对象，包含以下属性：
   *     name：指令名，不包括 v- 前缀。
   *     value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
   *     oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子 
   *           中可用。无论值是否改变都可用。
   *    expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
   * @param {*} vnode
   */
  inserted(el, binding, vnode) {
    const { value } = binding
    const roles = store.getters && store.getters.roles
    // value: ["admin", "roles:del"]
    // roles: ["admin", "editor"]
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value

      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`使用方式： v-permission="['admin','editor']"`)
    }
  }
}
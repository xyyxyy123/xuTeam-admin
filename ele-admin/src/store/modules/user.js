import { Login } from '@/api/login'
import { setToken, setUsername, getToken, getUsername, removeUsername, removeToken } from '@/utils/auth.js'

export default {
  state: {
    admin_token: getToken() || '',
    user_name: getUsername() || ''
  },
  mutations: { // 同步是没有回调的处理
    'SET_TOKEN': (state, val) => {
      state.admin_token = val
    },
    'SET_USERNAME': (state, val) => {
      state.user_name = val
    }
  },
  actions: { // 异步是有回调的处理
    Login (content, requestData) {
      return new Promise((resolve, reject) => {
        // 这里调试接口
        Login(requestData).then(response => {
          // 这里返回的就是登录接口返回的数据,vuex存一份，cookie存一份
          let datas = response.data.data
          content.commit('SET_TOKEN', datas.token)
          content.commit('SET_USERNAME', datas.username)
          setToken(datas.token)
          setUsername(datas.username)
          resolve(response) // 回调，成功返回结果，登录页面才能获取到结果，链式调用
        }).catch((err) => {
          reject(err) // 回调，登录页面才能获取到失败的结果，链式调用
        })
      })
    },
    Exit ({ commit }) {
      console.log(333)
      return new Promise((resolve, reject) => {
        removeUsername()
        removeToken()
        commit('SET_TOKEN', '')
        commit('SET_USERNAME', '')
        resolve()
      })
    }
  },
  getters: {
    // 页面获取数据，使用数据时的getters
    // username: state => {
    //   return state.username
    // },
    username: state => state.user_name
  }
}

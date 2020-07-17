import Cookies from 'js-cookie'
export default {
  state: {
    openNavside: !+Cookies.get('navsideStatus') // 默认是展示true,如果是false则隐藏
  },
  mutations: {
    'SET_NAVSIDE': (state) => {
      if (state.openNavside) {
        Cookies.set('navsideStatus', 1)
      } else {
        Cookies.set('navsideStatus', 0)
      }
      state.openNavside = !state.openNavside
    }
  },
  actions: {
    toggleNavside ({
      commit
    }) {
      commit('SET_NAVSIDE')
    }
  },
  getters: {
    'openNavside': state => state.openNavside
  }
}

import Cookies from 'js-cookie'

const state = {
  openNavside: !+Cookies.get('navsideStatus') // 默认是展示true,如果是false则隐藏
}

const mutations = {
  SET_NAVSIDE: state => {
    if (state.openNavside) {
      Cookies.set('navsideStatus', 1)
    } else {
      Cookies.set('navsideStatus', 0)
    }
    state.openNavside = !state.openNavside
  }
}

const actions = {
  toggleNavside({ commit }) {
    commit('SET_NAVSIDE')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

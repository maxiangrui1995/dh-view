import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const screen = window.screen;

export default new Vuex.Store({
  state: {
    // 屏幕宽高
    screenOffset: {
      width: screen.width,
      height: screen.height
    }
  },
  mutations: {
  },
  actions: {

  }
})

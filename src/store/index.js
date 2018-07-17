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
    },
    isLogin: false,
    // 中心消息-故障
    msgFailure: {},
    // 中心消息-故障
    msgRequire: {},
    crossing_box: {}
  },
  mutations: {
    login(state, data) {
      state.isLogin = data;
    },
    setMsgFailure(state, data) {
      state.msgFailure = data;
    },
    setMsgRequire(state, data) {
      state.msgRequire = data;
    },
    setCrossingBox(state, data) {
      state.crossing_box = data;
    }
  },
  actions: {
    login(context, data) {
      context.commit("login", data);
    },
    setMsgFailure(context, data) {
      context.commit("setMsgFailure", data);
    },
    setMsgRequire(context, data) {
      context.commit("setMsgRequire", data);
    },
    setCrossingBox(context, data) {
      context.commit("setCrossingBox", data);
    }
  }
})

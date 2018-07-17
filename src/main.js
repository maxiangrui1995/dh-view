import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import './api'
import './registerServiceWorker'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/animate.scss'
import './styles/common.scss'

// import './mock/index'

Vue.config.productionTip = false
Vue.use(ElementUI, {
  size: 'small'
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

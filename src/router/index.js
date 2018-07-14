import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: {
        name: "home"
      }
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['@/views/Home.vue'], resolve)
    }
  ]
});

/* router.beforeEach((to, from, next) => {
  // 验证是否登录：读取本地cookie(znyw_token)
  let reg = new RegExp("(^| )znyw_token=([^;]*)(;|$)");
  if (!document.cookie.match(reg)) {
    // 取当前环境
    if (process.env.NODE_ENV === "production") {
      window.location.href = "http://www.baidu.com";
    } else {
      Message({
        message: '警告！未登录',
        type: 'warning',
        showClose: true,
      });
      next();
    }
  } else {
    next();
  }
})

router.afterEach((to) => {
  window.scrollTo(0, 0);
}); */

export default router

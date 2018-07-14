<template>
  <el-scrollbar :style="{height: '100%'}">
    <y-home/>
  </el-scrollbar>
</template>

<script>
import yHome from "./views/Home";
export default {
  components: { yHome },
  methods: {},
  beforeCreate() {
    // 验证是否登录：读取本地cookie(znyw_token)
    let reg = new RegExp("(^| )znyw_token=([^;]*)(;|$)");
    if (!document.cookie.match(reg)) {
      // 取当前环境
      if (process.env.NODE_ENV === "production") {
        window.location.href = "http://www.baidu.com";
      } else {
        /* this.$message({
          message: "警告！未登录",
          type: "warning",
          showClose: true
        }); */
      }
    }
  }
};
</script>

<style>
</style>



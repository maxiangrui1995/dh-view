<template>
  <!-- <el-scrollbar :style="{height: '100%'}">
    <div class="container">
      <y-home/>
    </div>
  </el-scrollbar> -->
  <div class="container" ref="main-container">
    <y-home/>
  </div>
</template>

<script>
import yHome from "./views/Home";
export default {
  components: { yHome },
  data() {
    return {};
  },
  methods: {
    scale() {
      let ele = this.$refs["main-container"];
      let width = this.screenObjet.width;
      let height = this.screenObjet.height;
      ele.style.transformOrigin = "0 0";
      ele.style.transform = `scaleX(${width / 1920}) scaleY(${height / 1080})`;
    }
  },
  created() {
    // 验证是否登录：读取本地cookie(znyw_token)
    let reg = new RegExp("(^| )znyw_token=([^;]*)(;|$)");
    if (!document.cookie.match(reg)) {
      // 取当前环境
      if (process.env.NODE_ENV === "production") {
        window.location.href = "http://www.baidu.com";
      } else {
        console.error("未登录");
      }
    } else {
      this.$store.dispatch("login", true);
    }
    this.$nextTick(() => {
      this.scale();
    });
  },
  computed: {
    screenObjet() {
      return this.$store.state.screenOffset;
    }
  }
};
</script>

<style scoped>
.container {
  width: 1920px;
  height: 1080px;
  background: url("~@/assets/0-bg.png") #06143b;
}
</style>



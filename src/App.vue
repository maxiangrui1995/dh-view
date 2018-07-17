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
    },
    IEVersion() {
      let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
      let isIE =
        userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
      let isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
      let isIE11 =
        userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
      if (isIE) {
        let reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        let fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
          return 7;
        } else if (fIEVersion == 8) {
          return 8;
        } else if (fIEVersion == 9) {
          return 9;
        } else if (fIEVersion == 10) {
          return 10;
        } else {
          return 6; //IE版本<=7
        }
      } else if (isEdge) {
        return "edge"; //edge
      } else if (isIE11) {
        return 11; //IE11
      } else {
        return -1; //不是ie浏览器
      }
    }
  },
  created() {
    // 检测浏览器
    if (process.env.NODE_ENV === "production") {
      let ie = IEVersion();
      if (ie !== -1 && ie < 10) {
        window.location.href = indexURL;
      }
    }
    // 验证是否登录：读取本地cookie(znyw_token)
    let reg = new RegExp("(^| )znyw_token=([^;]*)(;|$)");
    if (!document.cookie.match(reg)) {
      // 取当前环境
      if (process.env.NODE_ENV === "production") {
        window.location.href = loginURL;
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



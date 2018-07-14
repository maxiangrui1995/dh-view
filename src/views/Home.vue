<template>
  <div class="layout" ref="main">
    <div class="layout-header">
      <header-logo/>
    </div>
    <div class="layout-body">
      <el-row>
        <el-col :span="6">
          <div class="video-channel">
            <video-channel/>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="menu-bar">
            <menu-bar/>
          </div>
          <div class="center-news">
            <center-news/>
          </div>
          <div class="organ-tree">
            <organ-tree/>
          </div>
        </el-col>
        <el-col :span="6">
          C
        </el-col>
      </el-row>
    </div>

    <!-- <div class="fullscreen">
      <el-button icon="el-icon-search" circle></el-button>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "home",
  components: {
    "header-logo": resolve =>
      require(["./home-components/header-logo"], resolve),
    "menu-bar": resolve => require(["./home-components/menu-bar"], resolve),
    "center-news": resolve =>
      require(["./home-components/center-news"], resolve),
    "organ-tree": resolve => require(["./home-components/organ-tree"], resolve),
    "video-channel": resolve =>
      require(["./home-components/video-channel"], resolve)
  }
};
</script>

<style lang="scss" scoped>
.layout {
  width: 1920px;
  height: 1080px;
  background: url("~@/assets/0-bg.png");
  position: relative;
  &-header {
    height: 78px;
  }
  &-body {
    .menu-bar {
      margin-top: 30px;
    }
    .center-news {
      margin-top: 20px;
    }
    .organ-tree {
      margin-top: 15px;
    }
  }
}

.fullscreen {
  position: fixed;
  top: 50%;
  left: 2px;
  transform: translate(0, -50%);
}
</style>


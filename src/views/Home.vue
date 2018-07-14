<template>
  <div class="layout" ref="main">
    <div class="layout-header">
      <header-logo/>
    </div>
    <div class="layout-body">
      <el-row>
        <el-col :span="6" class="layout-body-inner">
          <div class="video-channel">
            <video-channel/>
          </div>
          <div class="devs-total">
            <devs-total/>
          </div>
          <div class="nodes-total">
            <nodes-total/>
          </div>
          <div class="camera-total">
            <camera-total/>
          </div>
        </el-col>
        <el-col :span="12" class="layout-body-inner">
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
        <el-col :span="6" class="layout-body-inner">
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
      require(["./home-components/video-channel"], resolve),
    "devs-total": resolve => require(["./home-components/devs-total"], resolve),
    "nodes-total": resolve =>
      require(["./home-components/nodes-total"], resolve),
    "camera-total": resolve =>
      require(["./home-components/camera-total"], resolve)
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
    position: relative;
    &:before {
      display: block;
      content: "";
      width: 765px;
      height: 101px;
      background: url("~@/assets/footerline.png");
      position: absolute;
      left: 0;
      bottom: 0;
    }
    .menu-bar {
      margin-top: 30px;
    }
    .center-news {
      margin-top: 20px;
    }
    .organ-tree {
      margin-top: 15px;
    }
    .devs-total {
      margin-top: 30px;
    }
    .nodes-total {
      margin-top: 30px;
    }
    .camera-total {
      margin-top: 30px;
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


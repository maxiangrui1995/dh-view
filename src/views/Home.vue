<template>
  <div class="layout">
    <div class="layout-header">
      <header-logo/>
    </div>
    <div class="layout-body">
      <div class="layout-body-inner" style="width: 480px;">
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
      </div>
      <div class="layout-body-inner" style="width: 960px;">
        <div class="menu-bar">
          <menu-bar/>
        </div>
        <div class="center-news">
          <center-news/>
        </div>
        <div class="organ-tree">
          <organ-tree/>
        </div>
      </div>
      <div class="layout-body-inner" style="width: 480px;">
        <div class="failure">
          <failure/>
        </div>
        <div class="repair">
          <repair/>
        </div>
      </div>
    </div>

    <!-- <div class="fullscreen">
      <el-button icon="el-icon-search" circle></el-button>
    </div> -->
  </div>
</template>

<script>
import HeaderLogo from "./home-components/header-logo";
import MenuBar from "./home-components/menu-bar";
import CenterNews from "./home-components/center-news";
import OrganTree from "./home-components/organ-tree";
import VideoChannel from "./home-components/video-channel";
import DevsTotal from "./home-components/devs-total";
import NodesTotal from "./home-components/nodes-total";
import CameraTotal from "./home-components/camera-total";
import Failure from "./home-components/failure";
import Repair from "./home-components/repair";
export default {
  name: "home",
  components: {
    HeaderLogo,
    MenuBar,
    CenterNews,
    OrganTree,
    VideoChannel,
    DevsTotal,
    NodesTotal,
    CameraTotal,
    Failure,
    Repair
  }
};
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  position: relative;
  &-header {
    height: 78px;
  }
  &-body {
    position: relative;
    width: 100%;
    height: calc(100% - 78px);
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
    &:after {
      display: block;
      content: "";
      width: 503px;
      height: 101px;
      background: url("~@/assets/footerline2.png");
      position: absolute;
      right: 0;
      bottom: 0;
    }
    &-inner {
      display: inline-block;
      vertical-align: top;
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
    .repair {
      margin-top: 35px;
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


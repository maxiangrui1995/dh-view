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
          <devs-total :data="count_assets" />
        </div>
        <div class="nodes-total">
          <nodes-total :data="node_number" />
        </div>
        <div class="camera-total">
          <camera-total :data="online_radio" />
        </div>
      </div>
      <div class="layout-body-inner" style="width: 960px;">
        <div class="menu-bar">
          <menu-bar/>
        </div>
        <div class="center-news">
          <center-news :data="centerNewsData" />
        </div>
        <div class="organ-tree">
          <organ-tree :data="organData" />
        </div>
      </div>
      <div class="layout-body-inner" style="width: 480px;">
        <div class="failure">
          <failure :data="failureData" />
        </div>
        <div class="repair">
          <repair :data="repairData" />
        </div>
      </div>
    </div>
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
  },
  data() {
    return {
      centerNewsData: [],
      failureData: [], // 故障原因
      repairData: {}, // 自动修复
      node_number: {}, //节点数
      online_radio: {}, // 在线率
      count_assets: [], //设备
      organData: [] //组织机构
    };
  },
  methods: {
    fetchData() {
      this.$http("Ma_zong/indexAllData").then(res => {
        if (!res.status) {
          return;
        }
        let data = res.data;
        // 中心控制数据
        this.centerNewsData = data.control_center;
        // 故障原因
        this.failureData = data.current_fault;
        // 自动修复
        this.repairData = data.fault_repair;
        // 节点数
        this.node_number = data.node_number;
        // 在线率
        this.online_radio = data.online_radio;
        // 设备
        this.count_assets = data.count_assets;
        // 组织机构
        this.organData = data.organize_show;
      });
    },
    loopFetchData() {
      setInterval(() => {
        // 节点数
        this.$http("Ma_zong/nodeNumber").then(res => {
          if (res.status) {
            this.node_number = res.data;
          }
        });
        // 在线率
        this.$http("Ma_zong/onlineRadio").then(res => {
          if (res.status) {
            this.online_radio = res.data;
          }
        });
        // 设备数
        this.$http("Ma_zong/countAssets").then(res => {
          if (res.status) {
            this.count_assets = res.data;
          }
        });
      }, 5000);
    }
  },
  created() {
    if (this.login) {
      this.fetchData();
      this.loopFetchData();
    }
  },
  computed: {
    login() {
      return this.$store.state.isLogin;
    }
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


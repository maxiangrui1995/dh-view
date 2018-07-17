<template>
  <div class="box fadeInLeft animated">
    <div class="box-title">
      <span>视频通道</span>
    </div>
    <div class="box-select" v-if="videoData.length>0">
      <el-dropdown placement="right-start" @command="dropDownItemSelect">
        <span class="el-dropdown-link">
          下拉菜单
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item,index) in videoData" :key="index" :command="item.dev_name">{{item.dev_name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="box-body">
      <div class="box-body-header">
        <object v-if="vlcShow" type='application/x-vlc-plugin' pluginspage="http://www.videolan.org/" id='vlc' events='false' width="424" height="253" :style="{width:vlcWidth+'px'}" style="margin:3px;">
          <param name='mrl' :value='videoDataSelected.address' />
        </object>
      </div>
      <div class="tip" v-if="videoData.length==0">暂无数据</div>
      <div class="box-body-content" v-if="videoData.length>0">
        <div class="box-body-content-left">
          <origin-item>{{videoDataSelected.name}}</origin-item>
        </div>
        <div class="box-body-content-right">
          <div class="box-body-content-inner">
            <span>设备厂商: </span>
            <span>{{videoDataSelected.sdk || '-'}}</span>
          </div>
          <div class="box-body-content-inner">
            <span>生命周期: </span>
            <span>{{videoDataSelected.valid_time || '-'}} 年</span>
          </div>
          <div class="box-body-content-inner">
            <span>品牌型号: </span>
            <span>{{videoDataSelected.brand || '-'}}</span>
          </div>
          <div class="box-body-content-inner">
            <span>建设单位: </span>
            <span>{{videoDataSelected.build_company || '-'}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import originItem from "@/components/origin-item";
export default {
  components: {
    originItem
  },
  data() {
    return {
      videoData: [],
      videoDataSelected: {},
      vlcShow: false,
      vlcWidth: 424
    };
  },
  methods: {
    fetchVideoData(dev_code) {
      this.$http("Ma_zong/playVideo", {
        dev_code: dev_code
      }).then(res => {
        let data = res.data;
        this.videoData = data;
        this.dropDownItemSelect(data[0].dev_name);
      });
    },
    // 下拉选择
    dropDownItemSelect(name) {
      let lock = false;
      let d = {};
      this.videoData.forEach(item => {
        if (item.dev_name == name) {
          d = item;
          lock = true;
        }
      });
      this.vlcShow = false;
      this.videoDataSelected = d;
      if (lock) {
        setTimeout(() => {
          this.vlcShow = true;
          this.vlcWidth = 425;
          setTimeout(() => {
            this.vlcShow = true;
            this.vlcWidth = 424;
          }, 300);
        }, 100);
      }
    }
  },
  computed: {
    crossing_box(value) {
      return this.$store.state.crossing_box;
    }
  },
  watch: {
    crossing_box(newValue) {
      this.fetchVideoData(newValue.dev_code);
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  width: 470px;
  height: 390px;
  background: url("~@/assets/4-video-channel.png") no-repeat;
  position: relative;
  &-title {
    width: 100px;
    position: absolute;
    top: -7px;
    left: 109px;
    text-shadow: 0 0 5px #fff, 0 0 7px #fff;
    text-align: center;
    font-size: 1.268em;
  }
  &-body {
    position: absolute;
    width: 430px;
    top: 46px;
    left: 30px;
    &-header {
      width: 100%;
      height: 260px;
      background: url("~@/assets/4-video.png");
    }
    &-content {
      margin-top: 10px;
      &-left {
        display: inline-block;
        vertical-align: top;
        width: 30%;
        position: relative;
        top: 15px;
      }
      &-right {
        display: inline-block;
        width: 70%;
      }
      &-inner {
        display: inline-block;
        width: 50%;
        height: 30px;
        line-height: 30px;
        font-size: 1.086em;
        text-indent: 10px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }
  &-select {
    position: absolute;
    right: 24px;
    top: 10px;
    .el-dropdown {
      color: #d0ab54;
      cursor: pointer;
    }
  }
  .tip {
    text-align: center;
    color: rgba($color: #f1f1f1, $alpha: 0.6);
    line-height: 80px;
  }
}
</style>

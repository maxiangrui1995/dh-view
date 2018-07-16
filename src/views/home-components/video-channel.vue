<template>
  <div class="box fadeInLeft animated">
    <div class="box-title">
      <span>视频通道</span>
    </div>
    <div class="box-body">
      <div class="box-body-header"></div>
      <div class="box-body-content">
        <div class="box-body-content-left">
          <origin-item>海安县交警大队1分队</origin-item>
        </div>
        <div class="box-body-content-right">
          <div class="box-body-content-inner">
            <span>设备厂商: </span>
            <span>海康</span>
          </div>
          <div class="box-body-content-inner">
            <span>生命周期: </span>
            <span>3年</span>
          </div>
          <div class="box-body-content-inner">
            <span>品牌型号: </span>
            <span>N-60</span>
          </div>
          <div class="box-body-content-inner">
            <span>建设单位: </span>
            <span>测试单位</span>
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
      padding-top: (260/430) * 100%;
      background: url("~@/assets/4-video.png");
      background-size: cover;
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
}
</style>


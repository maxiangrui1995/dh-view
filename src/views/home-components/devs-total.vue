<template>
  <div class="box fadeInLeft animated">
    <div class="box-title">
      <span class="box-title-wrapper">设备监视</span>
    </div>
    <div class="box-body">
      <div class="box-body-title">
        <div class="box-body-inner title">设备</div>
        <div class="box-body-inner num">统计</div>
      </div>
      <div class="box-body-content">
        <div class="box-body-item">
          <div class="box-body-inner-icon dev01"></div>
          <div class="box-body-inner title">视频设备</div>
          <div class="box-body-inner num">1550</div>
        </div>
        <div class="box-body-item">
          <div class="box-body-inner-icon dev02"></div>
          <div class="box-body-inner title">视频设备</div>
          <div class="box-body-inner num">1550</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.box {
  animation-delay: 0.03s;
}
.box-title {
  width: 342px;
  height: 45px;
  background: url("~@/assets/title.png") no-repeat;
  margin: 0 auto;
  position: relative;
  &-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    text-shadow: 0 0 5px #fff, 0 0 7px #fff;
    font-size: 1.268em;
  }
}
.box-body {
  width: 430px;
  margin: 0 auto;
  &-title {
    width: 380px;
    height: 36px;
    line-height: 36px;
    float: right;
  }
  &-title > &-inner {
    text-indent: 8px;
  }
  &-inner {
    display: inline-block;
    text-indent: 6px;
    &-inner:nth-child(1) {
      width: 275px;
    }
    &-inner:nth-child(2) {
      width: 105px;
    }
  }
  &-inner-icon {
    position: absolute;
    top: -4px;
    left: -49px;
    width: 44px;
    height: 44px;
  }

  &-item {
    width: 380px;
    height: 36px;
    line-height: 36px;
    margin: 8px 0;
    float: right;
    border-left: 4px solid #fedb4b;
    background: linear-gradient(to right, #1259c4, rgba(20, 64, 156, 0.2));
    position: relative;
    .num {
      color: #36a5ff;
    }
  }

  &:after {
    display: block;
    content: "";
    clear: both;
  }
  .title {
    width: 275px;
  }
  .num {
    width: 105px;
  }
  .dev01 {
    background: url("~@/assets/dev01.png");
  }
  .dev02 {
    background: url("~@/assets/dev02.png");
  }
  .dev03 {
    background: url("~@/assets/dev03.png");
  }
  .dev04 {
    background: url("~@/assets/dev04.png");
  }
  .dev05 {
    background: url("~@/assets/dev05.png");
  }
}
</style>


<template>
  <div class="box fadeInLeft animated">
    <div class="box-inner">
      <div class="box-inner-title">相机实时在线率</div>
      <div class="box-inner-body">
        <div class="box-inner-body-view"></div>
        <div class="box-inner-body-info">20.33%</div>
      </div>
    </div>
    <div class="box-inner">
      <div class="box-inner-title">相机实时通断率</div>
      <div class="box-inner-body">
        <div class="box-inner-body-view"></div>
        <div class="box-inner-body-info">20.33%</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.box {
  animation-delay: 0.09s;
  &-inner {
    width: 430px;
    margin: 0 auto;
    &-title {
      height: 36px;
      line-height: 36px;
    }
    &-body {
      position: relative;
      width: 100%;
      &-view {
        width: 370px;
        height: 24px;
        border: 1px solid #08478f;
        display: inline-block;
        vertical-align: middle;
      }
      &-info {
        width: 58px;
        display: inline-block;
        color: #6acef0;
        text-indent: 16px;
      }
    }
  }
}
</style>


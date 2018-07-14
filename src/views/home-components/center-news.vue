<template>
  <div class="box">
    <div class="box-bg"></div>
    <div class="box-bg"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.box {
  width: 934px;
  height: 675px;
  background: url("~@/assets/3-bg.png") no-repeat;
  margin: 0 auto;
  position: relative;
  &-bg {
    overflow: hidden;
    position: absolute;
    &:before {
      width: 591px;
      height: 620px;
      display: block;
      content: "";
      opacity: 0.6;
      background: url("~@/assets/3-circle.png") no-repeat;
    }
  }
  &-bg:nth-child(1) {
    top: 34px;
    left: 22px;
    width: 344px;
    height: 607px;
    &:before {
      margin-left: -280px;
      // transform-origin: 291.5px 320.5px;
      animation: rotate 60s linear infinite;
    }
  }
  &-bg:nth-child(2) {
    top: 39px;
    right: 27px;
    width: 344px;
    height: 601px;
    &:before {
      margin-left: 76px;
      // transform-origin: 291.5px 320.5px;
      animation: rotate 60s linear infinite reverse;
    }
  }
  &:before {
    content: "";
    display: block;
    width: 36px;
    height: 31px;
    position: absolute;
    top: 36px;
    right: 27px;
    background: url("~@/assets/3-top.png");
    z-index: 1;
  }
  &:after {
    content: "";
    display: block;
    width: 27px;
    height: 37px;
    position: absolute;
    left: 21px;
    bottom: 34px;
    background: url("~@/assets/3-bottom.png");
    z-index: 1;
  }
}
</style>


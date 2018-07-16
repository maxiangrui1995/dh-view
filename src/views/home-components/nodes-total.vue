<template>
  <div class="box fadeInLeft animated">
    <div class="box-title">
      <span class="box-title-wrapper">运维节点</span>
    </div>
    <div class="box-body">
      <div class="box-body-item">
        <div class="box-body-item-info">
          <div class="box-body-item-view sum"></div>
          <div class="box-body-item-info-num">7332</div>
          <div class="box-body-item-info-title">总节点 (个)</div>
        </div>
      </div>
      <div class="box-body-item">
        <div class="box-body-item-info">
          <div class="box-body-item-view one"></div>
          <div class="box-body-item-info-num">96</div>
          <div class="box-body-item-info-title">运行节点 (个)</div>
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
  animation-delay: 0.06s;
}
.box-title {
  width: 342px;
  height: 45px;
  background: url("~@/assets/title.png") no-repeat;
  margin: 0 auto 26px;
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
  &-item {
    display: inline-block;
    width: 170px;
    &-view {
      position: absolute;
      top: 0;
      left: 0;
      width: 55px;
      height: 55px;
    }
    &-info {
      position: relative;
      padding-left: 55px;
      &-num {
        color: #5bbefc;
        font-size: 1.268em;
        height: 30px;
        line-height: 30px;
        text-indent: 10px;
      }
      &-title {
        color: #f1f1f1;
        font-size: 1.068em;
        height: 30px;
        line-height: 30px;
        text-indent: 10px;
      }
    }
  }
  &-item:nth-child(2) {
    float: right;
  }
  .sum {
    background: url("~@/assets/5-nodes1.png");
  }
  .one {
    background: url("~@/assets/5-nodes2.png");
  }
}
</style>


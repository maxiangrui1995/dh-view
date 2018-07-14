<template>
  <div class="box">
    <div class="box-title">
      1
    </div>
    <div class="box-body">
      <div class="box-body-inner-item">
        <div class="item">
          <origin-item>海安县交警大队1分队</origin-item>
        </div>
        <div class="item">
          <origin-item>海安县1分队</origin-item>
        </div>
        <div class="item">
          <origin-item>海安县1分队</origin-item>
        </div>
      </div>
      <div class="box-body-inner-button">
        <div class="btn"></div>
        <div class="btn"></div>
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
  width: 922px;
  height: 204px;
  background: url("~@/assets/4-footer.png");
  margin: 0 auto;
  padding: 0 10px;
  &-title {
    height: 144px;
    border-bottom: 1px solid #073b69;
  }
  &-body {
    height: 60px;
    &-inner-item {
      width: 840px;
      display: inline-block;
      vertical-align: top;
      .item {
        display: inline-block;
        margin-top: 18px;
        margin-right: 10px;
      }
    }
    &-inner-button {
      width: 80px;
      display: inline-block;
      .btn {
        display: inline-block;
        width: 30px;
        height: 30px;
        margin-top: 16px;
      }
      .btn:nth-child(1) {
        background: url("~@/assets/btn1.png");
        margin-right: 6px;
      }
      .btn:nth-child(2) {
        background: url("~@/assets/btn2.png");
      }
    }
  }
}
</style>


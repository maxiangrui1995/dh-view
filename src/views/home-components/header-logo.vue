<template>
  <div class="box fadeInDown animated">
    <div class="box-logo"></div>
  </div>
</template>

<script>
export default {};
</script>


<style lang="scss" scoped>
.box {
  width: 100%;
  height: 114px;
  background: url("~@/assets/1-header.png") no-repeat;
  position: relative;
  &-logo {
    width: 261px;
    padding-top: 32px;
    background: url("~@/assets/1-header-logo.png") no-repeat;
    position: absolute;
    left: 50%;
    top: 26%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
}
</style>

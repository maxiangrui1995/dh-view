<template>
  <div class="origin-item">
    <div class="origin-item-content" :title="slots">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: ""
    };
  },
  computed: {
    slots() {
      return this.$slots.default[0].text;
    }
  }
};
</script>

<style lang="scss" scoped>
.origin-item {
  display: block;
  min-width: 30px;
  height: 30px;
  line-height: 30px;
  padding: 0 24px;
  position: relative;
  &-content {
    width: 100%;
    height: 30px;
    background: url("~@/assets/node.png");
    padding: 0 5px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  &:before,
  &:after {
    width: 24px;
    height: 30px;
    display: block;
    content: "";
    position: absolute;
    top: 0;
  }
  &:before {
    background: url("~@/assets/node-left.png") no-repeat;
    left: 0;
  }
  &:after {
    background: url("~@/assets/node-right.png") no-repeat;
    right: 0;
  }
}
</style>


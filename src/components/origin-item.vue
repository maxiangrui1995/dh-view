<template>
  <div class="origin-item" :class="[active?'active':'']">
    <div class="origin-item-content" :title="slots">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    active: Boolean
  },
  data() {
    return {
      text: ""
    };
  },
  computed: {
    slots() {
      return this.$slots.default[0].text;
    }
  },
  created() {}
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
.origin-item.active {
  .origin-item-content {
    background: url("~@/assets/node-active.png");
  }
  &:before {
    background: url("~@/assets/node-left-active.png") no-repeat;
  }
  &:after {
    background: url("~@/assets/node-right-active.png") no-repeat;
  }
}
</style>


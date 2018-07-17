<template>
  <div class="box fadeInLeft animated">
    <div class="box-title">
      <span class="box-title-wrapper">设备监视</span>
    </div>
    <div class="box-body">
      <div class="box-body-title">
        <div class="box-body-title-item">
          <div class="box-body-inner title">设备</div>
          <div class="box-body-inner num">统计</div>
        </div>
      </div>
      <div class="box-body-content">
        <!-- <div class="box-body-item">
          <div class="box-body-inner-icon dev01"></div>
          <div class="box-body-inner title">视频设备</div>
          <div class="box-body-inner num">1550</div>
        </div>
        <div class="box-body-item">
          <div class="box-body-inner-icon dev02"></div>
          <div class="box-body-inner title">视频设备</div>
          <div class="box-body-inner num">1550</div>
        </div> -->
        <transition-group name="list" tag="div">
          <div class="box-body-item" v-for="(item) in items" v-bind:key="item.category_num">
            <div class="box-body-inner-icon" :class="'dev0'+item.category_num"></div>
            <div class="box-body-inner title">{{item.name}}</div>
            <div class="box-body-inner num">{{item.count}}</div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array
  },
  data() {
    return {
      items: []
    };
  },
  methods: {},
  created() {
    setInterval(() => {
      if (this.items.length > 0) {
        let d = this.items[0];
        this.items.splice(0, 1);
        this.items.push(d);
      }
    }, 5000);
  },
  watch: {
    data(data) {
      if (this.items.length) {
        data.forEach(item => {
          this.items.forEach(item2 => {
            item2.category_num = item2.category_num || {};
            item.category_num = item.category_num || {};
            if (item2.category_num == item.category_num) {
              item2.count = item.count;
            }
          });
        });
      } else {
        this.items = data;
      }
    }
  }
};
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
    width: 430px;
    height: 36px;
    line-height: 36px;
    &:after {
      display: block;
      content: "";
      clear: both;
    }
    &-item {
      float: right;
    }
  }
  &-title > &-inner {
    text-indent: 8px;
  }
  &-content {
    height: 96px;
    overflow: hidden;
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
.list-move,
.list-enter-active,
.list-leave-active {
  transition: 1s;
}
.list-leave-active {
  position: absolute;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>


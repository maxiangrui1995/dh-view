<template>
  <div class="box fadeInRight animated">
    <div class="box-title">
      <div class="box-title-wrapper">故障原因</div>
    </div>
    <div class="box-body">
      <el-carousel class="columns-carousel" @change="indexChange" :interval="interval" arrow="never" height="615px">
        <el-carousel-item v-for="item in 3" :key="item">
          <div v-for="$index in 3" :key="$index" class="item animated" :class="['item-amimate-'+$index, carouselIndex == (item-1) && fadeInRight ? 'fadeInRight' : '']">
            <div class="item-inner">
              <span class="item-inner-info">路口名称</span>
            </div>
            <div class="item-inner">
              <span class="item-inner-title">告警等级:</span>
              <span class="item-inner-info">1</span>
            </div>
            <div class="item-inner">
              <span class="item-inner-title">故障时间:</span>
              <span class="item-inner-info time">2018年7月11日14:56:42</span>
            </div>
            <div class="item-inner">
              <span class="item-inner-title">故障原因:</span>
              <span class="item-inner-info">因故障原因故障原因故障原因故障原因</span>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      interval: 5000,
      fadeInRight: false,
      carouselIndex: 0
    };
  },
  methods: {
    indexChange(newValue, oldValue) {
      this.carouselIndex = newValue;
      if (newValue > oldValue || newValue == 0) {
        this.fadeInRight = true;
        setTimeout(() => {
          this.fadeInRight = false;
        }, 700);
      } else {
        this.fadeInRight = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  &-title {
    width: 479px;
    height: 43px;
    background: url("~@/assets/title2.png") no-repeat;
    position: relative;
    &-wrapper {
      position: absolute;
      top: 0;
      left: 42px;
      font-size: 1.268em;
      text-shadow: 0 0 5px #fff, 0 0 7px #fff;
    }
  }
  &-body {
    padding: 0 10px;
    height: 615px;
  }
  .item {
    color: #f1f1f1;
    border-bottom: 1px solid hsla(0, 2%, 41%, 0.2);
    padding: 16px 0 20px;
    &-inner {
      padding: 8px 0;
      font-size: 1.068em;
      &-title {
        color: #cae6fd;
        margin-right: 10px;
      }
      &-info.time {
        color: #67c7eb;
      }
    }
    &-inner:first-child {
      font-size: 1.168em;
    }
    /* &-inner:not(first-child) {
      font-size: 0.8em;
    } */
  }
  .item:last-child {
    border-bottom: none;
  }
  .item-amimate-1 {
    animation-delay: 0.1s;
  }
  .item-amimate-2 {
    animation-delay: 0.2s;
  }
  .item-amimate-3 {
    animation-delay: 0.3s;
  }
}
</style>
<style lang="scss">
.columns-carousel {
  .el-carousel__indicators {
    width: 524px;
    text-align: center;
    background: url("~@/assets/lighthight.png") no-repeat;
  }
  .el-carousel__indicator.is-active button {
    background: #67c7eb;
  }
  .el-carousel__button {
    width: 16px;
    height: 16px;
    background: transparent;
    border: 2px solid #67c7eb;
    margin: 0 8px;
    border-radius: 50%;
  }
}
</style>




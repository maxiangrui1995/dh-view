<template>
  <div class="box fadeInRight animated">
    <div class="box-title">
      <div class="box-title-wrapper">故障原因</div>
    </div>
    <div class="box-body">
      <div class="tip" v-if="data.length==0">暂无数据</div>
      <el-carousel class="columns-carousel" @change="indexChange" :interval="interval" arrow="never" height="615px">
        <el-carousel-item v-for="item in counts" :key="item">
          <div v-for="(item2,$index) in itemData[item]" :key="$index" class="item animated" :class="['item-amimate-'+$index, carouselIndex == (item-1) && fadeInRight ? 'fadeInRight' : '']">
            <div class="item-inner">
              <span class="item-inner-info">{{data[3*(item-1)+item2-1]['crossing_name']}}</span>
            </div>
            <div class="item-inner">
              <span class="item-inner-title">告警等级{{$index}}:</span>
              <span class="item-inner-info">{{data[3*(item-1)+item2-1]['level']}}</span>
            </div>
            <div class="item-inner">
              <span class="item-inner-title">故障时间:</span>
              <span class="item-inner-info time">{{data[3*(item-1)+item2-1]['create_time']}}</span>
            </div>
            <div class="item-inner">
              <span class="item-inner-title">故障原因:</span>
              <span class="item-inner-info">{{data[3*(item-1)+item2-1]['memo']}}</span>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  props: { data: Array },
  data() {
    return {
      interval: 5000,
      fadeInRight: false,
      carouselIndex: 0,
      counts: 0,
      itemData: []
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
  },
  created() {},
  computed: {
    msgFailure() {
      return this.$store.state.msgFailure;
    }
  },
  watch: {
    data(data) {
      let count = Math.ceil(data.length / 3);
      this.counts = count;
      for (let i = 0; i < count; i++) {
        this.itemData[i + 1] =
          data.length - 3 * i > 3 ? 3 : data.length - 3 * i;
      }
    },
    msgFailure(value) {
      this.data.unshift(value);
      if (this.data.length > 9) {
        this.data.pop();
      }
      // 判断ID
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
  .item-amimate-0 {
    animation-delay: 0.16s;
  }
  .item-amimate-1 {
    animation-delay: 0.26s;
  }
  .item-amimate-2 {
    animation-delay: 0.36s;
  }
  .tip {
    text-align: center;
    color: rgba($color: #f1f1f1, $alpha: 0.6);
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




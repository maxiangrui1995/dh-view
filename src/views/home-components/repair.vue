<template>
  <div class="box fadeInRight animated">
    <div class="box-title">
      <div class="box-title-wrapper">自动修复</div>
    </div>
    <div class="box-body">
      <div class="box-body-view">
        <canvas ref="view" width="160" height="160"></canvas>
        <transition name="num-plus">
          <p v-if="show" class="add">+{{1}}</p>
        </transition>
        <div class="total">{{total}}</div>
      </div>
      <div class="box-body-info">
        <div class="box-body-info-header">
          <span>自动修复率</span>
          <span class="num">{{auto_radio}}%</span>
        </div>
        <div class="box-body-info-info">
          <span>自动修复</span>
          <span class="num">{{automatic}}个</span>
        </div>
        <div class="box-body-info-info">
          <span>人工修复</span>
          <span class="num">{{artificial}}个</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  },
  data() {
    return {
      show: false,
      total: 0, //自动修复数+人工修复数
      auto_radio: 0, //自动修复率
      automatic: 0, //自动修复数
      artificial: 0 //人工修复数
    };
  },
  methods: {
    view() {
      let c = this.$refs.view;
      let ctx = c.getContext("2d");
      let width = c.width;
      let height = c.height;

      let waveWidth = width * 2;
      let waveHeight = 12;
      let waveCount = 4;
      let startX = -width;
      let offset = 0;
      let offset2 = 0;
      let d = waveWidth / waveCount;

      const render = () => {
        ctx.clearRect(0, 0, width, height);
        //绘制圆
        ctx.save();
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, width / 2 - 1, 0, 2 * Math.PI, false);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#1788e4";
        ctx.stroke();
        ctx.clip();
        // 贝塞尔曲线
        let offsetY = height / 2;
        offset -= 1;
        if (-1 * offset >= d) offset = 0;
        offset2 -= 0.5;
        if (-1 * offset2 >= d) offset2 = 0;

        ctx.beginPath();
        ctx.moveTo(startX - offset2, offsetY);
        for (let i = 0; i < waveCount; i++) {
          let dx = i * waveWidth / waveCount;
          let offsetX = dx + startX - offset;
          ctx.quadraticCurveTo(
            offsetX + d / 4,
            offsetY + waveHeight,
            offsetX + d / 2,
            offsetY
          );
          ctx.quadraticCurveTo(
            offsetX + d / 4 + d / 2,
            offsetY - waveHeight,
            offsetX + d,
            offsetY
          );
        }
        ctx.lineTo(startX + waveWidth, height);
        ctx.lineTo(startX, height);
        ctx.fillStyle = "#1662a8";
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(startX - offset2, offsetY);
        for (let i = 0; i < waveCount * 2; i++) {
          let dx = i * waveWidth / waveCount;
          let offsetX = dx + startX - offset2 - 30;
          ctx.quadraticCurveTo(
            offsetX + d / 4,
            offsetY + waveHeight,
            offsetX + d / 2,
            offsetY
          );
          ctx.quadraticCurveTo(
            offsetX + d / 4 + d / 2,
            offsetY - waveHeight,
            offsetX + d,
            offsetY
          );
        }
        ctx.fillStyle = "#1788e4";
        ctx.lineTo(startX + waveWidth, height);
        ctx.lineTo(startX, height);
        ctx.fill();
        ctx.restore();
        //绘制圆
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, width / 2 - 2, 0, 2 * Math.PI, false);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#1788e4";
        ctx.stroke();

        requestAnimationFrame(render);
      };

      render();
    },
    animationNum(finalNum, originNum, type) {
      let step = Math.ceil(finalNum / (1500 / 50)); //递增步数
      step = finalNum < originNum ? -step : step;

      let timer = setInterval(() => {
        originNum += step;
        if (
          (step > 0 && originNum >= finalNum) ||
          (step < 0 && originNum <= finalNum) ||
          step == 0
        ) {
          originNum = finalNum;
          clearInterval(timer);
        }
        this[type] = originNum;
      }, 50);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.view();
    });
  },
  computed: {
    TOTAL() {
      return this.data.automatic + this.data.artificial;
    },
    msgRequire() {
      return this.$store.state.msgRequire;
    }
  },
  watch: {
    TOTAL() {
      this.animationNum(this.TOTAL, this.total, "total");
    },
    "data.artificial"(value) {
      this.animationNum(value, this.artificial, "artificial");
    },
    "data.auto_radio"(value) {
      this.animationNum(value, this.auto_radio, "auto_radio");
    },
    "data.automatic"(value) {
      this.animationNum(value, this.automatic, "automatic");
    },
    msgRequire(value) {
      if (value) {
        this.show = !this.show;
        if (value.message_type == "2") {
          this.automatic++;
        }
        if (value.message_type == "3") {
          this.artificial++;
        }
        this.total++;
        setTimeout(() => {
          this.show = !this.show;
        }, 2000);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  animation-delay: 0.03s;
  &-title {
    width: 479px;
    padding-top: 43px;
    background: url("~@/assets/title2.png") no-repeat;
    position: relative;
    &-wrapper {
      position: absolute;
      top: 0;
      left: 42px;
      text-shadow: 0 0 5px #fff, 0 0 7px #fff;
      font-size: 1.268em;
    }
  }
  &-body {
    display: table;
    width: 100%;
    padding-top: 50px;
    &-view {
      display: table-cell;
      width: 180px;
      vertical-align: top;
      text-align: center;
      position: relative;
      .total {
        position: absolute;
        bottom: 45px;
        width: 100%;
        font-size: 1.468em;
      }
    }
    &-info {
      display: table-cell;
      width: 300px;
      color: #f1f1f1;
      text-indent: 10px;
      &-header {
        font-size: 1.868em;
        margin: 20px 0;
        .num {
          color: #cda952;
        }
      }
      &-info {
        font-size: 1.468em;
        margin: 10px 0;
        .num {
          color: #7acc31;
        }
      }
      .num {
        float: right;
        margin-right: 20px;
      }
    }
    .add {
      color: #fff;
      position: absolute;
      top: 4px;
      left: 50%;
      width: 100px;
      margin-left: -50px;
      font-size: 2em;
    }
  }
}
.num-plus-enter-active {
  transition: all 0.4s ease;
}
.num-plus-enter {
  transform: translatey(10px);
}
.num-plus-leave-active {
  transition: all 1s;
}
.num-plus-leave-to {
  transform: translatey(-20px);
}
.num-plus-enter,
.num-plus-leave-to {
  opacity: 0;
}
</style>



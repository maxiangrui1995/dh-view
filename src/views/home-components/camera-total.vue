<template>
  <div class="box fadeInLeft animated">
    <div class="box-inner">
      <div class="box-inner-title">相机实时在线率</div>
      <div class="box-inner-body">
        <div class="box-inner-body-view">
          <canvas ref="canvas_online"></canvas>
        </div>
        <div class="box-inner-body-info">{{on_radio}}%</div>
      </div>
    </div>
    <div class="box-inner">
      <div class="box-inner-title">相机实时通断率</div>
      <div class="box-inner-body">
        <div class="box-inner-body-view">
          <canvas ref="canvas_offline"></canvas>
        </div>
        <div class="box-inner-body-info">{{off_radio}}%</div>
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
      on_radio: 0,
      off_radio: 0
    };
  },
  methods: {
    animatedView(finalNum, originNum, type, canvas) {
      let ctx = canvas.getContext("2d");
      let width = parseInt(getComputedStyle(canvas).width);
      let height = parseInt(getComputedStyle(canvas).height);
      canvas.width = width;
      canvas.height = height;
      let step = (finalNum - originNum) / (1500 / 50); //递增步数，允许浮点数
      // 确保加减时的step相同
      if (step > 0) {
        step = Math.ceil(step);
      } else {
        step = -Math.ceil(Math.abs(step));
      }
      let render = () => {
        ctx.clearRect(0, 0, width, height);
        ctx.lineWidth = 2;
        ctx.beginPath();

        // 内层
        ctx.beginPath();
        let pre = originNum / 100;
        let grd = ctx.createLinearGradient(0, 0, width * pre, height);
        grd.addColorStop(0, "#08478f");
        grd.addColorStop(1, "#72d9f8");
        ctx.fillStyle = grd;
        let n = pre === 1 ? 20 : pre * 20;
        for (let i = 0; i < n; i++) {
          let w = (width - 4) / 20 - 4;
          let c = Math.floor(n);
          if (i < c) {
            ctx.fillRect(4 + (w + 4) * i, 4, w, height - 8);
          } else {
            ctx.fillRect(4 + (w + 4) * i, 4, w * (n - c), height - 8);
          }
        }
        ctx.fill();
      };
      if (finalNum == originNum) return render();
      let timer = setInterval(() => {
        originNum += step;
        originNum = parseFloat(originNum.toFixed(2)); // 浮点数精度问题
        if (
          (step > 0 && originNum >= finalNum) ||
          (step < 0 && originNum <= finalNum) ||
          step == 0
        ) {
          originNum = finalNum;
          clearInterval(timer);
        }
        this[type] = originNum;
        render();
      }, 25);
    }
  },
  watch: {
    "data.on_radio"(newValue) {
      this.$nextTick(() => {
        this.animatedView(
          newValue,
          this.on_radio,
          "on_radio",
          this.$refs.canvas_online
        );
      });
    },
    "data.off_radio"(newValue) {
      this.$nextTick(() => {
        this.animatedView(
          newValue,
          this.off_radio,
          "off_radio",
          this.$refs.canvas_offline
        );
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  animation-delay: 0.09s;
  &-inner {
    width: 430px;
    margin: 0 auto;
    &-title {
      height: 36px;
      line-height: 36px;
    }
    &-body {
      position: relative;
      width: 100%;
      &-view {
        width: 370px;
        height: 24px;
        border: 1px solid #08478f;
        display: inline-block;
        vertical-align: middle;
        canvas {
          width: 100%;
          height: 100%;
        }
      }
      &-info {
        width: 58px;
        display: inline-block;
        color: #6acef0;
        text-indent: 16px;
      }
    }
  }
}
</style>


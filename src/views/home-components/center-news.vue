<template>
  <div class="box zoomIn animated">
    <div class="box-bg"></div>
    <div class="box-bg"></div>
    <div class="box-wrapper">
      <!-- <canvas class="box-wrapper-canvas" ref="center-new-view"></canvas> -->
      <div class="msg-tip" v-show="msgTip">警告！</div>

      <transition name="msg-crossing">
        <div class="msg-crossing" v-show="msgCrossing">
          <div class="info">路口名称</div>
        </div>
      </transition>
      <transition name="msg-content">
        <div class="msg-content" v-show="msgContent">
          <div class="title">故障内容故障内容故障内容故障内容故障内容故障内容故障内容故障内容故障内容故障内容</div>
        </div>
      </transition>

      <transition name="msg-type">
        <div class="msg-type" v-show="msgType">
          <div class="msg-type-wrapper">
            <div class="title">故障类型</div>
            <div class="info">
              等级：
              <span>1</span>
            </div>
            <div class="info">
              原因：
              <span>故障内故障内容故障内容故障内容故障内容故障内容容</span>
            </div>
          </div>
        </div>
      </transition>

      <transition name="msg-default">
        <div class="msg-default" v-show="msgDefault">
          <span>{{msgDefaultText}}</span>
        </div>
      </transition>

      <transition name="msg-loading">
        <div class="msg-loading" v-show="msgLoading">
          <div class="modal-wrapper">
            <div class="view">
              <canvas ref="canvas_loading" width="140" height="140"></canvas>
            </div>
            <div class="info">{{msgLoadingtitle}}</div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: { data: Array },
  data() {
    return {
      msgCrossing: false,
      msgContent: false,
      msgType: false,
      msgDefault: false,
      msgTip: false,
      msgLoading: false,
      msgDefaultText: "",
      msgLoadingtitle: "",
      // 数据
      nowShowData: {},
      allOfData: [],
      loading_origin: 0, //loading 初始
      loading_final: 0 //loading 最终
    };
  },
  methods: {
    // 画线
    drawline() {
      // 获得画布属性
      let canvas = this.$refs["center-new-view"];
      let width = parseInt(getComputedStyle(canvas).width);
      let height = parseInt(getComputedStyle(canvas).height);
      canvas.width = width;
      canvas.height = height;
      let ctx = canvas.getContext("2d");
      ctx.lineCap = "round";

      let t = 1;
      // 路径
      let vertices = [
        {
          x: 300,
          y: 100
        },
        {
          x: 50,
          y: 50
        }
      ];

      ctx.lineWidth = 1;

      ctx.lineWidth = 5;
      ctx.strokeStyle = "#67c7eb";

      let points = calcWaypoints(vertices);

      draw(points);

      function calcWaypoints(vertices) {
        var waypoints = [];
        for (var i = 1; i < vertices.length; i++) {
          var pt0 = vertices[i - 1];
          var pt1 = vertices[i];
          var dx = pt1.x - pt0.x;
          var dy = pt1.y - pt0.y;
          for (var j = 0; j < 100; j++) {
            var x = pt0.x + dx * j / 100;
            var y = pt0.y + dy * j / 100;
            waypoints.push({
              x: x,
              y: y
            });
          }
        }
        return waypoints;
      }

      function draw() {
        if (t < points.length - 1) {
          requestAnimationFrame(draw);
        }
        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(points[t].x, points[t].y);
        ctx.stroke();
        t++;
      }
    },
    // 根据返回值判断动画类型
    animate(data) {
      // 如果数据不为空
      if (data.length) {
        // 取第一个
        let first = data[0];
        // 若第一个值为false，说明当前没有进程
        if (first) {
          // 2,3为修复动画,1,2为故障动画
          if ([2, 3, "2", "3"].indexOf(first.message_type) > -1) {
            this.repairAnimate();
          } else {
            this.failureAnimate();
          }
        } else {
          this.defaultAnimate();
        }
      } else {
        // 若实时请求的所有数据
        if (this.allOfData.length) {
          // 向进程中插入
          this.data.push(...this.allOfData);
          this.allOfData = [];
        } else {
          this.data.push(false);
        }
      }
    },
    // 故障报警动画
    failureAnimate() {
      setTimeout(() => {
        this.msgTip = true;
        setTimeout(() => {
          this.nowShowData = this.data[0];
          this.msgTip = false;
          this.msgCrossing = true;
          setTimeout(() => {
            this.msgType = true;
            setTimeout(() => {
              this.msgContent = true;
              // leave
              setTimeout(() => {
                this.msgCrossing = false;
                this.msgType = false;
                this.msgContent = false;
                setTimeout(() => {
                  this.$store.dispatch("setMsgFailure", this.nowShowData);
                  this.data.shift();
                }, 2600);
              }, 3500);
            }, 1000);
          }, 1000);
        }, 3700);
      }, 1000);
    },
    // 自动修复动画
    repairAnimate() {
      setTimeout(() => {
        this.nowShowData = this.data[0];
        this.msgLoadingtitle = "正在自动修复中  请稍后...";
        this.loadingCanvas();
        this.msgCrossing = true;
        this.loading_final = 0;
        setTimeout(() => {
          this.msgType = true;
          setTimeout(() => {
            this.msgLoading = true;
            setTimeout(() => {
              this.loading_final = 100;
              setTimeout(() => {
                this.msgLoadingtitle = "修复成功";
                this.$store.dispatch("setMsgRequire", this.nowShowData);
                // leave
                setTimeout(() => {
                  this.msgCrossing = false;
                  this.msgType = false;
                  this.msgLoading = false;
                  this.data.shift();
                }, 1500);
              }, 1500);
            }, 500);
          }, 1000);
        }, 1000);
      }, 1000);
    },
    // 普通状态动画
    defaultAnimate() {
      // 没有进程时有三种过渡，随机取一个
      let textArray = ["正在设备巡检...", "正在视频检测...", "正在巡检修复..."];
      let index = Math.floor(Math.random() * 3);
      this.msgDefaultText = textArray[index];
      //持续6s
      setTimeout(() => {
        this.msgDefault = true;
        setTimeout(() => {
          this.msgDefault = false;
          setTimeout(() => {
            this.data.shift();
          }, 2000);
        }, 6000);
      }, 1000);
    },
    // 实时请求(5s)
    loopFetch() {
      setInterval(() => {
        this.$http("Ma_zong/controlCenter").then(res => {
          let data = res.data;
          // 如果有返回值，直接插入待定数组中
          if (data.length) {
            this.allOfData.push(...data);
          } else {
            this.allOfData.push(false);
            // 将重复的合并
            this.allOfData = Array.from(new Set(this.allData));
          }
        });
      }, 5000);
    },
    // canvas loading
    loadingCanvas() {
      let canvas = this.$refs.canvas_loading;
      let width = canvas.width;
      let height = canvas.height;
      let ctx = canvas.getContext("2d");
      let cx = width / 2;
      let cy = height / 2;
      let r = height / 2;
      let PI = Math.PI;

      let count = this.loading_origin;
      let finalNum = this.loading_final;
      let step = Math.ceil(finalNum / (1500 / 50));
      const render = () => {
        ctx.clearRect(0, 0, width, height);

        // 绘制外圈圆
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgba(23, 136, 228, 0.5)";
        ctx.fillStyle = "rgba(7, 43, 92, .3)";
        ctx.arc(cx, cy, r - 1, 0, 2 * PI, false);
        ctx.stroke();
        ctx.fill();
        ctx.save();
        // 绘制进度
        ctx.beginPath();
        ctx.strokeStyle = "#35e7fc";
        ctx.setLineDash([7]);
        ctx.lineWidth = 12;
        let pre = 270 - 360 * count / 100;
        ctx.arc(cx, cy, r - 12, 270 * PI / 180, pre * PI / 180, true);
        ctx.stroke();
        // 绘制内圈
        ctx.beginPath();
        ctx.strokeStyle = "rgba(23, 136, 228, 0.2)"; //072b5c
        ctx.fillStyle = "#0f2860";
        ctx.lineWidth = 2;
        ctx.setLineDash([3]);
        ctx.arc(width / 2, height / 2, r - 25, 0, 2 * PI, false);
        ctx.stroke();
        ctx.fill();
        // 文字
        ctx.beginPath();
        ctx.font =
          "26px PingFang SC,Helvetica,Microsoft YaHei,Arial,sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = "#fff";
        ctx.fillText(count + "%", cx, cy - 3);
        ctx.beginPath();
        ctx.fillStyle = "#ccc";
        ctx.font =
          "12px PingFang SC,Helvetica,Microsoft YaHei,Arial,sans-serif";
        ctx.fillText(count + " / 100", cx, cy + 18);
        ctx.restore();
      };
      render();
      let timer = setInterval(() => {
        count += step;
        if (count >= finalNum) {
          count = finalNum;
          clearInterval(timer);
        }
        this.loading_origin = count;
        render();
      }, 50);
    }
  },
  created() {
    if (this.$store.state.isLogin) {
      this.loopFetch();
    }
  },
  watch: {
    data(newValue) {
      this.animate(newValue);
    },
    loading_final() {
      this.loadingCanvas();
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  width: 934px;
  height: 675px;
  background: url("~@/assets/3-bg.png") no-repeat;
  margin: 0 auto;
  position: relative;
  font-size: 1.168em;
  &-bg {
    overflow: hidden;
    position: absolute;
    &:before {
      width: 591px;
      height: 620px;
      display: block;
      content: "";
      opacity: 0.6;
      background: url("~@/assets/3-circle.png") no-repeat;
    }
  }
  &-bg:nth-child(1) {
    top: 34px;
    left: 22px;
    width: 344px;
    height: 607px;
    &:before {
      margin-left: -280px;
      animation: rotate 60s linear infinite;
    }
  }
  &-bg:nth-child(2) {
    top: 39px;
    right: 27px;
    width: 344px;
    height: 601px;
    &:before {
      margin-left: 76px;
      animation: rotate 60s linear infinite reverse;
    }
  }
  &:before {
    content: "";
    display: block;
    width: 36px;
    height: 31px;
    position: absolute;
    top: 36px;
    right: 27px;
    background: url("~@/assets/3-top.png");
    z-index: 1;
  }
  &:after {
    content: "";
    display: block;
    width: 27px;
    height: 37px;
    position: absolute;
    left: 21px;
    bottom: 34px;
    background: url("~@/assets/3-bottom.png");
    z-index: 1;
  }
  &-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    &-canvas {
      width: 100%;
      height: 100%;
    }
  }
}
@keyframes anim-msg-tip {
  0% {
    opacity: 1;
  }
  80% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
.msg-tip {
  width: 342px;
  height: 45px;
  line-height: 45px;
  display: inline-block;
  position: absolute;
  color: #dc7e1a;
  text-align: center;
  background: url("~@/assets/title_2.png");
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  animation: anim-msg-tip 2s ease-in infinite;
  animation-fill-mode: both;
}
@keyframes anim-msg-crossing {
  0% {
    left: 0;
    opacity: 0;
  }
  100% {
    left: 104px;
    opacity: 1;
  }
}
.msg-crossing-enter-active {
  animation: anim-msg-crossing 1.5s;
}
.msg-crossing-leave-active {
  animation: anim-msg-crossing 0.5s reverse;
}
.msg-crossing {
  width: 339px;
  height: 85px;
  background: url("~@/assets/modal02.png");
  color: #cda952;
  position: absolute;
  top: 121px;
  left: 104px;
  .info {
    margin-top: 30px;
    text-indent: 30px;
  }
}
@keyframes anim-msg-content {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes anim-msg-content-leave {
  0% {
    transform: rotateZ(0deg) scale(1);
  }
  30% {
    opacity: 1;
    transform: rotateZ(30%) scale(0.4, 1);
  }
  50% {
    opacity: 1;
    transform: rotateZ(1024deg) scale(0.4, 1);
    top: 160px;
    left: 965px;
  }
  100% {
    opacity: 0;
    transform: rotateZ(1440deg) scale(0.4, 1);
    top: 160px;
    left: 965px;
  }
}
.msg-content-enter-active {
  animation: anim-msg-content 1.5s;
}
.msg-content-leave-active {
  animation: anim-msg-content-leave 2.6s linear;
}
.msg-content {
  width: 393px;
  height: 126px;
  background: url("~@/assets/modal01.png");
  color: #fff;
  position: absolute;
  top: 390px;
  left: 140px;
  .title {
    height: 30px;
    line-height: 30px;
    padding: 28px 10px 0;
    text-indent: 20px;
  }
}
@keyframes anim-msg-type {
  0% {
    opacity: 0;
    right: 0;
  }
  100% {
    opacity: 1;
    right: 145px;
  }
}
.msg-type-enter-active {
  animation: anim-msg-type 1.5s;
}
.msg-type-leave-active {
  animation: anim-msg-type 0.5s reverse;
}
.msg-type {
  width: 323px;
  height: 154px;
  background: url("~@/assets/modal05.png");
  color: #fff;
  position: absolute;
  top: 206px;
  right: 145px;
  &-wrapper {
    padding: 30px 10px 0;
  }
  .title {
    color: #ff5b5b;
    font-size: 1.28em;
    text-indent: 20px;
  }
  .info {
    height: 30px;
    line-height: 30px;
    text-indent: 20px;
    color: #38a9fc;
    span {
      color: #fff;
    }
  }
}
@keyframes anim-msg-default {
  0% {
    transform: scale(0, 0);
    opacity: 0;
  }
  60% {
    transform: scale(1.2);
  }
  80% {
    transform: scale(0.8);
  }

  100% {
    opacity: 0.8;
    transform: scale(1);
  }
}

.msg-default-enter-active {
  animation: anim-msg-default 2s linear;
}
.msg-default-leave-active {
  animation: anim-msg-default 2s linear reverse;
}
.msg-default {
  width: 339px;
  height: 85px;
  text-align: center;
  position: absolute;
  top: 305px;
  left: 310px;
  background: url("~@/assets/modal02.png");
  animation-duration: 2s;
  color: #dc7e1a;
  font-size: 1.268em;
  span {
    line-height: 85px;
    display: inline-block;
  }
}
@keyframes anim-msg-loading {
  0% {
    opacity: 0;
    bottom: 0;
  }
  100% {
    opacity: 1;
    bottom: 70px;
  }
}
.msg-loading-enter-active {
  animation: anim-msg-loading 1.5s;
}
.msg-loading-leave-active {
  animation: anim-msg-loading 0.5s reverse;
}
.msg-loading {
  width: 393px;
  height: 185px;
  background: url("~@/assets/modal04.png");
  color: #fff;
  position: absolute;
  left: 125px;
  bottom: 70px;
  .modal-wrapper {
    display: table;
    height: 170px;
    padding-top: 15px;
    .view {
      display: table-cell;
      width: 200px;
      height: 140px;
      text-align: center;
      vertical-align: middle;
    }
    .info {
      display: table-cell;
      vertical-align: middle;
      width: 180px;
      height: 170px;
      text-align: center;
      font-size: 1.38em;
      padding: 0 8px;
    }
  }
}
</style>


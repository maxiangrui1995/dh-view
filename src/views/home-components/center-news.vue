<template>
  <div class="box zoomIn animated">
    <div class="box-bg"></div>
    <div class="box-bg"></div>
    <div class="box-wrapper">
      <!-- <canvas class="box-wrapper-canvas" ref="center-new-view"></canvas> -->
      <div class="msg-crossing" v-show="msgCrossing">
        <div class="info">路口名称</div>
      </div>

      <div class="msg-content" v-show="msgContent">
        <div class="title">故障内容故障内容故障内容故障内容故障内容故障内容故障内容故障内容故障内容故障内容</div>
      </div>

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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msgCrossing: true,
      msgContent: true,
      msgType: true,
      nowShowData: {}
    };
  },
  methods: {
    animate() {
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
    }
  },
  created() {
    /* this.$nextTick(() => {
      this.animate();
    }); */
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
</style>


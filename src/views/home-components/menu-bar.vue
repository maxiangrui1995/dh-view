<template>
  <div class="box fadeInUp animated">
    <div class="box-wrapper">
      <div class="box-item" v-for="item in menuList" :key="item.name" :class="{active: item.name === menuActive}">
        <i :class="item.class" class="box-item-icon"></i>
        <span>{{item.name}}</span>
      </div>
      <div class="box-time">{{time}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        {
          name: "首页",
          class: "home",
          title: ""
        },
        {
          name: "资产管理",
          class: "asset",
          title: "资产管理"
        },
        {
          name: "数据可视化",
          class: "visualization",
          title: "数据可视化"
        },
        {
          name: "诊断",
          class: "diagnosis",
          title: "综合诊断"
        },
        {
          name: "统计分析",
          class: "statistical",
          title: "统计分析"
        }
      ],
      menuActive: "首页",
      time: ""
    };
  },
  methods: {
    getDateTime() {
      let d = new Date();
      let YY = d.getFullYear();
      let MM = d.getMonth();
      let DD = d.getDate();
      let h = d.getHours();
      let m = d.getMinutes();
      let s = d.getSeconds();
      h = h < 10 ? `0${h}` : h;
      m = m < 10 ? `0${m}` : m;
      s = s < 10 ? `0${s}` : s;
      this.time = `${YY}年${MM + 1}月${DD}日 ${h}:${m}:${s}`;
    },
    refreshDateTime() {
      this.getDateTime();
      setInterval(() => {
        this.getDateTime();
      }, 1000);
    }
  },
  created() {
    this.refreshDateTime();
  }
};
</script>

<style lang="scss" scoped>
.box {
  width: 960px;
  height: 57px;
  background: url("~@/assets/2-menu-bg.png") no-repeat center;
  position: relative;
  &-wrapper {
    width: 645px;
    margin: 0 auto;
  }
  &-item {
    display: inline-block;
    height: 36px;
    line-height: 36px;
    font-size: 1.268em;
    color: #67c7eb;
    margin-left: 36px;
    cursor: pointer;
    &-icon {
      width: 36px;
      height: 36px;
      display: inline-block;
      margin-right: 10px;
      vertical-align: middle;
    }
  }
  &-item:first-child {
    margin-left: 6px;
  }
  &-time {
    color: #67c7eb;
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.068em;
  }
  .active {
    color: #f1f1f1;
  }
  .home {
    display: none;
  }
  .asset {
    background-image: url("~@/assets/2-1.png");
  }
  .visualization {
    background-image: url("~@/assets/2-2.png");
  }
  .diagnosis {
    background-image: url("~@/assets/2-3.png");
  }
  .statistical {
    background-image: url("~@/assets/2-4.png");
  }
}
</style>

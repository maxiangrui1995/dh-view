<template>
  <div class="box fadeInUp animated">
    <div class="box-title" v-loading.lock="devLoading">
      <div class="box-title-header">
        <div class="tip" v-if="devData.length==0">暂无数据</div>
        <div class="box-title-header-item" v-for="(item, index) in devData" :key="index">
          <div class="status" @click="devClick(item)">{{['离线','在线'][item.is_online]}}</div>
          <div class="title" :title="item.dev_name">{{item.dev_name}}</div>
        </div>
      </div>
      <div class="box-title-page">
        <el-pagination class="columns-page" @current-change="devChangePage" layout="total, prev, pager, next" :page-size="devRows" :total="devTotal" v-if="devTotal>0">
        </el-pagination>
      </div>
    </div>
    <div class="box-body">
      <div class="box-body-inner-item">
        <div v-for="(item,index) in onePageOFData" :key="index" class="item" @click="navSelected(item)">
          <origin-item :active="selectedIndex == item.o_id">{{item.name}}</origin-item>
        </div>
      </div>
      <div class="box-body-inner-button">
        <div class="btn" :class="pagePrevClassObject" @click="changePage(-1)"></div>
        <div class="btn" :class="pageNextClassObject" @click="changePage(1)"></div>
      </div>
    </div>
  </div>
</template>

<script>
import originItem from "@/components/origin-item";
export default {
  props: { data: Array },
  components: {
    originItem
  },
  data() {
    return {
      // 组织机构
      page: 1,
      rows: 4,
      onePageOFData: [],
      selectedIndex: null,
      // 机箱设备
      devLoading: false,
      devPage: 1,
      devRows: 4,
      devTotal: 0,
      devData: []
    };
  },
  methods: {
    // 过滤数据
    filterData() {
      // 得到全部的组织机构，分页展示
      this.onePageOFData = [];
      this.data.forEach((item, index) => {
        if (
          index >= (this.page - 1) * this.rows &&
          index < this.page * this.rows
        ) {
          this.onePageOFData.push(item);
        }
      });
    },
    // 点击事件
    navSelected(data) {
      this.selectedIndex = data.o_id;
      this.fetchDevData(data.o_id);
    },
    // 分页
    changePage(page) {
      let p = this.page;
      this.page =
        p + page <= 0
          ? 1
          : (p + page) * this.rows >= this.data.length
            ? Math.ceil(this.data.length / this.rows)
            : p + page;

      this.filterData();
    },
    // 加载机箱设备
    fetchDevData(id) {
      this.devLoading = true;
      this.$http("Ma_zong/crossingBox", {
        o_id: id,
        page: this.devPage,
        rows: this.devRows
      }).then(res => {
        let data = res.data;
        this.devTotal = ~~data.total;
        this.devData = data.list || [];
        this.devLoading = false;
      });
    },
    devChangePage(page) {
      this.devPage = page;
      this.fetchDevData(this.selectedIndex);
    },
    devClick(data) {
      this.$store.commit("setCrossingBox", data);
    }
  },
  computed: {
    pagePrevClassObject() {
      let total = this.data.length;
      let page = this.page;
      let rows = this.rows;
      let bool = true;
      if (page > 1) {
        bool = false;
      }
      return {
        "btn-disabled": bool
      };
    },
    pageNextClassObject() {
      let total = this.data.length;
      let page = this.page;
      let rows = this.rows;
      let bool = true;
      if (page < Math.ceil(total / rows)) {
        bool = false;
      }
      return {
        "btn-disabled": bool
      };
    }
  },
  watch: {
    data(data) {
      if (data) {
        this.navSelected(data[0]);
        this.filterData();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  width: 922px;
  height: 204px;
  background: url("~@/assets/4-footer.png");
  margin: 0 auto;
  padding: 0 10px;
  &-title {
    height: 144px;
    border-bottom: 1px solid #073b69;
    &-header {
      height: 112px;
      &-item {
        width: 228px;
        display: inline-block;
        text-align: center;
        .status {
          width: 78px;
          height: 56px;
          line-height: 56px;
          margin: 12px auto;
          background: url("~@/assets/cpustatus.png");
          text-align: center;
          color: #67c7eb;
          cursor: pointer;
        }
        .title {
          height: 26px;
          line-height: 26px;
          padding: 0 8px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
    &-page {
      height: 32px;
      text-align: right;
    }
  }
  &-body {
    height: 60px;
    &-inner-item {
      width: 800px;
      height: 60px;
      display: inline-block;
      vertical-align: top;
      overflow: hidden;
      .item {
        display: inline-block;
        margin-top: 18px;
        margin-right: 10px;
        cursor: pointer;
      }
    }
    &-inner-button {
      width: 80px;
      display: inline-block;
      margin-left: 40px;
      .btn {
        display: inline-block;
        width: 30px;
        height: 30px;
        margin-top: 16px;
        cursor: pointer;
      }
      .btn:nth-child(1) {
        background: url("~@/assets/btn1.png");
        margin-right: 6px;
      }
      .btn:nth-child(2) {
        background: url("~@/assets/btn2.png");
      }
    }
  }
  .btn-disabled {
    cursor: not-allowed;
    .ivu-icon {
      color: #b5b5b5;
    }
  }
  .tip {
    text-align: center;
    line-height: 112px;
    color: rgba($color: #f1f1f1, $alpha: 0.6);
  }
}
</style>
<style lang="scss">
.columns-page.el-pagination {
  margin-right: 16px;
  color: #495060;
  padding: 0;
  .el-pagination__total {
    color: #495060;
  }
  .btn-prev,
  .btn-next {
    background: transparent;
    color: #c0c4cc;
  }
  .el-pager li {
    background: transparent;
    font-weight: normal;
  }
  .el-pager li.active {
    color: #f1f1f1;
  }
  .el-pager li:hover {
    color: #fff;
  }
  button:disabled {
    background: transparent;
    color: #303133;
  }
}
.el-loading-mask {
  background-color: rgba(7, 27, 68, 0.9) !important;
}
</style>



<template>
  <div class="box fadeInUp animated">
    <div class="box-title">
      <div class="box-title-header">
        <div class="box-title-header-item" v-for="i in 6" :key="i">
          <div class="status">在线</div>
          <div class="title" title="">机箱名称机箱名称机箱名称机箱名称</div>
        </div>
      </div>
      <div class="box-title-page">
        <el-pagination class="columns-page" @current-change="handleCurrentChange" :current-page="currentPage4" :page-size="100" layout="total, prev, pager, next" :total="400">
        </el-pagination>
      </div>
    </div>
    <div class="box-body">
      <div class="box-body-inner-item">
        <div class="item">
          <origin-item>海安县交警大队1分队</origin-item>
        </div>
        <div class="item">
          <origin-item>海安县1分队</origin-item>
        </div>
        <div class="item">
          <origin-item>海安县1分队</origin-item>
        </div>
      </div>
      <div class="box-body-inner-button">
        <div class="btn"></div>
        <div class="btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
import originItem from "@/components/origin-item";
export default {
  components: {
    originItem
  },
  data() {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
        width: 153px;
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
      width: 840px;
      display: inline-block;
      vertical-align: top;
      .item {
        display: inline-block;
        margin-top: 18px;
        margin-right: 10px;
      }
    }
    &-inner-button {
      width: 80px;
      display: inline-block;
      .btn {
        display: inline-block;
        width: 30px;
        height: 30px;
        margin-top: 16px;
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
</style>



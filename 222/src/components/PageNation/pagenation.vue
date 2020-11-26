<template>
  <div>
    <el-pagination
      v-if="pagination && pagination.show && pageShow"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pagination.pageSizes"
      :page-size="pageSize"
      :layout="pagination.layout || defaultLayout"
      :total="pagination.total"
      :size="pagination.small"
      :background="background"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    background: {
      type: Boolean,
      default: true
    },
    pagination: {
      type: Object,
      default: () => {
        return {
          small: false,
          pageSizes: [],
          total: 0,
          show: false,
          layout: 'total, sizes, prev, pager, next, jumper'
        }
      }
    }
  },
  data() {
    return {
      pageShow: true,
      currentPage: 1,
      pageSize: 10,
      defaultLayout: 'total, sizes, prev, pager, next, jumper'
    }
  },
  methods: {
    //每页条数
    handleSizeChange(val) {
      this.$emit('pageChange', 'num', val)
    },
    //当前页
    handleCurrentChange(val) {
      this.$emit('pageChange', 'page', val)
    }
  }
}
</script>
<style lang="scss">
/* 分页样式修改 */
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  margin: 0 5px;
  background-color: white;
  color: rgba(0, 0, 0, 0.65);
  min-width: 24px;
  border-radius: 2px;
  border: solid 1px rgb(227, 230, 237);
  font-size: 14px;
  font-weight: 400;
}
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  margin: 0 5px;
  background-color: white;
  color: rgba(0, 0, 0, 0.65);
  min-width: 24px;
  border-radius: 2px;
  border: solid 1px rgb(227, 230, 237);
  font-weight: 400;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: rgba(24, 144, 255, 1);
  color: #fff;
}
.el-pagination.is-background .el-pager li:not(.disabled).active:hover {
  background-color: rgba(24, 144, 255, 1);
  color: #fff;
}
.el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: rgba(0, 0, 0, 0.65);
}
// .el-pagination__jump {
//   margin-left: 5px;
//   font-weight: 400;
//   color: rgb(102, 102, 102);
// }
.el-pagination .el-input__inner {
  text-align: left;
  padding-left: 7px;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  width: 80px;
  height: 24px;
  line-height: 24px;
}

.el-pagination .el-select .el-input {
  width: 80px;
  margin-right: -10px !important;
}
.el-pagination__editor.el-input {
  margin-right: 5px;
  width: 50px;
  margin-left: 5px;
}
.el-pagination__editor.el-input .el-input__inner {
  height: 24px;
  border-radius: 2px;
}
.el-select-dropdown__item.selected {
  color: rgba(0, 0, 0, 0.65);
  font-weight: 400;
}
.el-pagination__sizes .el-input .el-input__inner:hover {
  border-color: #e4e4e4;
}
.el-select .el-input.is-focus .el-input__inner {
  border-color: #e4e4e4;
}
.el-select .el-input__inner:focus {
  border-color: #e4e4e4;
}
.el-pagination__total {
  margin: 0 10px;
  font-family: MicrosoftYaHei;
  color: rgba(0, 0, 0, 0.65);
}
.el-pagination .el-select .el-input .el-input__inner {
  padding-right: 26px;
  border-radius: 2px;
}

.el-pagination__sizes .el-input .el-input__inner {
  padding-left: 3px;
}
.el-pager li {
  height: 24px;
  line-height: 24px;
}
.el-pagination button,
.el-pagination span:not([class*='suffix']) {
  height: 24px;
  line-height: 24px;
}
.el-pagination {
  white-space: nowrap;
  padding: 2px 0px !important;
}
</style>

<template>
  <div class="normal-table-layout">
    <!-- 表格 -->
    <el-table
      ref="normalTable"
      class="normal-table"
      :data="table.data"
      style="width: 100%"
      v-loading="loading"
      :show-header="table.config.showHeader"
      :height="table.config.height"
      :max-height="table.config.maxHeight"
      :border="table.config.dragable"
      :header-row-style="table.config.headerRowStyle"
      :row-style="table.config.rowStyle "
      :header-cell-style="table.config.headerCellStyle"
      :cell-style="table.config.cellStyle"
      :cell-class-name="table.config.cellClassName"
      :span-method="table.config.spanMethod"
      @selection-change="handleSelectionChange"
      @filter-change="filterChange"
      @sort-change="sortChange"
      >
      <!-- 显示表格选项 -->
      <el-table-column v-if="table.config.hasSelection" type="selection" :selectable='selectable' width='50' key='hasSelection'></el-table-column>
      <el-table-column v-if="table.config.columnType && table.config.columnType == 'selection'" :type="table.config.columnType" :selectable='selectable'></el-table-column>
      <!-- 普通选项 -->
      <el-table-column
       v-for="(item,index) in table.options"
       :key="index"
       :prop="item.prop"
       :label="item.label"
       :show-overflow-tooltip='showOverflowTooltip'
       :sortable="item.sortProp ? 'custom' : false"
       :min-width="item.minWidth"
       :class-name="item.className"
       column-key="filter"
       :filters="item.selectOptions"
       :filter-multiple='item.filterMultiple == true ? true : false'
       filter-placement="bottom"
       >
      </el-table-column>
      <!-- 操作按钮 -->
      <el-table-column v-if="table.operation.show" :label="table.operation.label" :width="table.operation.width">
        <template slot-scope="scope">
           <span>
            <el-button v-for="(opBtn,index) in (scope.row.operation || OperationEvents)"
              type="text"
              size="mini"
              :disabled='opBtn.disabled'
              :title="opBtn.title"
              @click="handleClick(opBtn,scope.row)"
              :key="opBtn.id"
              v-if="(index+1) <= table.operation.showNum"
              >
                {{opBtn.value}}
            </el-button>
            <el-dropdown v-if="table.operation.showNum < (scope.row.operation ? scope.row.operation.length : OperationEvents.length)">
              <el-button type="text" size = "mini">更多</el-button>
              <el-dropdown-menu slot="dropdown" class="normal-table-dropdown">
                <el-dropdown-item v-for="(dropItem,index) in (scope.row.operation || OperationEvents)" :key="dropItem.id" v-if="(index+1) > table.operation.showNum">
                  <el-button size="mini"
                    @click='handleClick(dropItem,scope.row)'
                    :title="dropItem.title"
                    :disabled='dropItem.disabled'>
                    {{dropItem.value}}
                  </el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
           </span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 翻页 -->
    <el-pagination :disabled='loading' id="pags" :small="false" v-if='Pagination && Pagination.show' @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="Pagination.pagingData" background  :page-size="Pagination.pagingData[0]" layout="sizes, prev, pager, next, jumper" :total="Pagination.total">
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    tableObj: {
      type: Object,
      default: () => {
        return {}
      }
    },
    loading: [Boolean],
    // 操作传参的第二种方式
    OperationEvents: {
      type: Array,
      default: () => {
        return []
      }
    },
    Pagination: [Array, Object],
    showOverflowTooltip: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      currentPage: 1
    }
  },
  computed: {
    table () {
      let tableObj = this.tableObj
      let config = tableObj.config || {}
      let operation = tableObj.operation || {}
      let table = {
        data: tableObj.data, // 数据
        options: tableObj.options, // 数据展示
        config: {
          showHeader: config.showHeader !== false, // 默认展示表头 true false
          height: config.height || null, // 表格高度默认内容撑开
          maxHeight: config.maxHeight || null, // 表格最小高度默认内容撑开
          dragable: config.dragable, // 表头边框添加表头拖拽 true false
          headerRowStyle: config.headerRowStyle || null, // 表头样式 可为对象或函数
          rowStyle: config.rowStyle || null, // 表格行样式
          headerCellStyle: config.headerCellStyle || null, // 表头样式 可为object或funtion
          cellStyle: config.cellStyle || null, // 表格行样式 可为object或funtion
          cellClassName: config.cellClassName || null, // 表格类名,可以写在函数中，也可以接收类名写在style中
          spanMethod: config.spanMethod || null, // 合并单元格，可以写在函数中
          hasSelection: config.hasSelection,
          columnType: config.columnType
        },
        operation: {
          label: operation.label || '操作',
          width: operation.width || '170',
          showNum: operation.showNum || 3,
          show: operation.show
        }
      }
      return table
    }
  },
  methods: {
    // 是否可勾选
    selectable (val) {
      if (val.selectable) {
        return false
      } else {
        return true
      }
    },
    // 操作传参
    handleClick (item, rowData) {
      item.fun(rowData)
    },
    // 多选
    handleSelectionChange (val) {
      this.$emit('selectChange', val)
    },
    // 筛选
    filterChange (val) {
      if (val.filter.length === 0) {
        this.$refs.normalTable.clearFilter()
        this.currentPage = 1
      }
      this.$emit('filterChange', val['filter'].join(','))
    },
    // 排序
    sortChange (col) {
      // if (col.column && col.column.sortable === 'custom') {
      //   let sortKey = col.column.sortKey || col.column.columnKey || col.prop
      //   let asc = col.order === 'ascending' ? 'asc' : col.order === 'descending' ? 'desc' : null
      //   let sort = {
      //     sort: `${sortKey}:${asc}`,
      //     sortKey,
      //     asc
      //   }
      //   this.$emit('sortChange', sort)
      // }
      let sort = {
        sort: col.prop,
        asc: col.order === 'ascending' ? 1 : 0,
        label: col.column && col.column.label
      }
      this.$emit('sortChange', sort)
    },
    // 每页多少条
    handleSizeChange (val) {
      this.$emit('pagingEvent', 'num', val)
    },
    // 当前第几页
    handleCurrentChange (val) {
      this.currentPage = val
      this.$emit('pagingEvent', 'page', val)
    }
  }
}
</script>
<style  lang="scss"  scoped>
.normal-table-layout{
  .el-pagination{
    margin-top: 20px;
    text-align: right;
  }
}
</style>
<style>
/* 分页样式修改 */
.el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
    margin: 0 5px;
    background-color: white;
    color: #606266;
    min-width: 30px;
    border-radius: 3px;
    border:solid 1px rgb(227,230,237);
    font-size:12px;
    font-weight:400;
}
.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
    margin: 0 5px;
    background-color: white;
    color: rgb(102,102,102);
    min-width: 30px;
    border-radius: 3px;
    border:solid 1px rgb(227,230,237);
    font-weight:400;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: rgb(101,144,211);
    color: #fff;
}
.el-pagination.is-background .el-pager li:not(.disabled).active:hover {
    background-color: rgb(101,144,211);
    color: #fff;
}
.el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: rgb(101,144,211);
}
.el-pagination__jump {
    margin-left: 5px;
    font-weight: 400;
    color: rgb(102,102,102);
}
.el-pagination .el-input__inner{
  text-align:left;
  padding-left:7px;
  font-size:12px;
  font-weight:400;
}
.el-pagination__editor.el-input {
    margin-right: 5px;
    width: 50px;
    margin-left: 5px;
}
.el-pagination__editor.el-input .el-input__inner {
    height: 28px;
    border-radius:3px;
}
.el-select-dropdown__item.selected {
    color: #6590d3;
    font-weight:400;
}
.el-pagination__sizes .el-input .el-input__inner:hover {
    border-color: #6590d3;
}
.el-select .el-input.is-focus .el-input__inner {
    border-color: #6590d3;
}
.el-select .el-input__inner:focus {
    border-color: #6590d3;
}
</style>
<style lang="scss">
/* 操作样式修改 */
.el-button--text{
    color: #6590d3;
    font-size: 12px;
}
.el-button--text:focus, .el-button--text:hover {
    color: #6590d3;
    border-color: transparent;
    background-color: transparent;
}
</style>
<style lang="scss">
// 下拉菜单修改
.el-dropdown-menu{
  .el-button{
    color: #6590d3;
    font-size: 12px;
    border:none;
    outline: none;
    background-color: transparent;
  }
  .el-button:hover{
    color: #6590d3;
    border-color: transparent;
    background-color: transparent;
  }
}
</style>

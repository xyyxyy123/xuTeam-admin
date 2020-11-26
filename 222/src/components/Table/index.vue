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
      :row-style="table.config.rowStyle"
      :header-cell-style="table.config.headerCellStyle"
      :cell-style="table.config.cellStyle"
      :cell-class-name="table.config.cellClassName"
      :span-method="table.config.spanMethod"
      @selection-change="handleSelectionChange"
      @filter-change="filterChange"
      @sort-change="sortChange"
    >
      <!-- 显示表格选项 -->
      <el-table-column
        v-if="table.config.hasSelection"
        type="selection"
        :selectable="selectable"
        width="50"
        key="hasSelection"
      ></el-table-column>
      <el-table-column
        v-if="table.config.columnType && table.config.columnType == 'selection'"
        :type="table.config.columnType"
        :selectable="selectable"
      ></el-table-column>
      <!-- 普通选项 -->
      <el-table-column
        v-for="(item, index) in table.options"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :show-overflow-tooltip="showOverflowTooltip"
        :sortable="item.sortProp ? 'custom' : false"
        :min-width="item.minWidth"
        :class-name="item.className"
        column-key="filter"
        :filters="item.selectOptions"
        :filter-multiple="item.filterMultiple == true ? true : false"
        filter-placement="bottom"
      >
        <template slot-scope="scope">
          <!-- scope.row.disabled禁用的需要给数据添加disable值,不需禁用则不加 -->
          <router-link
            v-if="item.path && scope.row.disabled !== true"
            :to="item.path"
            v-html="scope.row[item.prop]"
          ></router-link>
          <span v-else>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <!-- 操作按钮 -->
      <el-table-column
        v-if="table.operation.show"
        :label="table.operation.label"
        :width="table.operation.width"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            class="operation-btn"
            v-for="opBtn in scope.row.operation || OperationEvents"
            :disabled="opBtn.disabled"
            :title="opBtn.title"
            :style="{ color: opBtn.color }"
            @click="opBtn.fun(opBtn, scope.row)"
            :class="opBtn.disabled === true ? 'disable' : ''"
            :key="opBtn.id"
          >
            {{ opBtn.value }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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
    showOverflowTooltip: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  computed: {
    table() {
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
          show: operation.show
        }
      }
      return table
    }
  },
  methods: {
    // 是否可勾选,是否禁用启用，selectable为添加的属性
    selectable(val) {
      if (val.selectable) {
        return false
      } else {
        return true
      }
    },
    // 操作传参
    handleClick(item, rowData) {
      item.fun(rowData)
    },
    // 多选
    handleSelectionChange(val) {
      this.$emit('selectChange', val)
    },
    // 筛选
    filterChange(val) {
      if (val.filter.length === 0) {
        this.$refs.normalTable.clearFilter()
        this.currentPage = 1
      }
      this.$emit('filterChange', val['filter'].join(','))
    },
    // 排序
    sortChange(col) {
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
    }
  }
}
</script>
<style lang="scss" scoped>
.normal-table-layout {
  .el-pagination {
    margin-top: 20px;
    text-align: right;
  }
}
</style>

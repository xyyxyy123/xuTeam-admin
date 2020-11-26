<template>
  <div class="system-dictionary">
    <el-row>
      <el-col :span="12">
        <div style="border:1px solid #E4E4E4; margin-top:24px;">
          <div>
            <p style="padding-top:17px;padding-left:24px;">字典</p>
            <header class="header-container-top system-dictionary-head">
              <div>
                <label>字典管理</label>
                <el-input
                  placeholder="输入登录名搜索"
                  v-model="query.dictionary"
                  style="width: 70%;"
                  size="small"
                >
                </el-input>
              </div>
              <div>
                <label>描述</label>
                <el-input
                  placeholder="请输入"
                  v-model="query.describe"
                  style="width: 70%;"
                  size="small"
                >
                </el-input>
              </div>
              <div class="header-container-btn">
                <el-button
                  style="background-color:#409eff;"
                  :class="'active'"
                  size="small"
                  >搜索</el-button
                >
                <el-button
                  style="background-color:#409eff;"
                  :class="'active'"
                  size="small"
                  >重置</el-button
                >
              </div>
            </header>
            <header class="header-container-bottom system-dictionary-head">
              <div class="header-container-btn">
                <el-button
                  v-for="item in operationButton"
                  :key="item.id"
                  :value="item.title"
                  size="small"
                  :style="{ 'background-color': item.color }"
                  @click="item.fun"
                  :class="item.disabled === true ? 'disable' : 'active'"
                  :disabled="item.disabled"
                >
                  {{ item.title }}
                </el-button>
              </div>
            </header>
          </div>
          <article style="padding-top:30px;">
            <normal-table
              :table-obj="tableObj"
              :loading="false"
              @selectChange="handleSelectionChange"
              :showOverflowTooltip="true"
            ></normal-table>
            <page-nation
              style="margin:24px 24px 24px 0px;text-align: right;"
              @pageChange="pageChange"
              :pagination="pagination"
            ></page-nation>
          </article>
        </div>
      </el-col>
      <el-col :span="12">
        <div style="border:1px solid #E4E4E4;margin:24px 24px 0 24px;">
          <div class="header-container-bottom detail-btn">
            <p>字典详情</p>
            <div class="header-container-btn">
              <el-button
                style="background-color:#409eff;"
                :class="'active'"
                size="small"
                @click="addDetail"
              >
                新增
              </el-button>
            </div>
          </div>
          <article style="padding-top:30px;">
            <normal-table
              :table-obj="tableObjs"
              :loading="false"
              @selectChange="handleSelectionChanges"
              :showOverflowTooltip="true"
            ></normal-table>
            <page-nation
              style="margin:24px 24px 24px 0px;text-align: right;"
              @pageChange="pageChange"
              :pagination="pagination"
            ></page-nation>
          </article>
        </div>
      </el-col>
      <!-- 添加表格弹框 -->
      <div>
        <dialogs
          v-if="showDialog"
          ref="dialogComponent"
          :title="title"
          :dialogWidth="dialogWidth"
          :dialog-data="dialogData"
          @closeDialog="closeDialog"
          :dialog-status="dialogStatus"
        ></dialogs>
      </div>
      <!-- 添加详情弹框 -->
      <div>
        <dialog-detail
          v-if="showDialogDetail"
          ref="dialogDetail"
          :title="titleDetail"
          :dialogWidth="dialogWidth"
          :dialog-data="dialogDetail"
          @closeDialogDetail="closeDialogDetail"
          :dialog-status="dialogStatus"
        ></dialog-detail>
      </div>
    </el-row>
  </div>
</template>
<script>
import normalTable from '@/components/Table/index'
import pageNation from '@/components/PageNation/pagenation.vue'
import dialogs from '@/views/system/dictionary/dialog/addList'
import dialogDetail from '@/views/system/dictionary/dialog/addDetail'

export default {
  components: {
    pageNation,
    normalTable,
    dialogs,
    dialogDetail
  },
  data() {
    return {
      //搜索参数
      query: {
        dictionary: '',
        describe: ''
      },
      //头部操作按钮
      operationButton: [
        {
          value: 'add',
          title: '新增',
          icons: 'el-icon-plus',
          id: 'add',
          disabled: false,
          color: '#409eff',
          fun: () => {
            return this.addList()
          }
        },
        {
          value: 'edit',
          title: '修改',
          icons: 'el-icon-edit',
          id: 'edit',
          disabled: true,
          color: '#409eff',
          fun: () => {
            return this.handleEdit()
          }
        },
        {
          value: 'delete',
          title: '删除',
          icons: 'el-icon-delete',
          id: 'delete',
          disabled: true,
          color: '#FF6363',
          fun: () => {
            return this.handleDelete()
          }
        }
      ],
      //表格操作
      tableData: [],
      options: [
        {
          prop: 'address',
          label: '归属机构'
        },
        {
          prop: 'name',
          label: '登录名'
        },
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'name',
          label: '性别'
        },
        {
          prop: 'date',
          label: '创建日期'
        },
        {
          prop: 'date',
          label: '电话号码'
        }
      ],
      //表格详情
      tablelist: [],
      optlist: [
        {
          prop: 'address',
          label: '归属机构'
        },
        {
          prop: 'name',
          label: '登录名'
        },
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'name',
          label: '性别'
        },
        {
          prop: 'date',
          label: '创建日期'
        },
        {
          prop: 'date',
          label: '电话号码'
        }
      ],
      //分页参数
      pagination: {
        small: false,
        pageSizes: [15, 20, 50],
        total: 50,
        show: true,
        layout: 'prev, pager, next, total,sizes'
      },
      //批量选框
      multipleSelection: [],
      title: '新增字典',
      titleDetail: '新增字典详情',
      dialogWidth: '720px',
      showDialog: false,
      showDialogDetail: false,
      dialogStatus: '',
      dialogData: [],
      dialogDetail: []
    }
  },
  computed: {
    tableObj() {
      let table = {
        data: this.tableData,
        options: this.options,
        config: {
          dragable: false,
          showHeader: true,
          columnType: 'selection',
          headerCellStyle: { background: 'rgba(246,246,246,1)' }
        },
        operation: {
          show: true
        }
      }
      return table
    },
    tableObjs() {
      let table = {
        data: this.tablelist,
        options: this.optlist,
        config: {
          dragable: false,
          showHeader: true,
          columnType: '',
          headerCellStyle: { background: 'rgba(246,246,246,1)' }
        },
        operation: {
          show: true
        }
      }
      return table
    }
  },
  mounted() {
    //数据
    this.tableData = [
      {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      },
      {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }
    ]
    this.tablelist = [
      {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      },
      {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }
    ]
    this.tableData.forEach(element => {
      // 方法二遍历回来的数据，插入操作
      this.addOperation(element)
    })
    this.tablelist.forEach(element => {
      // 方法二遍历回来的数据，插入操作
      this.addOperations(element)
    })
  },
  methods: {
    //表格操作
    addOperation(data) {
      //表格操作按钮
      let operation = [
        {
          value: '禁用',
          title: '禁用',
          id: 'enable',
          disabled: false,
          color: 'rgba(64,158,255,0.8)',
          fun: (item, content) => {
            return this.handleEnabled(item, content)
          }
        },
        {
          value: '编辑',
          title: '编辑',
          id: 'edit',
          disabled: false,
          color: 'rgba(64,158,255,0.8)',
          fun: (item, content) => {
            return this.handleEdit(item, content)
          }
        },
        {
          value: '删除',
          title: '删除',
          id: 'delete',
          disabled: true,
          color: 'rgba(255,99,99,0.8)',
          fun: (item, content) => {
            return this.handleDelete(item, content)
          }
        }
      ]
      this.$set(data, 'operation', operation)
    },
    //表格详情操作
    addOperations(data) {
      //表格操作按钮
      let operation = [
        {
          value: '禁用',
          title: '禁用',
          id: 'enable',
          disabled: false,
          color: 'rgba(64,158,255,0.8)',
          fun: (item, content) => {
            return this.handleEnabledDetail(item, content)
          }
        },
        {
          value: '编辑',
          title: '编辑',
          id: 'edit',
          disabled: false,
          color: 'rgba(64,158,255,0.8)',
          fun: (item, content) => {
            return this.handleEditDetail(item, content)
          }
        },
        {
          value: '删除',
          title: '删除',
          id: 'delete',
          disabled: false,
          color: 'rgba(255,99,99,0.8)',
          fun: (item, content) => {
            return this.handleDeleteDetail(item, content)
          }
        }
      ]
      this.$set(data, 'operation', operation)
    },
    //表格多选框
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.operationButton.forEach(res => {
        if (this.multipleSelection.length === 1) {
          res.disabled = false
        } else if (this.multipleSelection.length === 0) {
          if (res.value === 'edit') {
            res.disabled = true
          }
          if (res.value === 'delete') {
            res.disabled = true
          }
          if (res.value === 'enable') {
            res.disabled = true
          }
        } else if (this.multipleSelection.length > 1) {
          if (res.value === 'edit') {
            res.disabled = true
          }
          if (res.value === 'delete') {
            res.disabled = false
          }
          if (res.value === 'enable') {
            res.disabled = false
          }
        }
      })
    },
    //表格详情多选框
    handleSelectionChanges() {},
    //新增列表
    addList() {
      this.dialogStatus = 'add'
      this.showDialog = true
      this.$nextTick(() => {
        this.$refs['dialogComponent'].showDialog = true
      })
    },
    //修改列表
    handleEdit(item, content) {
      this.dialogData = []
      if (item) {
        this.dialogStatus = 'edit'
        this.dialogData.push(content)
      }
      this.showDialog = true
      this.$nextTick(() => {
        this.$refs['dialogComponent'].showDialog = true
      })
    },
    //删除列表
    handleDelete(item, content) {
      console.log(item, content, 9999)
      this.$confirm('确定“删除”所选数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          //删除成功的接口
          this.$message({
            type: 'success',
            message: '启用成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'success',
            message: '取消启用'
          })
        })
    },
    //禁用列表
    handleEnabled(item, content) {
      console.log(item, content, 9999)
      this.$confirm('确定“禁用”所选数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          //删除成功的接口
          this.$message({
            type: 'success',
            message: '启用成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'success',
            message: '取消启用'
          })
        })
    },
    //添加详情列表
    addDetail() {
      this.dialogStatus = 'add'
      this.showDialogDetail = true
      this.$nextTick(() => {
        this.$refs['dialogDetail'].showDialogDetail = true
      })
    },
    //编辑详情列表
    handleEditDetail(item, content) {
      this.dialogDetail = []
      if (item) {
        this.dialogStatus = 'edit'
        this.dialogDetail.push(content)
      }
      this.showDialogDetail = true
      this.$nextTick(() => {
        this.$refs['dialogDetail'].showDialogDetail = true
      })
    },
    handleDeleteDetail(item, content) {
      console.log(item, content, 9999)
      this.$confirm('确定“删除”所选数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          //删除成功的接口
          this.$message({
            type: 'success',
            message: '启用成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'success',
            message: '取消启用'
          })
        })
    },
    handleEnabledDetail(item, content) {
      console.log(item, content, 9999)
      this.$confirm('确定“禁用”所选数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          //删除成功的接口
          this.$message({
            type: 'success',
            message: '启用成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'success',
            message: '取消启用'
          })
        })
    },
    //分页
    pageChange(type, val) {
      if (type === 'num') {
        console.log(val, '条数')
      } else if (type === 'page') {
        console.log(val, '页数')
      }
    },
    closeDialog() {
      this.showDialog = false
    },
    closeDialogDetail() {
      this.showDialogDetail = false
    }
  }
}
</script>
<style lang="scss" scoped>
.system-dictionary {
  .detail-btn {
    padding-top: 10px;
    padding-left: 10px;
  }
  .el-table {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    font-family: MicrosoftYaHei;
    border-top: 1px 0 0 0 solid #e4e4e4;
    border-bottom: 0px;
    border-left: 0px;
    border-right: 0px;
  }
  .system-dictionary-head {
    padding-left: 24px;
  }
  p {
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    font-weight: bold;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.65);
  }
}
</style>

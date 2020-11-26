<template>
  <div class="system-user">
    <el-row>
      <el-col :span="5" class="system-user-left">
        <div class="system-user-head system-user-tree">
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterDept"
            size="small"
            suffix-icon="el-icon-search"
          >
          </el-input>
        </div>
        <el-tree
          class="filter-tree"
          :data="data2"
          :load="getDeptDatas"
          :props="defaultProps"
          :expand-on-click-node="false"
          node-key="id"
          :default-expanded-keys="idArr"
          ref="tree"
          :filter-node-method="filterNode"
        >
        </el-tree>
      </el-col>
      <el-col :span="19">
        <header class="header-container-top">
          <div>
            <label>登录名</label>
            <el-input
              placeholder="输入登录名搜索"
              v-model="query.loginName"
              style="width: 70%;"
              size="small"
            >
            </el-input>
          </div>
          <div>
            <label>姓名</label>
            <el-input
              placeholder="输入姓名搜索"
              v-model="query.userName"
              style="width: 80%;"
              size="small"
            >
            </el-input>
          </div>
          <div>
            <label>状态</label>
            <el-select
              style="width: 70%;"
              v-model="query.userStatus"
              placeholder="状态"
              size="small"
              @change="userSelect(query.userStatus)"
            >
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="header-container-btn">
            <el-button
              style="background-color:#409eff;"
              :class="'active'"
              size="small"
              @click="searchAll"
              >搜索</el-button
            >
            <el-button
              style="background-color:#409eff;"
              :class="'active'"
              size="small"
              @click="userReset"
              >重置</el-button
            >
          </div>
        </header>
        <header class="header-container-bottom">
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
          <!-- <div class="content-searchBtn">
            <i class="el-icon-s-grid"></i>
            <span>自定义列表</span>
          </div> -->
        </header>
        <article style="margin-top:30px;margin-right:25px;">
          <normal-table
            :table-obj="tableObj"
            :loading="false"
            @selectChange="handleSelectionChange"
            :showOverflowTooltip="true"
          ></normal-table>
          <page-nation
            style="margin-top:24px;text-align: right;"
            @pageChange="pageChange"
            :pagination="pagination"
          ></page-nation>
        </article>
      </el-col>
      <!-- 添加数据弹框 -->
      <div>
        <dialogs
          :title="title"
          :dialogWidth="dialogWidth"
          :visible.sync="visible"
        ></dialogs>
      </div>
      <div>
        <dialog-edit
          v-if="showDialog"
          ref="dialogDetail"
          :title="titleEdit"
          :dialogWidth="dialogWidth"
          :dialog-data="dialogData"
        ></dialog-edit>
      </div>
      <div>
        <dialog-import
          v-if="showImports"
          ref="dialogImport"
          :title="titleImport"
          :dialogWidth="dialogWidth"
          :dialog-data="dialogData"
        ></dialog-import>
      </div>
    </el-row>
  </div>
</template>
<script>
import normalTable from '@/components/Table/index'
import pageNation from '@/components/PageNation/pagenation.vue'
import dialogs from '@/views/system/user/dialog/adduser'
import dialogEdit from '@/views/system/user/dialog/edituser'
import dialogImport from '@/views/system/user/dialog/importData'
// import { saveAs } from 'file-saver'
export default {
  components: {
    normalTable,
    pageNation,
    dialogs,
    dialogEdit,
    dialogImport
  },
  data() {
    return {
      filterDept: '',
      query: {
        loginName: '',
        userName: '',
        userStatus: '',
        userPhone: ''
      },
      //tree data
      data2: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2',
              children: [
                {
                  id: 10,
                  label: '三级 2-1'
                }
              ]
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ],
      //按照id默认展示节点
      idArr: [3, 2],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      //状态筛选
      statusOptions: [
        {
          value: 'active',
          label: '激活'
        },
        {
          value: 'locking',
          label: '禁用'
        }
      ],
      //左侧操作按钮
      operationButton: [
        {
          value: 'add',
          title: '新增',
          icons: 'el-icon-plus',
          id: 'add',
          disabled: false,
          color: '#409eff',
          fun: () => {
            return this.add()
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
          value: 'import',
          title: '导入',
          icons: 'el-icon-delete',
          id: 'import',
          disabled: false,
          color: '#409eff',
          fun: () => {
            return this.imports()
          }
        },
        {
          value: 'export',
          title: '导出',
          icons: 'el-icon-download',
          id: 'export',
          disabled: false,
          color: '#409eff',
          fun: () => {
            return this.export()
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
      //右侧操作按钮
      refreshButton: [
        {
          value: 'search',
          title: '搜索',
          icons: 'el-icon-search',
          id: 'search',
          fun: () => {
            return this.search()
          }
        },
        {
          value: 'refresh',
          title: '搜索',
          icons: 'el-icon-refresh',
          id: 'refresh',
          fun: () => {
            // return this.refresh()
          }
        },
        {
          value: 'grid',
          title: '搜索',
          icons: 'el-icon-s-grid',
          id: 'grid',
          fun: () => {
            // return this.refresh()
          }
        }
      ],
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
      //分页
      currentPage: 1,
      formLabelWidth: '120px',
      //添加弹框开关
      visible: false,
      showDialog: false,
      showImports: false,
      title: '新增用户',
      titleEdit: '编辑用户',
      titleImport: '导入',
      dialogWidth: '720px',
      dialogData: [],
      //分页数据
      filter: {
        page: 1,
        pagesize: 15
      }
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
    }
  },
  watch: {
    //监听部分搜索
    filterDept(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    //数据
    this.tableData = [
      {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        phone: '13544542345',
        mobile: '010-6452374',
        password: 'AAAaaa123',
        confirmword: 'AAAaaa123',
        email: '3416371@qq.com',
        gender: '男',
        enabled: 'a',
        role: [
          {
            id: 1,
            name: 'aaa'
          },
          {
            id: 2,
            name: 'bbb'
          },
          {
            id: 3,
            name: 'ccc'
          }
        ],
        optId: {
          id: 1,
          lable: '总公司',
          children: [
            {
              id: 2,
              lable: '分公司'
            }
          ]
        }
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
  },
  methods: {
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
    //搜索tree
    filterNode(value, data) {
      console.log(value, 999999)
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    //状态筛选
    userSelect(item) {
      console.log(this.query.filterText, item, '状态筛选')
    },
    //搜索 search
    searchAll() {
      console.log(this.query, 88888)
    },
    //重置页面，清空数据
    userReset() {
      console.log('清空数据')
    },
    //搜索tree,搜索树
    getDeptDatas() {
      console.log('搜索部分')
    },
    //新增
    add() {
      this.visible = true
      console.log(this.$refs.dialogForm, 9999)
    },
    //搜索
    search() {
      console.log('search')
    },
    //批量操作
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
        } else if (this.multipleSelection.length > 1) {
          if (res.value === 'edit') {
            res.disabled = true
          }
          if (res.value === 'delete') {
            res.disabled = false
          }
        }
      })
    },
    //修改
    handleEdit(item, content) {
      if (content) {
        this.dialogData.push(content)
      } else {
        console.log(this.multipleSelection, 9999)
      }
      this.showDialog = true
      this.$nextTick(() => {
        this.$refs['dialogDetail'].showDialog = true
      })
    },
    //删除
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
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'success',
            message: '取消删除'
          })
        })
    },
    //禁用
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
    //导入
    imports() {
      this.showImports = true
      this.$nextTick(() => {
        this.$refs['dialogImport'].showImports = true
      })
    },
    export2Excel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require('../lib/Export2Excel.js')
        const tHeader = ['组名', '创建时间'] //自定义列名
        const filterVal = ['title', 'create_date'] //对应自怼
        const list = ['123123123'] //table数据
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '列表excel') //导出文件名称
      })
    },
    formatJson(filterVal, jsonData) {
      console.info(jsonData)
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    //导出
    export() {
      var title =
        this.multipleSelection.length !== 0
          ? `是否导出所选${this.multipleSelection.length}条数据?`
          : '是否导出全部数据？'
      this.$confirm(title, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.export2Excel()
          // //new Blob([res]加载返回来的数据
          // let blob = new Blob(['helow'], {
          //   type: 'application/json;charset=UTF-8'
          // })
          // saveAs(blob, 'SLA-报告' + +new Date() + '.xlsx')
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '提示'
          })
        })
    },
    //改变状态
    changeStatus(item) {
      console.log(item)
    },
    //分页
    pageChange(type, val) {
      if (type === 'num') {
        console.log(val, '条数')
      } else if (type === 'page') {
        console.log(val, '页数')
      }
    }
  }
}
</script>
<style scoped lang="scss">
.system-user {
  box-sizing: border-box;
  .system-user-left {
    padding-right: 24px;
  }
  .system-user-head {
    box-sizing: border-box;
    padding: 24px 0;
    display: flex;
    align-items: center;
    div {
      display: flex;
      align-items: center;
      label {
        font-family: MicrosoftYaHei;
        padding-right: 5px;
        color: rgba(0, 0, 0, 0.85);
      }
    }
    /deep/.el-input__inner {
      height: 30px;
      line-height: 30px;
      border-radius: 2px;
      border: 1px solid rgba(228, 228, 228, 1);
      padding-left: 9px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: rgba(0, 0, 0, 0.85);
    }
  }
  .system-user-tree {
    padding-bottom: 0px;
    .el-input {
      margin-right: -10px;
    }
  }
}
</style>
<style lang="scss">
//选择框tree样式
.vue-treeselect__control {
  height: 30px;
  line-height: 30px;
  align-items: center;
  border-radius: 2px;
}
.vue-treeselect--searchable .vue-treeselect__input-container {
  padding-left: 0px;
  padding-right: 0px;
}
.vue-treeselect__placeholder {
  line-height: 30px;
  padding-left: 4px;
  padding-right: 0px;
}
</style>

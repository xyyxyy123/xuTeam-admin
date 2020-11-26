<template>
  <div class="system-dept">
    <el-row>
      <el-col :span="5" class="system-dept-left">
        <div class="system-left-title">组织机构</div>
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
          ref="tree"
          :filter-node-method="filterNode"
        >
        </el-tree>
      </el-col>
      <el-col :span="19">
        <div class="system-left-title">机构列表</div>
        <article style="margin-right:25px;">
          <normal-table
            :table-obj="tableObj"
            :loading="false"
            :showOverflowTooltip="true"
          ></normal-table>
          <page-nation
            style="margin-top:24px;text-align: right;"
            @pageChange="pageChange"
            :pagination="pagination"
          ></page-nation>
        </article>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import normalTable from '@/components/Table/index'
import pageNation from '@/components/PageNation/pagenation.vue'

export default {
  components: {
    pageNation,
    normalTable
  },
  data() {
    return {
      filterDept: '',
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
              label: '二级 2-2'
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
      defaultProps: {
        children: 'children',
        label: 'label'
      },
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
      }
    }
  },
  watch: {
    //监听部分搜索
    filterDept(val) {
      this.$refs.tree.filter(val)
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
          columnType: '',
          headerCellStyle: { background: 'rgba(246,246,246,1)' }
        },
        operation: {
          show: false
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

    this.tableData.forEach(element => {
      // 方法二遍历回来的数据，插入操作
      console.log(element)
    })
  },
  methods: {
    //搜索tree
    filterNode(value, data) {
      console.log(value, 999999)
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    //搜索tree,搜索树
    getDeptDatas() {
      console.log('搜索部分')
    },
    //分页
    pageChange() {}
  }
}
</script>
<style scoped lang="scss">
.system-dept {
  box-sizing: border-box;
  .system-dept-left {
    padding-right: 24px;
  }
  .system-left-title {
    padding: 24px 0;
    font-size: 16px;
    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.65);
  }
  .system-user-head {
    box-sizing: border-box;
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
}
</style>

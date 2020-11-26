<template>
  <div>
    <!-- 案例引用 -->
    <normal-table
      :table-obj="tableObj"
      :loading="false"
      @selectChange="selectChange"
      @filterChange="filterChange"
      @sortChange="sortChange"
      :showOverflowTooltip="showOverflowTooltip"
    >
    </normal-table>
  </div>
</template>
<script>
import NormalTable from '@/components/Table/index.vue'
export default {
  data() {
    return {
      loading: false,
      userList: [],
      options: [
        {
          prop: 'eventid',
          label: '事件ID',
          path: '/system/user'
          //   sortable: 'custom'
          //   sortProp: true
        },
        {
          prop: 'status',
          label: '状态'
          //   selectOptions: [
          //     { text: '未处理', value: 'in' },
          //     { text: '已处理', value: 'out' }
          //   ],
          //   filterMultiple: false
        },
        {
          prop: 'object',
          label: '对象'
        },
        {
          prop: 'time',
          label: '时间'
          //   sortProp: true
        },
        {
          prop: 'duration',
          label: '周期'
        }
      ],
      changeData: [],
      showOverflowTooltip: true
    }
  },
  components: {
    NormalTable
  },
  computed: {
    tableObj() {
      let table = {
        data: this.userList,
        options: this.options,
        config: {
          dragable: false,
          showHeader: true,
          columnType: 'selection',
          headerCellStyle: { background: 'rgba(246,246,246,1)' }
        },
        operation: {
          show: this.userList.length > 0
        }
      }
      return table
    }
  },
  mounted() {
    this.userList = [
      {
        eventid: '34901',
        status: '未处理',
        ruleid: '其它',
        object: 'Ceph集群',
        time: '1543890707',
        duration: '443998532',
        subject: 'Network dropped packets on eth1 trigger',
        disabled: true
      },
      {
        eventid: '34905',
        status: '未处理',
        ruleid: '其它',
        object: 'Ceph集群',
        time: '1543890707',
        duration: '443998532',
        subject: 'Network dropped packets on eth1 trigger'
      },
      {
        eventid: '34905',
        status: '未处理',
        ruleid: '其它',
        object: 'Ceph集群',
        time: '1543890707',
        duration: '443998532',
        subject: 'Network dropped packets on eth1 trigger'
      },
      {
        eventid: '34905',
        status: '未处理',
        ruleid: '其它',
        object: 'Ceph集群',
        time: '1543890707',
        duration: '443998532',
        subject: 'Network dropped packets on eth1 trigger'
      },
      {
        eventid: '34905',
        status: '未处理',
        ruleid: '其它',
        object: 'Ceph集群',
        time: '1543890707',
        duration: '443998532',
        subject: 'Network dropped packets on eth1 trigger'
      },
      {
        eventid: '34904',
        status: '已处理',
        ruleid: '其它',
        object: 'Ceph集群',
        time: '1543890657',
        duration: '35317717',
        subject: 'Network dropped packets on eth1 trigger'
      },
      {
        eventid: '34903',
        status: '未处理',
        ruleid: '其它',
        object: 'Ceph集群',
        time: '1543890626',
        duration: '469928548',
        subject: 'Network dropped packets on eth1 trigger'
      },
      {
        eventid: '34903',
        status: '未处理',
        ruleid: '其它',
        object: 'Ceph集群',
        time: '1543890626',
        duration: '469928548',
        subject: 'Network dropped packets on eth1 trigger'
      }
    ]
    //获取回来的数据处理
    this.userList.forEach(element => {
      // 方法二遍历回来的数据，插入操作
      this.addOperation(element)
      let item = {}
      item = Object.assign({ selectable: true, disabled: true })
      if (element.eventid === '34901') {
        element = Object.assign(element, item)
      }
    })
  },
  methods: {
    // 操作
    addOperation(data) {
      let operation = [
        {
          value: '禁用',
          id: 'enable',
          disabled: false,
          color: 'rgba(64,158,255,0.8)',
          fun: data => {
            return this.edit(data)
          }
        },
        {
          value: '编辑',
          id: 'edit',
          disabled: true,
          color: 'rgba(64,158,255,0.8)',
          fun: data => {
            return this.delete(data)
          }
        },
        {
          value: '删除',
          id: 'delete',
          disabled: false,
          color: 'rgba(255,99,99,0.8)',
          fun: data => {
            return this.delete(data)
          }
        }
      ]
      this.$set(data, 'operation', operation)
    },
    // 多选
    selectChange(val) {
      this.changeData = val
    },
    // 筛选
    filterChange(val) {
      console.log(val, 542735428)
    },
    // 排序
    sortChange(val) {
      console.log(val)
    },
    // 编辑
    edit(data) {
      console.log('编辑', data)
    },
    // 删除
    delete() {
      console.log('删除')
    },
    // 分页
    pagingChange(type, val) {
      console.log(type, val, 8888)
    }
  }
}
</script>

<template>
    <div>
        <!-- 案例引用 -->
        <dash-table
          :table-obj="tableObj"
          :loading="false"
          @selectChange="selectChange"
          @filterChange="filterChange"
          @sortChange="sortChange"
          :Pagination="Pagination"
          @pagingEvent="pagingChange"
          :showOverflowTooltip="showOverflowTooltip"
          >
        </dash-table>
    </div>
</template>
<script>
import DashTable from '@/components/table'
export default {
  data () {
    return {
      loading: false,
      userList: [],
      options: [
        {
          prop: 'eventid',
          label: '事件ID',
          sortable: 'custom',
          sortProp: true,
          minWidth: 100
        },
        {
          prop: 'status',
          label: '状态',
          selectOptions: [{ text: '未处理', value: 'in' }, { text: '已处理', value: 'out' }],
          filterMultiple: false
        },
        {
          prop: 'object',
          label: '对象'
        },
        {
          prop: 'time',
          label: '时间',
          sortProp: true
        },
        {
          prop: 'duration',
          label: '周期'
        }
      ],
      changeData: [],
      Pagination: {
        'pagingData': [10, 20, 50],
        'total': 20,
        'show': true
      },
      showOverflowTooltip: true
    }
  },
  components: {
    DashTable
  },
  computed: {
    tableObj () {
      let table = {
        data: this.userList,
        options: this.options,
        config: {
          dragable: true,
          showHeader: true,
          columnType: 'selection'
        },
        operation: {
          show: this.userList.length > 0,
          showNum: 1 // 操作显示几个
        }
      }
      return table
    }
  },
  mounted () {
    this.userList = [
      {
        'eventid': '34905',
        'status': '未处理',
        'ruleid': '其它',
        'object': 'Ceph集群',
        'time': '1543890707',
        'duration': '443998532',
        'subject': 'Network dropped packets on eth1 trigger'
      },
      {
        'eventid': '34905',
        'status': '未处理',
        'ruleid': '其它',
        'object': 'Ceph集群',
        'time': '1543890707',
        'duration': '443998532',
        'subject': 'Network dropped packets on eth1 trigger'
      },
      {
        'eventid': '34905',
        'status': '未处理',
        'ruleid': '其它',
        'object': 'Ceph集群',
        'time': '1543890707',
        'duration': '443998532',
        'subject': 'Network dropped packets on eth1 trigger'
      },
      {
        'eventid': '34905',
        'status': '未处理',
        'ruleid': '其它',
        'object': 'Ceph集群',
        'time': '1543890707',
        'duration': '443998532',
        'subject': 'Network dropped packets on eth1 trigger'
      },
      {
        'eventid': '34905',
        'status': '未处理',
        'ruleid': '其它',
        'object': 'Ceph集群',
        'time': '1543890707',
        'duration': '443998532',
        'subject': 'Network dropped packets on eth1 trigger'
      },
      {
        'eventid': '34904',
        'status': '已处理',
        'ruleid': '其它',
        'object': 'Ceph集群',
        'time': '1543890657',
        'duration': '35317717',
        'subject': 'Network dropped packets on eth1 trigger'
      }, {
        'eventid': '34903',
        'status': '未处理',
        'ruleid': '其它',
        'object': 'Ceph集群',
        'time': '1543890626',
        'duration': '469928548',
        'subject': 'Network dropped packets on eth1 trigger'
      },
      {
        'eventid': '34903',
        'status': '未处理',
        'ruleid': '其它',
        'object': 'Ceph集群',
        'time': '1543890626',
        'duration': '469928548',
        'subject': 'Network dropped packets on eth1 trigger'
      }]

    this.userList.forEach(element => {
      // 方法二遍历回来的数据，插入操作
      this.addOperation(element)
    })
  },
  methods: {
    // 操作
    addOperation (data) {
      let operation = [{
        value: '编辑',
        id: 'running',
        disabled: false,
        fun: (data) => {
          return this.edit(data)
        }
      }, {
        value: '删除1',
        id: 'finish1',
        disabled: true,
        fun: (data) => {
          return this.delete(data)
        }
      }, {
        value: '删除2',
        id: 'finish2',
        disabled: false,
        fun: (data) => {
          return this.delete(data)
        }
      }
      ]
      this.$set(data, 'operation', operation)
    },
    // 多选
    selectChange (val) {
      this.changeData = val
    },
    // 筛选
    filterChange (val) {
      console.log(val, 542735428)
    },
    // 排序
    sortChange (val) {
      console.log(val)
    },
    // 编辑
    edit (data) { console.log('编辑', data) },
    // 删除
    delete () { console.log('删除') },
    // 分页
    pagingChange (type, val) {
      console.log(type, val, 8888)
    }
  }
}
</script>

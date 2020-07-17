<template>
    <div>
        <!-- 案例引用 -->
        <dash-table
          :table-obj="tableObj"
          :loading="false"
          @selectChange="selectChange"
          @filterChange="filterChange"
          @sortChange="sortChange"
          :OperationEvents="Operation"
          >
        </dash-table>
    </div>
</template>
<script>
import DashTable from '@/components/table'
export default {
  data () {
    return {
      userList: [
      ],
      options: [
        {
          prop: 'eventid',
          label: '事件ID',
          sortable: 'custom'
        },
        {
          prop: 'status',
          label: '状态'
        },
        {
          prop: 'object',
          label: '对象'
        },
        {
          prop: 'time',
          label: '时间'
        },
        {
          prop: 'duration',
          label: '周期'
        }
      ],
      changeData: [],
      Operation: [
        {
          title: '编辑',
          value: '编辑',
          disabled: '',
          fun: () => {
            return this.edit()
          }
        },
        {
          title: '删除',
          value: '删除',
          disabled: '',
          fun: () => {
            return this.delete()
          }
        }
      ]
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
          show: true
        // showNum: 1 // 操作显示几个
        //   show: this.newOperation.length > 0
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
      }, {
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
    // 返回来的数据添加操作 方法一：把this.Operation提取出来添加，额外传入参数
    this.$set(this.userList, 'operation', this.Operation)
  },
  methods: {
    selectChange (val) {
      this.changeData = val
    },
    filterChange (val) {
      console.log(val)
    },
    sortChange (val) {
      console.log(val)
    },
    edit () { console.log('编辑') },
    delete () { console.log('删除') }
  }
}
</script>

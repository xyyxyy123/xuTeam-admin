<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!-- 侧边部门数据+搜索 -->
      <el-col :xs="9" :sm="6" :md="5" :lg="4" :xl="4">
        <div class="head-container">
          <el-input
            v-model="deptName"
            clearable
            size="small"
            placeholder="输入部门名称搜索"
            prefix-icon="el-icon-search"
            class="filter-item"
            @input="getDeptDatas"
          />
        </div>
        <el-tree
          :data="deptDatas"
          :load="getDeptDatas"
          :props="defaultProps"
          :expand-on-click-node="false"
          lazy
          @node-click="handleNodeClick"
        />
      </el-col>
      <!-- 搜索框+按钮+用户列表+分页 -->
      <el-col :xs="15" :sm="18" :md="19" :lg="20" :xl="20">
        <div class="head-container">
          搜索框+按钮+用户列表+分页
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getSms } from '@/api/login'

export default {
  name: 'demo',
  data() {
    return {
      deptName: '事业部',
      deptDatas: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'leaf'
      }
    }
  },
  methods: {
    getDeptDatas(node, resolve) {
      const sort = 'id,desc'
      const params = { sort: sort }
      if (typeof node !== 'object') {
        if (node) {
          params['name'] = node
        }
      } else {
        params['pid'] = node.data.id
      }

      console.log(getSms())
      // setTimeout(() => {
      //   console.log(getSms())
      // })
    },
    handleNodeClick() {
      return null
    }
  }
}
</script>

<style lang="sass"></style>

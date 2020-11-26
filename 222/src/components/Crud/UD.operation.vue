<template>
  <div>
    <el-button
      class="operation-btn"
      v-permission="permission.edit"
      :loading="crud.status.cu === 2"
      :disabled="disabledEdit"
      style="color: rgba(64,158,255,0.8)"
      @click="crud.toEdit(data)"
      >修改</el-button
    >
    <el-button
      class="operation-btn"
      v-permission="permission.invalid"
      :disabled="disabledInvalid"
      style="color: rgba(64,158,255,0.8)"
      :loading="crud.dataStatus[crud.getDataId(data)].invalid === 2"
      @click="toInvalid(data)"
      >禁用</el-button
    >
    <el-button
      class="operation-btn"
      v-permission="permission.del"
      :disabled="disabledDle"
      style="color: rgba(255,99,99,0.8)"
      :loading="crud.dataStatus[crud.getDataId(data)].delete === 2"
      @click="toDelete(data)"
      >删除</el-button
    >
  </div>
</template>
<script>
import CRUD, { crud } from '@crud/crud'
export default {
  mixins: [crud()],
  props: {
    data: {
      type: Object,
      required: true
    },
    permission: {
      type: Object,
      required: true
    },
    disabledEdit: {
      type: Boolean,
      default: false
    },
    disabledInvalid: {
      type: Boolean,
      default: false
    },
    disabledDle: {
      type: Boolean,
      default: false
    },
    msg: {
      type: String,
      default: '确定删除本条数据吗？'
    },
    invalidMsg: {
      type: String,
      default: '确定禁用本条数据吗？'
    }
  },
  data() {
    return {
      invalidPop: false,
      deletePop: false
    }
  },
  methods: {
    toDelete(data) {
      this.$confirm('确定“删除”所选数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          crud.doDelete(data)
          //删除成功的接口
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.crud.cancelDelete(data)
          this.$message({
            type: 'success',
            message: '取消删除'
          })
        })
    },
    [CRUD.HOOK.afterDelete](crud, data) {
      if (data === this.data) {
        this.deletePop = false
      }
    },
    toInvalid(data) {
      this.$confirm('确定“禁用”所选数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          crud.doInvalid(data)
          //禁用成功的接口
          this.$message({
            type: 'success',
            message: '禁用成功!'
          })
        })
        .catch(() => {
          this.crud.cancelInvalid(data)
          this.$message({
            type: 'success',
            message: '取消禁用'
          })
        })
    },
    [CRUD.HOOK.afterInvalid](crud, data) {
      if (data === this.data) {
        this.invalidPop = false
      }
    }
  }
}
</script>

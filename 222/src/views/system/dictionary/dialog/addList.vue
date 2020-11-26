<template>
  <transition name="dialog-fade" class="dialogForm">
    <el-dialog
      v-if="showDialog"
      :title="title"
      :visible.sync="showDialog"
      :lock-scroll="true"
      :width="dialogWidth"
      @click="closeDialog"
      :before-close="handleDialogClose"
    >
      <el-form
        :model="dialogForm"
        :rules="rules"
        ref="dialogForm"
        size="small"
        label-width="70px"
        class="dialog-form"
      >
        <el-form-item label="字典名称" prop="name">
          <el-input placeholder="请输入" v-model="dialogForm.name" />
        </el-form-item>
        <el-form-item label="描述" prop="describe">
          <el-input
            placeholder="请勿超出255个字符，最多85个汉字"
            type="textarea"
            v-model="dialogForm.describe"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="info" plain @click="closeDialog">取 消</el-button>
        <el-button plain type="info" @click="submitForm(dialogForm)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </transition>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '提示'
    },
    dialogWidth: {
      type: String,
      default: ''
    },
    dialogData: {
      type: Array,
      default: () => {}
    },
    dialogStatus: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showDialog: false,
      //弹框变量
      dialogForm: {
        name: '',
        describe: ''
      },
      rules: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          //添加数据的接口
          console.log(this.dialogForm, 999)
          //关闭弹框
          this.showDialog = false
          //清空弹框数据
          this.closeDialog()
        } else {
          return false
        }
      })
    },
    // 取消弹框
    closeDialog() {
      this.$refs['dialogForm'].resetFields()
      this.showDialog = false
      this.$emit('closeDialog')
    },
    //x关闭弹框
    handleDialogClose() {
      this.$refs['dialogForm'].resetFields()
      this.showDialog = false
      this.$emit('closeDialog')
    }
  },
  mounted() {
    if (this.dialogStatus === 'edit') {
      this.dialogData.forEach(res => {
        this.dialogForm.name = res.name
        this.dialogForm.describe = res.address
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.dialogForm {
  .dialog-form {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      margin-left: 16px;
      .el-input {
        width: 585px;
      }
    }
    .el-form-item--small.el-form-item {
      margin-bottom: 24px;
    }
    .el-textarea {
      width: 585px;
    }
    /deep/.el-textarea__inner {
      padding-left: 9px;
    }
  }
  /deep/.el-input__inner {
    height: 30px;
    line-height: 30px;
    border-radius: 2px;
    border: 1px solid rgba(228, 228, 228, 1);
    padding-left: 9px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
  }
}
</style>

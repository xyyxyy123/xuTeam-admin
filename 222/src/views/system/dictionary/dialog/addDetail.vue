<template>
  <transition name="dialog-fade">
    <el-dialog
      :title="title"
      :visible.sync="showDialogDetail"
      :lock-scroll="true"
      :width="dialogWidth"
      @click="closeDialogDetail"
      :before-close="handleDialogClose"
      class="dialogFormDetail"
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
          <el-input
            placeholder="请输入"
            style=" width: 585px;"
            v-model="dialogForm.name"
          />
        </el-form-item>
        <el-form-item label="字典值" prop="dicvalue">
          <el-input
            placeholder="请输入"
            style=" width: 258px;"
            v-model="dialogForm.dicvalue"
          />
        </el-form-item>
        <el-form-item label="排序" prop="dicsort">
          <el-input
            placeholder="请输入"
            style=" width: 258px;"
            v-model="dialogForm.dicsort"
          />
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
        <el-button type="info" plain @click="closeDialogDetail"
          >取 消</el-button
        >
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
      showDialogDetail: false,
      //弹框变量
      dialogForm: {
        name: '',
        describe: '',
        dicsort: '',
        dicvalue: ''
      },
      rules: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        dicsort: [{ required: true, message: '请输入', trigger: 'blur' }],
        dicvalue: [{ required: true, message: '请输入', trigger: 'blur' }]
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
          this.showDialogDetail = false
          //清空弹框数据
          this.closeDialogDetail()
        } else {
          return false
        }
      })
    },
    // 取消弹框
    closeDialogDetail() {
      this.$refs['dialogForm'].resetFields()
      this.showDialogDetail = false
      this.$emit('closeDialogDetail')
    },
    //x关闭弹框
    handleDialogClose() {
      this.$refs['dialogForm'].resetFields()
      this.showDialogDetail = false
      this.$emit('closeDialogDetail')
    }
  },
  mounted() {
    if (this.dialogStatus === 'edit') {
      this.dialogData.forEach(res => {
        this.dialogForm.name = res.name
        this.dialogForm.describe = res.address
        this.dialogForm.dicsort = res.name
        this.dialogForm.dicvalue = res.address
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.dialogFormDetail {
  .dialog-form {
    display: flex;
    flex-wrap: wrap;
    // .el-form-item {
    //   margin-left: 16px;
    // }
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

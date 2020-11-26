<template>
  <div class="dialogForm">
    <el-dialog
      :title="title"
      :visible.sync="dialogTableVisible"
      :lock-scroll="true"
      :width="dialogWidth"
      @close="OnClose()"
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
        <el-form-item label="登录名" prop="loginame">
          <el-input
            placeholder="数字、字母、下划线组合"
            v-model="dialogForm.loginame"
          />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入" v-model="dialogForm.name" />
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input placeholder="请输入" v-model.number="dialogForm.mobile" />
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input placeholder="请输入" v-model.number="dialogForm.phone" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            placeholder="请输入,若不修改,请留空"
            v-model.number="dialogForm.password"
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmword">
          <el-input
            type="password"
            placeholder="请输入,若不修改,请留空"
            v-model.number="dialogForm.confirmword"
          />
        </el-form-item>
        <el-form-item label="归属机构" prop="value">
          <Treeselect
            v-model="dialogForm.value"
            :options="deptoptions"
            :default-expand-level="1"
            style="width: 250px;"
            placeholder="请选择"
          />
        </el-form-item>
        <el-form-item label="邮箱地址" prop="email">
          <el-input placeholder="请输入" v-model="dialogForm.email" />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="dialogForm.gender" style="width: 250px">
            <el-radio label="male">男</el-radio>
            <el-radio label="female">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="dialogForm.enabled">
            <el-radio
              v-for="item in user_status"
              :key="item.id"
              :label="item.value"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="角色" prop="roles">
          <el-select
            v-model="dialogForm.roles"
            multiple
            style="width: 583px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in roles"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="info" plain @click="closeDialog">取 消</el-button>
        <el-button plain type="info" @click="editData(dialogForm)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { validName, validPhone, validPassword } from '@/utils/validate.js'
export default {
  components: {
    Treeselect
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
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
    }
  },
  data() {
    const isvalidPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入电话号码'))
      } else if (!validPhone(value)) {
        callback(new Error('请输入正确的11位手机号码'))
      } else {
        callback()
      }
    }
    const isvalidLoginName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入'))
      } else if (value.length > 20) {
        callback(new Error('超出字符限制，请重新输入'))
      } else if (!validName(value)) {
        callback(new Error('格式不正确，请重新输入'))
      } else {
        callback()
      }
    }
    const isvalidName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入'))
      } else if (value.length > 50) {
        callback(new Error('超出字符限制，请重新输入'))
      } else {
        callback()
      }
    }
    const isvalidPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入'))
      } else if (!validPassword(value)) {
        callback(new Error('密码包含大/小写字母、数字、特殊字符任意三种'))
      } else if (value.length < 8) {
        callback(new Error('长度不少于8位'))
      } else {
        callback()
      }
    }
    const isvalidConWord = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入'))
      } else if (this.dialogForm.password !== value) {
        callback(new Error('必须与密码一致'))
      } else {
        callback()
      }
    }
    return {
      dialogTableVisible: this.visible,
      //弹框变量
      dialogForm: {
        loginame: 'itw_itw123',
        name: 'itw',
        mobile: '13544356512',
        phone: '010-6233123',
        password: 'ABCabc123',
        confirmword: 'ABCabc123',
        value: null,
        email: '457234@qq.com',
        gender: 'male',
        enabled: '0',
        roles: ''
      },
      user_status: [
        {
          label: '启用',
          value: '0'
        },
        {
          label: '禁用',
          value: '1'
        }
      ],
      roles: [
        {
          value: '1',
          label: '黄金糕'
        },
        {
          value: '2',
          label: '双皮奶'
        }
      ],
      deptoptions: [
        {
          id: 'a',
          label: 'a',
          children: [
            {
              id: 'aa',
              label: 'aa'
            },
            {
              id: 'ab',
              label: 'ab'
            }
          ]
        },
        {
          id: 'b',
          label: 'b'
        },
        {
          id: 'c',
          label: 'c'
        }
      ],
      rules: {
        loginame: [
          { required: true, trigger: 'blur', validator: isvalidLoginName }
        ],
        name: [{ required: true, trigger: 'blur', validator: isvalidName }],
        mobile: [{ required: true, validator: isvalidPhone, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', validator: isvalidPass }],
        confirmword: [
          {
            required: true,
            trigger: 'blur',
            validator: isvalidConWord
          }
        ],
        dept: [{ required: true, message: '请选择', trigger: 'blur' }],
        roles: [{ required: true, message: '请选择', trigger: 'blur' }]
      }
    }
  },
  watch: {
    visible: {
      // 监听这个对象中的每一个属性变化
      immediate: true,
      handler(val) {
        this.dialogTableVisible = val
      }
    }
  },
  methods: {
    //关闭
    OnClose() {
      //直接修改visible为false.
      this.$emit('update:visible', false)
    },
    editData() {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          //添加数据的接口
          console.log(this.dialogForm.value, 99999)
          console.log(this.dialogForm.role, 99999)
          console.log(this.dialogForm, 999)
          //关闭弹框,清除数据
          this.closeDialog()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    closeDialog() {
      this.$refs.dialogForm.resetFields()
      this.dialogTableVisible = false
    },
    handleDialogClose() {
      this.$refs.dialogForm.resetFields()
      this.dialogTableVisible = false
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
        width: 248px;
      }
    }
    .el-form-item--small.el-form-item {
      margin-bottom: 24px;
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

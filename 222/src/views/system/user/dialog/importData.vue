<template>
  <transition name="dialog-fade">
    <el-dialog
      v-if="showImports"
      :title="title"
      :visible.sync="showImports"
      :lock-scroll="true"
      :width="dialogWidth"
      :before-close="handleDialogClose"
      class="dialogForm"
    >
      <div class="dialog-upload">
        <el-upload
          class="upload-demo"
          :multiple="false"
          ref="upload"
          :http-request="httpRequest"
          :on-change="handleChange"
          :on-success="loadSuccess"
          :on-error="loadError"
          :on-remove="handleRemove"
          :before-upload="validate"
          :file-list="fileList"
          :limit="1"
          action
        >
          <el-button size="small" class="btn">
            选择文件
          </el-button>
        </el-upload>
        <el-tooltip placement="top">
          <div slot="content">{{ fileTitle }}</div>
          <div style="display:flex;cursor: pointer;">
            <article>
              {{ fileTitle }}
            </article>
            <p style="padding-left:-15px;">{{ suffix }}</p>
          </div>
        </el-tooltip>
      </div>
      <div class="header-container-bottom button">
        <div class="header-container-btn">
          <el-button
            size="small"
            style="background-color:#409eff;"
            :class="'active'"
            @click="confirm"
          >
            导入
          </el-button>
        </div>
        <a href="">下载文件</a>
      </div>
      <div slot="footer" class="dialog-footer">
        <p>导入文件不能超过5M，仅允许导入“xls”或“xlsx”格式文件！</p>
      </div>
    </el-dialog>
  </transition>
</template>
<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: '提示'
    },
    dialogWidth: {
      type: String,
      default: '720px'
    },
    dialogData: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
      showImports: false,
      fileState: true,
      fileList: [],
      //文件的显示名称
      filetitle:
        '默认文件超出长度默认文件超出长度默认文件超出长度默认文件超出长度默认文件超出长度默认文件超出长度默认文件超出长度.xls'
    }
  },
  computed: {
    //文件名
    fileTitle() {
      let str = ''
      let titlearr = this.filetitle.split('.')
      str = titlearr[0]
      return str
    },
    //文件名后缀
    suffix() {
      let titlearr = this.filetitle.split('.')
      return `.${titlearr[1]}`
    }
  },
  methods: {
    handleDialogClose() {
      this.showImports = false
    },
    // 改变时发生的状态,上传显示文件名
    handleChange(file, fileList) {
      this.fileList = fileList
      this.fileList.forEach(res => {
        this.filetitle = res.name
      })
    },
    // 提交成功
    loadSuccess(file, fileList) {
      console.log(file, fileList, 9)
    },
    //  提交失败
    loadError(file, fileList) {
      console.log(file, fileList)
    },
    // 文件移除
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    //接口上传
    httpRequest(e) {
      console.log(e) // e->upload组件所有参数 接口
      //   var formdata = new FormData()
      //   formdata.append('file', e.file)
      //   let data = formdata
      //   let type = {
      //     type: this.name
      //   }
      //接口
    },
    //导入
    confirm() {
      if (this.fileState) {
        this.$message({
          type: 'error',
          message: '导入未成功'
        })
        return
      }
      this.$root.handle('confirm')
    },
    // 文件提交成功前对文件格式的设置
    validate(file) {
      console.log(file.type, 888888)
      if (file.type === 'xls' || file.type === 'xlsx') {
        this.fileState = false
      } else {
        this.fileState = true
        return false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.dialogForm {
  .dialog-upload {
    display: flex;
    align-items: center;
    article {
      padding-left: 10px;
      max-width: 500px; //最大值,内容达不到则自适应宽度
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .btn {
      width: 96px;
    }
    .btn:focus {
      color: rgba(0, 0, 0, 0.85) !important;
      border: 1px solid rgba(228, 228, 228, 1) !important;
      background: #fff !important;
      outline: 0;
    }
  }
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 24px 0;
  }
  /deep/.el-dialog__footer {
    padding: 0 !important;
    border-top: 1px solid #e4e4e4;
    box-sizing: border-box;
    text-align: left;
    p {
      padding: 18px 25px;
      color: rgba(0, 0, 0, 0.65);
    }
  }
}
</style>

<template>
  <div class="app-container">
    <el-row :gutter="20" class="header-container-top">
      <el-col :span="7" class="pr12">
        <label class="w4">菜单标题</label>
        <el-input
          v-model="query.name"
          clearable
          size="small"
          placeholder="标题"
          class="filter-item"
          @keyup.enter.native="crud.toQuery"
        />
      </el-col>
      <el-col :span="17" style="padding-left:12px;">
        <label class="el-form-item-label"><rrOperation /></label>
      </el-col>
    </el-row>
    <crudOperation :permission="permission" />
    <el-dialog
      append-to-body
      :close-on-click-modal="false"
      :before-close="crud.cancelCU"
      :visible.sync="crud.status.cu > 0"
      :title="crud.status.title"
      width="580px"
    >
      <el-form
        ref="form"
        :inline="true"
        :model="form"
        :rules="rules"
        size="small"
        label-width="80px"
      >
        <el-form-item label="菜单类型" prop="type" style="display:flex">
          <el-radio-group v-model="form.type" size="mini" style="174px">
            <el-radio-button label="0">目录</el-radio-button>
            <el-radio-button label="1">菜单</el-radio-button>
            <el-radio-button label="2">按钮</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-if="form.type.toString() !== '2'"
          label="菜单标题"
          prop="title"
        >
          <el-input
            v-model="form.title"
            style="width: 440px"
            placeholder="菜单标题"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="form.type.toString() !== '2'"
          label="路由地址"
          prop="path"
        >
          <el-input
            v-model="form.path"
            placeholder="路由地址"
            :style="
              form.type.toString() === '0' ? 'width: 440px' : 'width: 174px'
            "
          />
        </el-form-item>
        <el-form-item
          v-show="form.type.toString() === '0'"
          label="菜单图标"
          prop="icon"
        >
          <el-popover
            placement="bottom-start"
            width="440"
            trigger="click"
            @show="$refs['iconSelect'].reset()"
          >
            <IconSelect ref="iconSelect" @selected="selected" />
            <el-input
              slot="reference"
              v-model="form.icon"
              style="width: 174px;"
              placeholder="点击选择图标"
              readonly
            >
              <svg-icon
                v-if="form.icon"
                slot="prefix"
                :icon-class="form.icon"
                class="el-input__icon"
                style="height: 32px;width: 16px;"
              />
              <i v-else slot="prefix" class="el-icon-search el-input__icon" />
            </el-input>
          </el-popover>
        </el-form-item>
        <el-form-item
          v-if="form.type.toString() === '2'"
          label="按钮名称"
          prop="title"
        >
          <el-input
            v-model="form.title"
            placeholder="按钮名称"
            style="width: 440px"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-show="!form.iframe && form.type.toString() === '1'"
          label="组件名称"
          prop="componentName"
        >
          <el-input
            v-model="form.componentName"
            style="width: 174px;"
            placeholder="匹配组件内Name字段"
          />
        </el-form-item>
        <el-form-item
          v-show="!form.iframe && form.type.toString() === '1'"
          label="组件路径"
          prop="componentPath"
        >
          <el-input
            v-model="form.componentPath"
            style="width: 174px;"
            placeholder="组件路径"
          />
        </el-form-item>
        <el-form-item
          v-show="form.type.toString() !== '0'"
          label="权限标识"
          prop="mark"
        >
          <el-input
            v-model="form.mark"
            placeholder="权限标识"
            style="width: 174px;"
          />
        </el-form-item>
        <el-form-item label="菜单排序" prop="orderNum">
          <el-input-number
            v-model.number="form.orderNum"
            :min="0"
            :max="999"
            style="width: 174px;"
          />
        </el-form-item>
        <el-form-item
          v-show="form.type.toString() !== '2'"
          label="外链菜单"
          prop="iframe"
        >
          <el-radio-group
            v-model="form.iframe"
            size="mini"
            style="width: 174px;"
          >
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-show="form.type.toString() !== '2'"
          label="菜单可见"
          prop="hidden"
        >
          <el-radio-group
            v-model="form.hidden"
            size="mini"
            style="width: 174px;"
          >
            <el-radio :label="false">是</el-radio>
            <el-radio :label="true">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          v-show="form.type.toString() === '1'"
          label="菜单缓存"
          prop="cache"
        >
          <el-radio-group
            v-model="form.cache"
            size="mini"
            style="width: 174px;"
          >
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上级类目" prop="pid">
          <treeselect
            v-model="form.pid"
            :options="menus"
            :load-options="loadMenus"
            style="width: 440px;"
            placeholder="选择上级类目"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="info" plain @click="crud.cancelCU">取消</el-button>
        <el-button
          :loading="crud.status.cu === 2"
          type="info"
          plain
          @click="crud.submitCU"
          >确定</el-button
        >
      </div>
    </el-dialog>
    <el-table
      lazy
      :load="getMenus"
      ref="table"
      v-loading="crud.loading"
      :data="crud.data"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      :header-cell-style="tableHeaderColor"
      class="normal-table mt30 mr25"
      row-key="id"
      @select="crud.selectChange"
      @select-all="crud.selectAllChange"
      @selection-change="crud.selectionChangeHandler"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        label="菜单标题"
        width="150px"
        prop="title"
      ></el-table-column>
      <el-table-column prop="type" label="菜单类型" min-width="100px">
        <template slot-scope="scope">
          <span v-if="scope.row.type === 0">目录</span>
          <span v-else-if="scope.row.type === 1">菜单</span>
          <span v-else>按钮</span>
        </template>
      </el-table-column>
      <el-table-column prop="icon" label="图标" align="center" min-width="50px">
        <template slot-scope="scope">
          <svg-icon
            :icon-class="scope.row.icon ? scope.row.icon : ''"
          ></svg-icon>
        </template>
      </el-table-column>
      <el-table-column
        prop="orderNum"
        align="center"
        label="排序"
        width="50px"
      ></el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="mark"
        label="权限标识"
      ></el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="routingAddress"
        label="组件路径"
      ></el-table-column>
      <el-table-column prop="iframe" label="外链" min-width="50px">
        <template slot-scope="scope">
          <span v-if="scope.row.iframe">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column prop="cache" label="缓存" min-width="50px">
        <template slot-scope="scope">
          <span v-if="scope.row.cache">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column prop="hidden" label="可见" min-width="50px">
        <template slot-scope="scope">
          <span v-if="scope.row.hidden">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建日期" min-width="100px">
        <template slot-scope="scope">
          <span>{{ parseDate(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-permission="['visitor', 'menu:edit', 'menu:del']"
        label="操作"
        width="160px"
        fixed="right"
      >
        <template slot-scope="scope">
          <udOperation
            :data="scope.row"
            :permission="permission"
            msg="确定删除吗,如果存在下级节点则一并删除，此操作不能撤销！"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import crudMenu from '@/api/system/menu'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import IconSelect from '@/components/IconSelect'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { LOAD_CHILDREN_OPTIONS } from '@riophae/vue-treeselect'

//crud交由presenter持有
const defaultForm = {
  id: null,
  title: null,
  orderNum: 999,
  path: null,
  routingAddress: null,
  componentName: null,
  iframe: false,
  roles: [],
  pid: 0,
  icon: null,
  cache: false,
  hidden: false,
  type: 0,
  mark: null
}
export default {
  name: 'Menu',
  components: {
    rrOperation,
    crudOperation,
    udOperation,
    IconSelect,
    Treeselect
  },
  cruds() {
    return CRUD({
      title: '菜单',
      url: 'api/admin/menu/tree',
      crudMethod: { ...crudMenu },
      queryOnPresenterCreated: true,
      params: { pid: -1 },
      optShow: {
        add: true,
        edit: true,
        del: true
      }
    })
  },
  mixins: [presenter(), header(), form(defaultForm), crud()],
  data() {
    return {
      menus: [],
      permission: {
        add: ['visitor', 'menu:add'],
        edit: ['visitor', 'menu:edit'],
        del: ['visitor', 'menu:del'],
        invalid: ['visitor', 'menu:invalid']
      },
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        path: [{ required: true, message: '请输入路由地址', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    // console.log(this.query.createTime)
  },
  methods: {
    // 新增与编辑前做的操作
    [CRUD.HOOK.afterToCU](crud, form) {
      this.menus = []
      if (form.id != null) {
        if (form.pid === null) {
          form.pid = 0
        }
        this.getSupDepts(form.id)
      } else {
        this.menus.push({ id: 0, label: '顶级类目', children: null })
      }
    },
    getMenus(tree, treeNode, resolve) {
      const params = { pid: tree.id }
      setTimeout(() => {
        crudMenu.getMenus(params).then(res => {
          resolve(res.data)
        })
      }, 100)
    },
    getSupDepts(id) {
      crudMenu.getMenuSuperior(id).then(res => {
        const children = res.map(function(obj) {
          if (!obj.leaf && !obj.children) {
            obj.children = null
          }
          return obj
        })
        this.menus = [{ id: 0, label: '顶级类目', children: children }]
      })
    },
    loadMenus({ action, parentNode, callback }) {
      if (action === LOAD_CHILDREN_OPTIONS) {
        crudMenu.getMenusTree(parentNode.id).then(res => {
          if (res.status === 200 && res.data.length > 0) {
            parentNode.children = res.data.map(function(obj) {
              if (!obj.children) {
                obj.children = null
              }
              return { id: obj.id, label: obj.title, children: obj.children }
            })
          }
          setTimeout(() => {
            callback()
          }, 100)
        })
      }
    },
    // 选中图标
    selected(name) {
      this.form.icon = name
    },
    tableHeaderColor({ rowIndex }) {
      if (rowIndex === 0) {
        return 'background: rgba(246,246,246,1);'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.main-table {
  margin-top: 30px;
  margin-right: 25px;
}
</style>

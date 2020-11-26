<template>
    <div class="role-index">
        <add-role-dialog/>
        <el-row>
            <el-col :span="14" class="pr24">
                <div style="border:1px solid #E4E4E4; margin-top:24px;">
                    <header class="header-container-top role-left">
                        <div id="search-role">
                            <label>角色名称</label>
                            <el-input placeholder="请输入" v-model="searchRole" style="width: 70%;"
                                      size="small"></el-input>
                        </div>
                        <div class="header-container-btn">
                            <el-button
                                    style="background-color:#409eff;"
                                    :class="'active'"
                                    size="small"
                                    @click="">搜索
                            </el-button>
                            <el-button
                                    style="background-color:#409eff;"
                                    :class="'active'"
                                    size="small"
                                    @click="">重置
                            </el-button>
                        </div>
                    </header>
                    <header class="header-container-bottom role-left">
                        <div class="header-container-btn">
                            <el-button
                                    v-for="item in operationButton"
                                    :key="item.id"
                                    :value="item.title"
                                    size="small"
                                    :style="{ 'background-color': item.color }"
                                    @click="item.fun"
                                    :class="item.disabled === true ? 'disable' : 'active'"
                                    :disabled="item.disabled">
                                {{ item.title }}
                            </el-button>
                        </div>
                    </header>
                    <article style="margin-top:30px;">
                        <normal-table
                                :table-obj="tableObj"
                                :loading="false"
                                @selectChange="handleSelectionChange"
                                :showOverflowTooltip="true"
                        ></normal-table>
                        <page-nation
                                style="margin:24px 24px 24px 0px;text-align: right;"
                                @pageChange="pageChange"
                                :pagination="pagination"
                        ></page-nation>
                    </article>
                </div>
            </el-col>
            <el-col :span="10" class="pr24">
                <div style="border:1px solid #E4E4E4; margin-top:24px;">
                    <div class="header-container-bottom detail-btn">
                        <el-input placeholder="菜单分配" v-model="searchTree" size="small" style="width: 30%"></el-input>
                        <div class="header-container-btn">
                            <el-button type="primary" size="small">保存</el-button>
                        </div>

                    </div>
                    <div style="margin-top:10px;margin-left: 10px;">
                        <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <el-tree :data="treeData" ref="tree" show-checkbox node-key="id" default-expand-all
                                 :filter-node-method="filterNode"></el-tree>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import addRole from '../role/dialog/addRole'
    import normalTable from '@/components/Table/index'
    import '@riophae/vue-treeselect/dist/vue-treeselect.css'
    import pageNation from '@/components/PageNation/pagenation.vue'

    export default {
        components: {
            normalTable,
            pageNation,
            'add-role-dialog': addRole
        },
        computed: {
            tableObj() {
                let table = {
                    data: this.tableData,
                    options: this.tableOptions,
                    config: {
                        dragable: false,
                        showHeader: true,
                        columnType: 'selection',
                        headerCellStyle: {background: 'rgba(246,246,246,1)'}
                    },
                    operation: {
                        show: true
                    }
                }
                return table
            }
        },
        data() {
            return {
                //角色搜索框
                searchRole: '',
                //表格
                tableData: [],
                tableOptions: [
                    {
                        prop: 'roleName',
                        label: '角色名'
                    },
                    {
                        prop: 'date',
                        label: '创建日期'
                    }
                ],
                //分页
                currentPage: 1,
                pagination: {
                    small: false,
                    pageSizes: [15, 20, 50],
                    total: 50,
                    show: true,
                    layout: 'prev, pager, next, total,sizes'
                },
                //批量选框
                multipleSelection: [],
                //增删改查按钮
                operationButton: [
                    {
                        value: 'add',
                        title: '新增',
                        icons: 'el-icon-plus',
                        id: 'add',
                        disabled: false,
                        color: '#409eff',
                        fun: () => {
                            return this.add()
                        }
                    },
                    {
                        value: 'edit',
                        title: '修改',
                        icons: 'el-icon-edit',
                        id: 'edit',
                        disabled: true,
                        color: '#409eff',
                        fun: () => {
                            return this.handleEdit()
                        }
                    },
                    {
                        value: 'delete',
                        title: '删除',
                        icons: 'el-icon-delete',
                        id: 'delete',
                        disabled: true,
                        color: '#FF6363',
                        fun: () => {
                            return this.delete()
                        }
                    }
                ],
                //角色树
                searchTree: '',
                checkAll: false,
                treeData: [{
                    id: 1,
                    label: '合规为本',
                    children: [{
                        id: 4,
                        label: '承保问题数据',
                        children: [{
                            id: 9,
                            label: '承保问题数据'
                        }, {
                            id: 10,
                            label: '承保问题数据'
                        }]
                    }]
                }, {
                    id: 2,
                    label: '一级 2',
                    children: [{
                        id: 5,
                        label: '二级 2-1'
                    }, {
                        id: 6,
                        label: '二级 2-2'
                    }]
                }, {
                    id: 3,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }],
            }
        },
        watch: {
            //菜单树搜索
            searchTree(val) {
                this.$refs.tree.filter(val)
            }
        },
        methods: {
            //修改
            handleEdit(item, content) {
                if (content) {
                    this.dialogForm.username = content.loginName
                } else {
                    console.log(this.multipleSelection, 9999)
                }
                this.dialogTableVisible = true
                this.dialogStatus = 'add'
                // this.tempStatus = content
                // this.dialogTableVisible = true
                // this.dialogStatus = 'add'
            },
            //修改弹窗
            updateData() {
                this.$refs.dialogForm.validate(valid => {
                    if (valid) {
                        //修改数据的接口
                        alert('submit!')
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            //删除数据
            delete() {
                this.$confirm(`确认删除选中的1条数据?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        //删除成功的接口
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                    })
                    .catch(() => {
                        this.$message({
                            type: 'success',
                            message: '取消删除'
                        })
                    })
            },
            //删除
            handleDelete(item, content) {
                console.log(item, content, 9999)
                this.$confirm(`确认删除选中的${item.length}条数据?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        //删除成功的接口
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                    })
                    .catch(() => {
                        this.$message({
                            type: 'success',
                            message: '取消删除'
                        })
                    })
            },
            //禁用
            handleEnabled(item, content) {
                console.log(item, content, 9999)
                this.$confirm('此操作将 "启用" 全栈开发岗位, 是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        //删除成功的接口
                        this.$message({
                            type: 'success',
                            message: '启用成功!'
                        })
                    })
                    .catch(() => {
                        this.$message({
                            type: 'success',
                            message: '取消启用'
                        })
                    })
            },
            addOperation(data) {
                //表格操作按钮
                let operation = [
                    {
                        value: '禁用',
                        title: '禁用',
                        id: 'enable',
                        disabled: false,
                        color: 'rgba(64,158,255,0.8)',
                        fun: (item, content) => {
                            return this.handleEnabled(item, content)
                        }
                    },
                    {
                        value: '编辑',
                        title: '编辑',
                        id: 'edit',
                        disabled: false,
                        color: 'rgba(64,158,255,0.8)',
                        fun: (item, content) => {
                            return this.handleEdit(item, content)
                        }
                    },
                    {
                        value: '删除',
                        title: '删除',
                        id: 'delete',
                        disabled: true,
                        color: 'rgba(255,99,99,0.8)',
                        fun: (item, content) => {
                            return this.handleDelete(item, content)
                        }
                    }
                ]
                this.$set(data, 'operation', operation)
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
                this.operationButton.forEach(res => {
                    if (this.multipleSelection.length === 1) {
                        res.disabled = false
                    } else if (this.multipleSelection.length === 0) {
                        if (res.value === 'edit') {
                            res.disabled = true
                        }
                        if (res.value === 'delete') {
                            res.disabled = true
                        }
                        if (res.value === 'export') {
                            res.disabled = true
                        }
                    } else if (this.multipleSelection.length > 1) {
                        if (res.value === 'edit') {
                            res.disabled = true
                        }
                        if (res.value === 'delete') {
                            res.disabled = false
                        }
                        if (res.value === 'export') {
                            res.disabled = false
                        }
                    }
                })
            },
            pageChange(type, val) {
                if (type === 'num') {
                    console.log(val, '条数')
                } else if (type === 'page') {
                    console.log(val, '页数')
                }
            },
            filterNode(value, data) {
                console.log(value, 999999)
                if (!value) return true
                return data.label.indexOf(value) !== -1
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            handleCheckAllChange(val) {
                if (this.checkAll) {
                    this.$refs.tree.setCheckedNodes(this.treeData);
                } else {
                    this.$refs.tree.setCheckedKeys([]);
                }
            }
        },
        mounted() {
            this.tableData = [
                {
                    date: '2016-05-03',
                    roleName: '管理员'

                },
                {
                    date: '2016-05-02',
                    roleName: '初审岗'
                },
                {
                    date: '2016-05-04',
                    roleName: '复审岗'

                },
                {
                    date: '2016-05-01',
                    roleName: '查询岗'
                }
            ]
            this.tableData.forEach(element => {
                // 方法二遍历回来的数据，插入操作
                this.addOperation(element)
            })
        },
        defaultProps: {
            children: 'children',
            label: 'label'
        }
    }
</script>

<style scoped lang="scss">
    .role-index{
        .role-left {
            padding-left: 24px;
        }
        .detail-btn {
            padding-top: 10px;
            padding-left: 10px;
        }
        p {
            font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
            font-weight: bold;
            font-size: 16px;
            color: rgba(0, 0, 0, 0.65);
        }
    }

</style>

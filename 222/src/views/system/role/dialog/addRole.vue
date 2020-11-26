<template>
    <div id="add-role-dialog">
        <el-dialog title="新增" :visible.sync="dialogVisible">
            <el-form :model="form">
                <el-form-item label="活动名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "addRole",
        data() {
            return{
                dialogVisible: false,
                form: {
                    name: ''
                }
            }
        }
    }
</script>

<style scoped>

</style>

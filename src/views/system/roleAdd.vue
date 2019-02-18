<template>
    <div class="sys-page">
       <!--新增界面-->
        <el-dialog title="新增" :visible.sync="visible" @close="handleClose" :show="show" append-to-body>
          <el-form  ref="addForm" :model="addForm" label-width="110px" :rules="addFormRules">
            <el-form-item label="角色编码">
              <el-input v-model="addForm.roleCode"></el-input>
            </el-form-item>
            <el-form-item label="角色名称">
              <el-input v-model="addForm.roleName"></el-input>
            </el-form-item>
            <el-form-item label="角色状态" prop="state">
              <el-radio-group v-model="addForm.state">
                <el-radio-button label="0">有效</el-radio-button>
                <el-radio-button label="1">无效</el-radio-button>
              </el-radio-group>
          </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="handleCancell">取 消</el-button>
            <el-button type="primary" @click="handleSumbit('addForm')">确 定</el-button>
          </div>
        </el-dialog>
     </div>
</template>

<script>
import {mapActions } from 'vuex'
 
export default {
  name: 'roleAdd',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: this.show,
      addFormRules: {
        name: [
          { required: true, message: '请输入资源名称', trigger: 'blur' }
        ]
      },
      addForm: {//新增界面数据
        roleCode:'',
        roleName:'',
        state:0,
      }
    }
  },
  watch: {
    show() {          //注意要随时监控
      this.visible = this.show;
    }
  },
  methods: {
    handleClose(done) {
      this.$emit('update:show', false)

      //  this.$nextTick(() => {
      //   this.$refs['addForm'].resetFields()
      //  })
    },
    handleCancell() {
      this.visible = false
      //this.handleClose()
    },
    handleSumbit() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true
            this.$store.dispatch('role/saveRole',this.addForm).then((res) => {
              this.addLoading = false
              this.$message({ message: '提交成功',  type: 'success' })
              this.$emit('refreshTable')
              this.handleClose()
            })
          })
        }
      })
    }
  }
}
</script>

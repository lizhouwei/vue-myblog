<template>
    <div class="sys-page">
       <!--新增界面-->
        <el-dialog title="新增" :visible.sync="visible"  @close="$emit('update:show', false)" :show="show" append-to-body>
          <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
            <el-form-item label="用户名称" prop="name">
              <el-input v-model="addForm.userName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户邮箱">
              <el-input v-model="addForm.email"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="addForm.mobile"></el-input>
            </el-form-item>
              <el-form-item label="角色">
               <el-radio-group  v-model="addForm.defaultRoleCode">
                <el-radio  v-for="(th,key) in roleList" :key="key" :label="th.roleCode" >{{th.roleName}}</el-radio>
              </el-radio-group>
            </el-form-item>  
          </el-form>
          <div slot="footer" class="dialog-footer">
             <el-button @click="handleCancell">取 消</el-button>
            <el-button type="primary" @click="handleSumbit">确 定</el-button>
          </div>
        </el-dialog>
     </div>
</template>

<script>
import {mapActions } from 'vuex'
 
export default {
  name: 'userAdd',
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
        userName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
      addForm: {//新增界面数据
        userName: '',
        email:'',
        mobile: '',
        defaultRoleCode:'',
      },
      roleList:[] ,
    }
  },
  mounted() {
     this.$store.dispatch('user/getAllRole',{}).then((res) => {
        this.roleList = res.data
     })
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
            this.$store.dispatch('user/saveUser',this.addForm).then((res) => {
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

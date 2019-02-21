<template>
    <div class="sys-page">
       <!--新增界面-->
        <el-dialog title="编辑" :visible.sync="visible"  @close="handleClose" :editShow="editShow" append-to-body>
          <el-form  ref="editForm" :model="editForm" label-width="110px" :rules="editFormRules">
            <el-form-item label="用户名称">
              <el-input v-model="editForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="用户邮箱">
              <el-input v-model="editForm.email"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="editForm.mobile"></el-input>
            </el-form-item>
             <el-form-item label="角色">
               <el-radio-group  v-model="editForm.defaultRoleCode">
                <el-radio  v-for="(th,key) in roleList" :key="key" :label="th.roleCode" >{{th.roleName}}</el-radio>
              </el-radio-group>
            </el-form-item>  
          </el-form>
          <div slot="footer" class="dialog-footer">
             <el-button @click="handleCancell">取 消</el-button>
            <el-button type="primary" @click="sumbit">确 定</el-button>
          </div>
        </el-dialog>
     </div>
</template>

<script>
import {mapActions } from 'vuex'
 
export default {
  name: 'roleEdit',
  props: {
    editShow: {
      type: Boolean,
      default: false
    },
    editRow: { 
     type: Object,
      default: function (){
        return{
          id:'',
          userName: '',
          email:'',
          mobile: '',
          defaultRoleCode:'',
        }
      }
    }
  },
  data() {
    const {editRow} = this
    return {
      visible: this.editShow,
      editFormRules: {
        name: [
          { required: true, message: '请输入资源名称', trigger: 'blur' }
        ]
      },
      editForm: {//新增界面数据
        id:this.editRow.id,
        userName:this.editRow.userName,
        email:this.editRow.email,
        mobile:this.editRow.mobile,
        defaultRoleCode:this.editRow.defaultRoleCode,
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
    editShow() {
      this.visible = this.editShow
    }
  },
  methods: {
    handleClose() {
      // this.$nextTick(() => {
      //   this.$refs['editForm'].resetFields()
      // })
      this.$emit('update:editShow', false)
    
    },
    handleCancell() {
      // this.$nextTick(() => {
      //   this.$refs['editForm'].resetFields()
      // })
      this.visible = false
     
    },
    sumbit() {
      //this.visible = false
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true
            //let para = Object.assign({}, this.editForm)
             this.$store.dispatch('role/updateRole',this.editForm).then((res) => {
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

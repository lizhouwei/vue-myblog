<template>
    <div class="sys-page">
       <!--新增界面-->
        <el-dialog title="编辑" :visible.sync="visible"  @close="handleClose" :editShow="editShow" append-to-body>
          <el-form  ref="editForm" :model="editForm" label-width="110px" :rules="editFormRules">
            <el-form-item label="角色编码">
              <el-input v-model="editForm.roleCode"></el-input>
            </el-form-item>
            <el-form-item label="角色名称">
              <el-input v-model="editForm.roleName"></el-input>
            </el-form-item>
            <el-form-item label="角色状态" prop="state">
              <el-radio-group v-model="editForm.state">
                <el-radio-button label="0">有效</el-radio-button>
                <el-radio-button label="1">无效</el-radio-button>
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
          roleCode:'',
          roleName:'',
          state:'0',
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
        roleCode:this.editRow.roleCode,
        roleName:this.editRow.roleName,
        state:this.editRow.state,
      }
    }
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

<template>
    <div class="sys-page">
       <!--新增界面-->
        <el-dialog title="编辑" :visible.sync="visible"  @close="handleClose" :editShow="editShow" append-to-body>
          <el-form  ref="editForm" :model="editForm" label-width="110px" :rules="editFormRules">
            <el-form-item label="上级资源名称">
              <el-input v-model="editForm.parentname" :disabled="true" >{{editForm.parentname}}</el-input>
            </el-form-item>
            <el-form-item label="上级路由路径"  >
               <el-input v-model="editForm.parentpath" :disabled="true" >{{editForm.parentpath}}</el-input>
            </el-form-item>
            <el-form-item label="资源名称" prop="name">
              <el-input v-model="editForm.name">{{editForm.name}}</el-input>
            </el-form-item>
            <el-form-item label="路由路径" prop="path">
               <el-input v-model="editForm.path" >{{editForm.path}}</el-input>
            </el-form-item>
            <el-form-item label="组件路径" prop="componentUrl">
              <el-input  v-model="editForm.componentUrl" >{{editForm.componentUrl}}</el-input>
            </el-form-item>
            <el-form-item label="状态" prop="state">
              <el-radio-group v-model="editForm.state">
                <el-radio-button label="0">有效</el-radio-button>
                <el-radio-button label="1">无效</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否隐藏" prop="hide">
              <el-radio-group v-model="editForm.hide">
                <el-radio-button  label="0">是</el-radio-button>
                <el-radio-button  label="1">否</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="序号" prop="zindex">
              <el-input-number  :min="0" v-model="editForm.zindex"></el-input-number>
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
  name: 'resourceEdit',
  props: {
    editShow: {
      type: Boolean,
      default: false
    },
    editNode: { 
     type: Object,
      default: function (){
        return{
          id:'',
          pid:'',
          parentname:'',
          parentpath:'',
          name: '',
          path: '',
          componentUrl: '',
          state:'0',
          hide:'0',
          zindex: 0
        }
      }
    }
  },
  data() {
    return {
      visible: this.editShow,
      editFormRules: {
        name: [
          { required: true, message: '请输入资源名称', trigger: 'blur' }
        ]
      },
      editForm: {//新增界面数据
        id: this.editNode.id,
        parentname: this.editNode.parentname,
        parentpath: this.editNode.parentpath,
        name: this.editNode.name,
        path: this.editNode.path,
        componentUrl: this.editNode.componentUrl,
        state:this.editNode.state,
        hide:this.editNode.hide,
        zindex: this.editNode.zindex
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
             this.$store.dispatch('permission/updatePermission',this.editForm).then((res) => {
              this.addLoading = false
              this.$message({ message: '提交成功',  type: 'success' })
              this.$emit('refreshNode')
            })
          })
        }
      })
    }
  }
}
</script>

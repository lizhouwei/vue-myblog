<template>
    <div class="sys-page">
       <!--新增界面-->
        <el-dialog title="编辑" :visible.sync="visible"  @close="handleClose" :show="editShow" append-to-body>
          <el-form :model="editForm" label-width="110px" :rules="editFormRules" ref="editForm">
            <el-form-item label="上级资源名称" prop="parentname">
              <el-input v-model="editForm.parentname" :disabled="true" >{{editForm.parentname}}</el-input>
            </el-form-item>
            <el-form-item label="上级路由路径" prop="parentpath" >
               <el-input v-model="editForm.parentpath" :disabled="true" >{{editForm.parentpath}}</el-input>
            </el-form-item>
            <el-form-item label="资源名称" prop="name">
              <el-input v-model="editForm.name"  >{{editForm.name}}</el-input>
            </el-form-item>
            <el-form-item label="路由路径" prop="path">
               <el-input v-model="editForm.path" >{{editForm.path}}</el-input>
            </el-form-item>
            <el-form-item label="组件路径" prop="componentUrl">
              <el-input  v-model="editForm.componentUrl" >{{editForm.componentUrl}}</el-input>
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
    editForm: {//新增界面数据
        pid:'',
        parentname:'',
        parentpath:'',
        name: '',
        path: '',
        componentUrl: '',
        zindex: 0
    }
  },
  data() {
    return {
      visible: this.editShow,
      addFormRules: {
        name: [
          { required: true, message: '请输入资源名称', trigger: 'blur' }
        ]
      },
      
    }
  },
  mounted() {
  },
  watch: {
    editShow() {          //注意要随时监控
      this.visible = this.editShow;
    }
  },
  methods: {
    handleClose() {
       this.$emit('update:editShow', false)
       this.$nextTick(() => {
        this.$refs['editForm'].resetFields()
        })
    },
    handleCancell() {
      this.visible = false
      this.handleClose()
    },
    sumbit() {
      this.visible = false
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true
            let para = Object.assign({}, this.editForm)
             this.$store.dispatch('permission/savePermission',para).then((res) => {
              this.addLoading = false
              this.$message({ message: '提交成功',  type: 'success' })
            })
          })
        }
      })
    }
  }
}
</script>

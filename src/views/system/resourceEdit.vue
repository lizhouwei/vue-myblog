<template>
    <div class="sys-page">
       <!--新增界面-->
        <el-dialog title="编辑" :visible.sync="visible"  @close="handleClose" :show="editShow" append-to-body>
          <el-form :model="addForm" label-width="110px" :rules="addFormRules" ref="addForm">
            <el-form-item label="上级资源名称" prop="parentname">
              <el-input v-model="addForm.parentname" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="上级路由路径" prop="parentpath">
               <el-input v-model="addForm.parentpath" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="资源名称" prop="name">
              <el-input v-model="addForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="路由路径" prop="path">
               <el-input v-model="addForm.path" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="组件路径" prop="componentUrl">
              <el-input  v-model="addForm.componentUrl" ></el-input>
            </el-form-item>
            <el-form-item label="序号" prop="order">
              <el-input-number  :min="0" v-model="addForm.order"></el-input-number>
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
      addForm: {//新增界面数据
        parentname:'',
        parentpath:'',
        name: '',
        path: '',
        componentUrl: '',
        order: 1 
      }
    }
  },
  mounted() {
  },
  watch: {
    show() {          //注意要随时监控
      this.visible = this.editShow;
    }
  },
  methods: {
    handleClose() {
       this.$emit('update:editShow', false)
       this.$nextTick(() => {
        this.$refs['addForm'].resetFields()
        })
    },
    handleCancell() {
      this.visible = false
      this.handleClose()
    },
    sumbit() {
      this.visible = false
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true
            let para = Object.assign({}, this.addForm)
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

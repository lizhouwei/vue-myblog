<template>
    <div class="sys-page">
       <!--新增界面-->
        <el-dialog title="新增" :visible.sync="visible" @close="handleClose" :show="show" append-to-body>
          <el-form  ref="addForm" :model="addForm" label-width="110px" :rules="addFormRules">
            <el-form-item label="上级资源名称">
              <el-input v-model="addForm.parentname" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="上级路由路径">
               <el-input v-model="addForm.parentpath" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="资源名称" prop="name">
              <el-input v-model="addForm.name" ></el-input>
            </el-form-item>
            <el-form-item label="路由路径" prop="path">
               <el-input v-model="addForm.path"></el-input>
            </el-form-item>
            <el-form-item label="组件路径" prop="componentUrl">
              <el-input  v-model="addForm.componentUrl" ></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="state">
              <el-radio-group v-model="addForm.state">
                <el-radio-button label="0">有效</el-radio-button>
                <el-radio-button label="1">无效</el-radio-button>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="是否隐藏" prop="hide">
            <el-radio-group v-model="addForm.hide">
              <el-radio-button  label="0">是</el-radio-button>
              <el-radio-button  label="1">否</el-radio-button>
            </el-radio-group>
        </el-form-item>
            <el-form-item label="序号" prop="zindex">
              <el-input-number  v-model="addForm.zindex"></el-input-number>
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
    },
    parentNode: { 
      type: Object,
      default: function (){
        return{
          pid:'',
          parentname:'',
          parentpath:''
        }
      }
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
        pid: this.parentNode.id,
        parentname:this.parentNode.name,
        parentpath:this.parentNode.path,
        name: '',
        path: '',
        componentUrl: '',
        state:'0',
        hide:'0',
        zindex: 0
      }
    }
  },
  mounted() {
    this.addForm.pid = this.parentNode.id
    this.addForm.parentname = this.parentNode.name
    this.addForm.parentpath = this.parentNode.path
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
            this.$store.dispatch('permission/savePermission',this.addForm).then((res) => {
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

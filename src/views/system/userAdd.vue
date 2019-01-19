<template>
    <div class="sys-page">
       <!--新增界面-->
        <el-dialog title="新增" :visible.sync="visible"  @close="$emit('update:show', false)" :show="show" append-to-body>
          <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="addForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="addForm.sex">
                <el-radio class="radio" :label="1">男</el-radio>
                <el-radio class="radio" :label="0">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
            </el-form-item>
            <el-form-item label="生日">
              <el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
            </el-form-item>
            <el-form-item label="地址">
              <el-input type="textarea" v-model="addForm.addr"></el-input>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
             <el-button @click="cellsumbit">取 消</el-button>
            <el-button type="primary" @click="sumbit">确 定</el-button>
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
    },
    EDIT: {
      type: String
    } 
  },
  data() {
    return {
      visible: this.show,
      addFormRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
      addForm: {//新增界面数据
        name: '',
        sex: -1,
        age: 0,
        birth: '',
        addr: ''
      }
    }
  },
  mounted() {
  },
  watch: {
    show() {          //注意要随时监控
      this.visible = this.show;
    }
  },
  methods: {
    cellsumbit() {
      this.visible = false;
      this.$emit("renovate");
    },
    sumbit() {
      this.visible = false;
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true;
            let para = Object.assign({}, this.addForm);
            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
            addUser(para).then((res) => {
              this.addLoading = false;
              //NProgress.done();
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              this.$refs['addForm'].resetFields();
              this.addFormVisible = false;
              this.getUsers();
            })

          })
        }
      })
    },
  }
}
</script>

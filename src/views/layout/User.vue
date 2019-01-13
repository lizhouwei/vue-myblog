<template>
  <div>
    <div class="userInfo">
            <ul>
                <li>
                    <span class="user">{{user.name}}</span><span class="user">{{userRole.name}}</span>
                    <span  @click.prevent="logout"><font-awesome-icon icon="user-times" fixed-width  /> </span>
                       
                </li>
            </ul>
        </div>
        <el-dialog title="修改密码" :visible.sync="dialog.editPaw.show" :modal-append-to-body="false" custom-class="editPawDialog">
            <el-form :model="editPaw" :rules="editPawRules" ref="editPaw" label-width="100px" >
                <el-form-item label="旧密码" prop="oldPaw">
                    <el-input v-model="editPaw.oldPaw" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPaw">
                    <el-input v-model="editPaw.newPaw" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="confirmNewPaw">
                    <el-input v-model="editPaw.confirmNewPaw" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div class="textC">
                <el-button type="primary" @click="editPawSubmit">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { mapState ,mapGetters,mapActions} from 'vuex'
 
export default {
  name: 'appheaderuser',
  data() {
      return {
            dialog: {
                editPaw: {
                    show: false
                }
            },
            editPaw: {
                oldPaw: '',
                newPaw: '',
                confirmNewPaw: ''
            },
            editPawRules: {
                oldPaw: [
                    {required: true, message: '请输入旧密码', trigger: 'blur'}
                ],
                newPaw: [
                    {required: true, message: '请输入新密码', trigger: 'blur'},
                    {min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur'},
                    {
                        // eslint-disable-next-line
                        validator(rule, value, callback, source, options) {
                            var errors = [];
                            if(!/^[a-z0-9]+$/.test(value)) {
                                console.log("不符合输入规则")
                                errors.push("请输入字母或特殊字符")
                            }
                            callback(errors);
                        }
                    }
                ],
                confirmNewPaw: [
                    {required: true, message: '请再次输入新密码', trigger: 'blur'},
                    {min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur'},
                    {
                        // eslint-disable-next-line
                        validator(rule, value, callback, source, options) {
                            var errors = [];
                            if(!/^[a-z0-9]+$/.test(value)) {
                                console.log("不符合输入规则")
                                errors.push("请输入字母或特殊字符")
                            }
                            callback(errors);
                        }
                    }
                ]
            }
        }
    },
  computed: {
    ...mapState({
        user :state => state.user,
        userRole :state => state.user.role,
    }),
  },
  methods: {
    ...mapActions({
         logoutAction: 'auth/logout'
     }),
     
    logout(){
        this.logoutAction().then(() => {
            this.$router.push({ path: '/login' });
        })
    },
     userOperation(command){
            switch(command){
                case 'logout': 
                    this.logout()
                    break
                case 'editPaw':
                    this.dialog.editPaw.show = true
                    console.log('编辑密码')
                    break
            }
        },
    click () {
      // do nothing
    },
     editPawSubmit(){
            this.$refs.editPaw.validate((valid) => {
                if (valid) {
                    console.log("修改密码表单提交")
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    sidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize (e) {
      e.preventDefault()

      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle (e) {
      e.preventDefault()

      document.body.classList.toggle('sidebar-mobile-show')
    },
    asideToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('aside-menu-hidden')
    }
  } 
}
</script>


<template>
    <div class="sys-login">
        <div class="login-title"> 后台管理平台  </div>
            <div class="form-group">
                <el-form :model="loginForm" :rules="loginRules" ref="loginForm" auto-complete="on"  label-position="left" label-width="0px">
                    <el-form-item prop="name">
                        <el-input v-model="loginForm.name" type="text" placeholder="name"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" type="password" placeholder="Password" @keyup.enter.native="handleLogin"></el-input>
                    </el-form-item>
                    <p class="textR"> </p>
                    <a class="btn-login" type="primary" @click="submitForm('loginForm')">登录</a>
                </el-form>
                <div v-if="sysMsg" class="err-msg"></div>
            </div>
         
    </div>
</template>

<script>
import {mapActions } from 'vuex'
export default {
    data() {
        return {
            loginForm: {
                name: '',
                password: '' 
            },
            loginRules: {
                name: [
                    {required: true, message: '', trigger: 'blur'}
                ],
                password :[
                    {required: true, message: '', trigger: 'blur'}
                ]
            }, 
            sysMsg: ''
        }
    },
    methods: {
        ...mapActions({
            login: 'auth/loginByEmail'
        }),
        submitForm(){
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.login({
                        name: this.loginForm.name,
                        password: this.loginForm.password
                    }).then(res => {
                        if(res.login){
                        this.$message.success('登录成功');
                        this.$router.push('/home')
                        } else {
                            this.sysMsg = res.message
                        }
                    })
                } else {
                    return false
                }
            });
        } 
    }
}
</script>
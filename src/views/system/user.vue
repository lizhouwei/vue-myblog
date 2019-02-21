<template>
    <div class="sys-page">
        <!-- 搜索 -->
        <app-search>
            <el-form :inline="true" :model="searchForm">
                <el-form-item>
                    <el-input v-model="searchForm.userCode" placeholder="请输入用户编码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="searchForm.userName" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="searchForm.mobile" placeholder="请输入用户手机号"></el-input>
                </el-form-item>
                  <el-form-item>
                    <el-input v-model="searchForm.email" placeholder="请输入用户邮箱"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                </el-form-item>
            </el-form>
        </app-search>
        <!-- 工具s条 -->
        <app-toolbar >
            <el-button type="primary" @click="handleAdd">新增</el-button>
         </app-toolbar>
        <!-- 表格  -->
        <AppTable  ref="userTable" :url="'user/getUserList'" :formParams="formParams"   :tableHeader="tableHeader"
           @handleEdit='handleEdit'
           @handleDel='handleDel'/>
    <div>
        <user-add :show.sync="show" v-if='show' @refreshTable='refreshTable'></user-add>
        <user-edit :editShow.sync="editShow" v-if='editShow' @refreshTable='refreshTable' :editRow='editRow' ></user-edit >  
    </div>
    </div>
</template>

<script>
import {mapActions } from 'vuex'
import UserAdd from './userAdd'
import UserEdit from './userEdit'


let moment = require("moment")
export const tableHeader = [ // 表头数据
  { prop: 'userCode', label: '用户编码', minWidth: '100px' },
  { prop: 'userName', label: '用户名称', minWidth: '100px' , formatter: (rowObject, value,  index) => {return  value}},
  { prop: 'mobile', label: '手机号', minWidth: '100px', formatter: (rowObject, value,  index) => {return  value}},
  { prop: 'email', label: '邮箱' },
  { prop: 'createTime', label: '注册时间', minWidth: "140px", formatter: (rowObject, value,  index) => {return  moment(value).format("YYYY-MM-DD HH:mm:ss")} },
  { prop: 'laneno', label: '状态', render: row => { const { laneno } = row ; return laneno ?  'laneno' : 'Unknow' } },
  { prop: 'defaultRole.roleCode', label: '默认角色id' , hide:true },
  { prop: 'defaultRole.roleName', label: '默认角色' , minWidth: '100px' },
{ prop: 'oper', label: '操作', fixed: 'right', minWidth: '140px',
    oper: [
       { name: '编辑', type:'primary', clickFun : 'handleEdit' },
      { name: '删除', type:'danger',clickFun:'handleDel' },
    ]
  }
]

export default {
    name: 'userList',
    components:{UserAdd ,UserEdit},
    data() {
        return {
             show: false,//新增界面是否显示
             editShow: false, 
             searchForm: {
                userCode: '',
                userName: '',
                mobile: '',
                email: ''
            },
            formParams:{},
            tableHeader: tableHeader,
            editRow:{}
        }
    },
    mounted() {
    },
    methods: {
        search(){
          this.$refs.userTable.searchHandler(this.searchForm)
        }, // 编辑
        handleEdit(data){
        this.editRow =  data
        this.editShow = true
        },
        // 删除
        handleDel (data) {
            this.$store.dispatch('user/delUser',{id:data.id}).then((res) => {
                this.refreshTable()
            }) 
        },
        handleAdd: function () {
            this.show = true
        },
        refreshTable() {
            this.search()
        }
    },
}
</script>

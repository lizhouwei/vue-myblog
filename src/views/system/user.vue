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
            <el-button type="primary">新增</el-button>
            <el-button type="primary">修改</el-button>
        </app-toolbar>
        <!-- 表格  -->
        <AppTable   ref="userTable" :url="'user/getUserList'" :formParams="formParams"  @row-click='rowClick'  :tableHeader="tableHeader"/>
    </div>
</template>

<script>
import {mapActions } from 'vuex'

export const tableHeader = [ // 表头数据
  { prop: 'userCode', label: '用户编码', minWidth: '100px' },
  { prop: 'userName', label: '用户名称', minWidth: '140px' , formatter: (rowObject, value,  index) => {return  value}},
  { prop: 'mobile', label: '手机号', minWidth: '140px', formatter: (rowObject, value,  index) => {return  value}},
  { prop: 'email', label: '邮箱' },
  { prop: 'createTime', label: '注册时间', minWidth: "120px" },
  { prop: 'laneno', label: '数据类型', render: row => { const { laneno } = row ; return laneno ?  'laneno' : 'Unknow' } },
  { prop: 'staffname', label: '姓名', minWidth: '100px' },
  { prop: 'mediatype', label: '付款方式' },
  { prop: 'comp_cash', label: '计算费额' },
  { prop: 'fact_cash', label: '实收费额' },
  { prop: 'oper', label: '操作', fixed: 'right', minWidth: '140px',
    oper: [
      { name: '查看', clickFun: ()=>{} },
      { name: '编辑', clickFun: ()=>{} }
    ]
  }
]

export default {
    name: 'userList',
    data() {
        return {
            searchForm: {
                userCode: '',
                userName: '',
                mobile: '',
                email: ''
            },
            formParams:{},
            tableHeader: tableHeader,
         }
    },
    mounted() {
     },
    methods: {
       ...mapActions({
             
        }),
        search(){
          this.$refs.userTable.searchHandler(this.searchForm)
            console.log(`欲提交的数据  :${this.searchForm} `)
        },
        rowClick(data){
            console.log(data.userCode)
        }
    }
}
</script>

<template>
    <div class="sys-page">
        <!-- 搜索 -->
        <app-search>
            <el-form :inline="true" :model="searchForm">
                <el-form-item>
                    <el-date-picker v-model="searchForm.time" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="searchForm.type" placeholder="下拉选择">
                        <el-option label="选项一" value="选项一"></el-option>
                        <el-option label="选项二" value="选项二"></el-option>
                        <el-option label="选项三" value="选项三"></el-option>
                        <el-option label="选项四" value="选项四"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="searchForm.text" placeholder="请输入查询条件"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                </el-form-item>
            </el-form>
        </app-search>
        <!-- 工具条 -->
        <app-toolbar >
            <el-button type="primary">新增</el-button>
            <el-button type="primary">修改</el-button>
        </app-toolbar>
        <!-- 表格  -->
        <AppTable  :tableData="tableData" @row-click='rowClick'  :tableHeader="tableHeader"/>
    </div>
</template>

<script>
import {mapActions } from 'vuex'
export const tableHeader = [ // 表头数据
  { prop: 'userCode', label: '用户编码', minWidth: '140px' },
  { prop: 'userName', label: '用户名称', minWidth: '100px' , formatter: (rowObject, value,  index) => {return '您好'+value}},
  { prop: 'plazano', label: '名称', minWidth: '100px', formatter: (rowObject, value,  index) => {return '您好'+value}},
  { prop: 'car_plate', label: '号码' },
  { prop: 'card_no', label: '卡号', minWidth: "120px" },
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
                time: '',
                type: '',
                text: ''
            },
            tableHeader: tableHeader,
            tableData:[]
        }
    },
    mounted() {
        this.getTableData()
    },
    methods: {
       ...mapActions({
            getUserList: 'user/getUserList'
        }),
        // 获取table数据
        getTableData() {
          this.getUserList({}).then(res => {
               this.tableData = res 
          }).catch(err => {
                  console.log(err)
                this.$message.error('获取数据失败，失败码')
          })
        },
        search(){  
            console.log(`欲提交的数据   日期:${this.searchForm.time}  下拉条件:${this.searchForm.type}  文本: ${this.searchForm.text}`)
        },
        rowClick(data){
            console.log(data.userCode)
        }
    }
}
</script>

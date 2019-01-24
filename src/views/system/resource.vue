<template>
  <div class="sys-page">
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="350px" style="background-color: rgb(238, 241, 246)">
        <AppTree ref="resourceTree" @node-click="nodeClick" :treeData="treeData"/>
      </el-aside>
    <el-container>
      <el-header style=" height:40px; text-align: right; font-size: 12px">
        <app-toolbar >
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </app-toolbar>
      </el-header>
      <el-main>
        <AppTable  ref="resourceTable" :url="'menu/getMenuList'" :autoLoad='false'  :formParams="formParams" :showPagination='false'  :tableHeader="tableHeader"/>
      </el-main>
    </el-container>
</el-container>
 <div>
    <resource-add :show.sync="show" @renovate="getuser"></resource-add >
    <resource-edit :show.sync="editShow" @renovate="getuser"></resource-edit >
    </div>
</div>
</template>

<script>
import ResourceAdd from './resourceAdd'
import ResourceEdit from './resourceEdit'



const tableHeader = [ // 表头数据
  { prop: 'id', label: 'id', minWidth: '50px' },
  { prop: 'name', label: '资源名称' , minWidth: '90px'},
  { prop: 'path', label: '资源路径', minWidth: '100px' },
  { prop: 'componentUrl', label: '资源组件路径', minWidth: '100px' },
  { prop: 'oper', label: '操作', fixed: 'right', minWidth: '70px',
    oper: [
      { name: '编辑', type:'text', clickFun:(row)=>{ this.editShow = true } },
      { name: '删除', type:'danger',clickFun: ()=>{} }
    ]
  }
]

  export default {
    name:'resource',
    components:{
      ResourceAdd,
      ResourceEdit
      },
    data() {
      return {
        show: false,//新增界面是否显示 
        editShow: false,
        treeData: [],
        formParams:{pid:''},
        tableHeader: tableHeader
      }
    },
    mounted() {
      this.loadNode()
    },
    methods: {
      loadNode() {
        this.$store.dispatch('menu/getMenuTree',{}).then((res) => {
        this.treeData = res
        this.$refs.resourceTable.searchHandler({pid : ''})
         }).catch(err => {
            this.$message.error(err)
         })
      },
      nodeClick(object,node,treeObject){
        this.$refs.resourceTable.searchHandler({pid : object.id})
       },
      handleAdd: function () {
      //显示新增界面
        this.show = true
      },
      handleEidt() {
      //显示新增界面
        this.editShow = true
      },
      getuser() {

      }
    }
  }
</script>

<style>
  

</style>



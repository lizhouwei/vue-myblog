<template>
  <div class="sys-page">
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="500px" style="background-color: rgb(238, 241, 246)">
        <app-toolbar >
            <el-button type="primary" @click="handleAdd">新增</el-button>
         </app-toolbar>
        <!-- 表格  -->
        <AppTable  ref="roleTable" :url="'role/roleList'" :formParams="formParams" :tableHeader="tableHeader"
        @handleEdit='handleEdit'
        @handleDel='handleDel'
        @handlePermission='handlePermission'/>
       </el-aside>
    <el-container>
      <el-header style=" height:40px; text-align: right; font-size: 12px">
        <AppTree ref="resourceTree" :checkbox=true :expandedKeys='expandedKeys' :eheckedKeys='eheckedKeys' :treeData="treeData"/>
      </el-header>
      <el-main>
         
      </el-main>
    </el-container>
</el-container>
  <div>
    <role-add :show.sync="show" v-if='show' @refreshTable='refreshTable'></role-add > 
    <role-edit :editShow.sync="editShow" v-if='editShow' @refreshTable='refreshTable' :editRow='editRow' ></role-edit >  
  </div>
</div>
</template>

<script>

const tableHeader = [ // 表头数据
  { prop: 'id', label: 'id', minWidth: '50px',hide:true },
  { prop: 'roleCode', label: '编号', minWidth: '60px' },
  { prop: 'roleName', label: '角色名称' , minWidth: '100px'},
  { prop: 'oper', label: '操作', fixed: 'right', minWidth: '150px',
    oper: [
      { name: '编辑', type:'primary', clickFun : 'handleEdit' },
      { name: '删除', type:'danger',clickFun:'handleDel' },
      { name: '权限树', type:'danger',clickFun:'handlePermission' }
    ]
  }
]
import RoleAdd from './roleAdd'
import RoleEdit from './roleEdit'

export default {
  name:'role',
  components:{
    RoleAdd:RoleAdd,
    RoleEdit:RoleEdit
  },
  data() {
    return {
      show: false,//新增界面是否显示 
      editShow: false,
      treeData: [],
      formParams:{},
      tableHeader: tableHeader,
      editRow:{},
      expandedKeys:[],
      eheckedKeys:[]
    }
  },
  methods: {
    refreshTable(){
      this.$refs.roleTable.searchHandler()
     },
    handleAdd() {
      this.show = true
    },
    // 编辑
    handleEdit(data){
      this.editRow =  data
      this.editShow = true
     },
    // 删除
    handleDel (data) {
      this.$store.dispatch('role/delRole',{id:data.id}).then((res) => {
       this.refreshTable()
      }) 
    },
    handlePermission(data){
      this.$store.dispatch('permission/permissionTree',{}).then((res) => {
        this.treeData = res
      }) 
      this.$store.dispatch('role/permissionTree',{id:data.id}).then((res) => {
            res.data.map((permiss)=>{
              this.expandedKeys.push(permiss.resourceId)
              this.eheckedKeys.push(permiss.resourceId)
           })
         }) 
    }
  }
}
</script>

<style>
  

</style>



<template>
  <div class="sys-page">
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
        <AppTree ref="resourceTree" @node-click="nodeClick" :treeData="treeData"/>
      </el-aside>
    <el-container>
      <el-header style=" height:40px; text-align: right; font-size: 12px">
        <app-toolbar >
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </app-toolbar>
      </el-header>
      <el-main>
        <AppTable  ref="resourceTable" :url="'permission/permissionList'" :autoLoad='false'  :formParams="formParams" :showPagination='false'  :tableHeader="tableHeader"
        @handleEdit='handleEdit'
        @handleDel='handleDel'/>
      </el-main>
    </el-container>
</el-container>
 <div>
    <resource-add :show.sync="show" ></resource-add > 
    <resource-edit :editShow.sync="editShow" :addForm='addForm' ></resource-edit >  
    </div>
</div>
</template>

<script>
import ResourceAdd from './resourceAdd'
import ResourceEdit from './resourceEdit'

// 操作按钮组 === label: 文本，type :类型（primary / success / warning / danger / info / text），
// show：是否显示，icon：按钮图标，plain：是否朴素按钮，disabled：是否禁用，method：回调方法

const tableHeader = [ // 表头数据
  { prop: 'id', label: 'id', minWidth: '50px' },
  { prop: 'code', label: '编号', minWidth: '100px' },
  { prop: 'name', label: '资源名称' , minWidth: '100px'},
  { prop: 'path', label: '资源路径', minWidth: '100px' },
  { prop: 'componentUrl', label: '资源组件路径', minWidth: '100px' },
  { prop: 'state', label: '状态', minWidth: '100px' },
  { prop: 'hide', label: '是否隐藏', minWidth: '100px' },
  { prop: 'icon', label: '图标名称', minWidth: '100px' },
  { prop: 'zindex', label: '排序', minWidth: '100px' },
  { prop: 'oper', label: '操作', fixed: 'right', minWidth: '150px',
    oper: [
      { name: '编辑', type:'primary', clickFun : 'handleEdit' },
      { name: '删除', type:'danger',clickFun:'handleDel' }
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
      formParams:{pid:'0'},
      tableHeader: tableHeader,
      addForm:{},
      selectNode:{}
    }
  },
  mounted() {
    this.loadNode()
  },
  methods: {
    loadNode() {
      this.$store.dispatch('permission/permissionTree',{}).then((res) => {
      this.treeData = res
      this.$refs.resourceTable.searchHandler({pid : '0'})
      }) 
    },
    nodeClick(object,node,treeObject){
    
      this.selectNode = object
      this.$refs.resourceTable.searchHandler({pid : object.id})
      },
    handleAdd() {
    //显示新增界面
      this.show = true
    },
    // 编辑
    handleEdit(data){
      this.addForm = Object.assign( this.addForm ,data)
      this.addForm.parentname = this.selectNode.name
      this.addForm.parentpath = this.selectNode.path
      this.editShow = true
     },
    // 删除
    handleDel (data) {
      console.log( data)
        this.$store.dispatch('permission/delPermission',{id:data.id}).then((res) => {
          this.loadNode()
       }) 
    }
  }
}
</script>

<style>
  

</style>



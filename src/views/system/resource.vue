<template>
    <div class="sys-page">
      <el-container style="height: 500px; border: 1px solid #eee">
        <el-aside width="350px" style="background-color: rgb(238, 241, 246)">
         <el-input  placeholder="输入关键字进行过滤"  v-model="filterText"> </el-input>
        <el-tree
          class="filter-tree"
          highlight-current
          :data="treeData"
          :props="defaultProps"
          :filter-node-method="filterNode"
          @node-click='nodeClick'
          ref="tree2">
        </el-tree>

      </el-aside>
  
  <el-container>
    <el-header style=" height:40px; text-align: right; font-size: 12px">
      <app-toolbar >
            <el-button type="primary" @click="handleAdd">新增</el-button>
      </app-toolbar>
    </el-header>
    
    <el-main>
      <!-- 表格  -->
        <AppTable  ref="resourceTable" :url="'menu/getMenuList'" :autoLoad='false'  :formParams="formParams" :showPagination='false'  :tableHeader="tableHeader"/>
    </el-main>
  </el-container>
</el-container>
</div>
</template>

<script>


const tableHeader = [ // 表头数据
  { prop: 'id', label: 'id', minWidth: '50px' },
  { prop: 'name', label: '资源名称' },
  { prop: 'path', label: '资源路径', minWidth: '100px' },
  { prop: 'componentUrl', label: '资源组件路径', minWidth: '100px' },
  { prop: 'oper', label: '操作', fixed: 'right', minWidth: '140px',
    oper: [
      { name: '编辑', type:'text', clickFun: ()=>{} },
      { name: '删除', type:'danger',clickFun: ()=>{} }
    ]
  }
]

  export default {
    name:'resource',
    data() {
      return {
        filterText: '',
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        formParams:{pid:''},
        tableHeader: tableHeader
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
    mounted() {
      this.loadNode()
    },
    methods: {
       filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
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
            
      },
    }
  };
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  
  

</style>



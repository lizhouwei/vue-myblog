<template>
<!--参考 https://www.cnblogs.com/sosoqi/p/9438549.html-->
<!--参考 https://github.com/zollero/el-search-table-pagination/blob/master/packages/search-table-pagination/src/main.vue-->
<!--参考 https://juejin.im/post/5a6941dc518825732258e321-->
<!-- prop: 字段名name, label: 展示的名称, fixed: 是否需要固定(left, right), minWidth: 设置列的最小宽度(不传默认值), oper: 是否有操作列
           oper.name: 操作列字段名称, oper.clickFun: 操作列点击事件, formatData: 格式化内容 
  -->
<!-- 加入template主要是有操作一栏， 操作一栏的内容是相同的， 数据不是动态获取的，不过我这里操作一栏的名字定死了（oper表示是操作这一列，否则就不是） -->

<div id ='show'>
<el-table v-loading.lock="loading"
          border 
          size="mini" 
          fit
          highlight-current-row 
          :data="tableData"
          :height="tableHeight"
          @select="(selection, row) => emitEventHandler('select', selection, row)"
          @select-all="selection => emitEventHandler('select-all', selection)"  
>
  <!--选择-->
  <el-table-column
          v-if="tableConfig.hasSelection"
          type="selection"
          width="55">
  </el-table-column>
  <!--序号-->
  <el-table-column
          v-if="tableConfig.hasIndex"
          type="index"
          width="55">
  </el-table-column>
  <template v-for="(th,key) in tableHeader">
    <el-table-column 
        v-if='!th.hide'
        :key="key"
        :prop="th.prop"
        :label="th.label"
        :fixed="th.fixed"
        :sortable="th.hasSort"
        :min-width="th.minWidth" 
        :align="th.align">
          <template slot-scope="scope">
            <div v-if="th.oper">
              <el-button v-for="(o, key) in th.oper" :key="key" @click=" () => emitEventHandler(o.clickFun,scope.row)" :type="o.type" size="small">{{o.name}}</el-button>
            </div>
             <span v-else-if="th.filter">
              {{ Vue.filter(th['filter'])(scope.row[th.prop]) }}
            </span>
            <span v-else-if="th.render">
              {{ th.render(scope.row) }}
            </span>
            <span v-else-if="th.formatter">
              {{ th.formatter(scope.row, scope.row[th.prop], scope.$index) }}
            </span>
            <span v-else>
              {{ scope.row[th.prop] }}
            </span>
          </template>
      </el-table-column>
    </template>
</el-table>
<div v-if="showPagination"
      style="margin-top: 10px;text-align: center;">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-sizes="pagination.pageSizes"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </div>
</div>
</template>
<script>


let props = {
  tableConfig : {// table 表格的控制参数
    type: Object,
    default: function (){
      return{
        hasSelection: false ,
        hasIndex: false   //是否有序列项
      }
    }
  } ,
  height: {type:[String, Number],default: '450px'},
  tableStyle: {  type: String, default: "width:100%;margin-top:20px;" },
  url: { type: String }, 
  formParams: {  type: Object},
  autoLoad: { type: Boolean, default: true },
  type: { type: String, default: 'remote', },
  tableHeader: { type: Array },
  showPagination: { 
    type: Boolean, 
    default: true
  }
}
 
export default {
  name: 'AppTable',
  data() {
    const _this = this
    return {
      tableHeight: this.showPagination?350:460,
      pagination: {
        pageSizes:[10,20,50,100],
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      loading: false,
      tableData: [],
      cacheLocalData: []
    }
  },
  props,
  computed: {
  },
  mounted() {
     const { type, autoLoad, formParams} = this
      if (type === 'remote' && autoLoad) {
        this.searchHandler(formParams)
      } 
  },
  methods:{
     searchHandler(formParams) {
      this.loading = true
      const { url,method,showPagination,pagination} = this
      if(showPagination){
        formParams = Object.assign( pagination ,formParams)
        this.$store.dispatch(url,formParams).then((res) => {
          this.tableData = res.data.list
          this.handlePagination(res.data) 
        }).catch(err => {
          this.$message.error(err)
        })
      }else{
        this.$store.dispatch(url,formParams).then((res) => {
          this.tableData = res
          }).catch(err => {
            this.$message.error(err)
        })
      }
      this.loading = false
    },
    emitEventHandler(event,row) {
        this.$emit(event, row)
    },
    handlePagination(data) {
      this.pagination.total = data.total
    },
    handleSizeChange(val){
      this.pagination.pageSize = val
      console.log(`每页 ${val} 条`)
      this.searchHandler()
    },
    handleCurrentChange(val){
      this.pagination.currentPage = val
      console.log(`当前页: ${val}`)
      this.searchHandler()
    }
  }
}

</script>

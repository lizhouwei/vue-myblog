<template>
<!--参考 https://www.cnblogs.com/sosoqi/p/9438549.html-->
<!--参考 https://github.com/zollero/el-search-table-pagination/blob/master/packages/search-table-pagination/src/main.vue-->
<!-- prop: 字段名name, label: 展示的名称, fixed: 是否需要固定(left, right), minWidth: 设置列的最小宽度(不传默认值), oper: 是否有操作列
           oper.name: 操作列字段名称, oper.clickFun: 操作列点击事件, formatData: 格式化内容 
  -->
<!-- 加入template主要是有操作一栏， 操作一栏的内容是相同的， 数据不是动态获取的，不过我这里操作一栏的名字定死了（oper表示是操作这一列，否则就不是） -->

<div id ='show'>
<el-table v-loading.lock="loading"
          ref="table"
          border 
          size="mini" 
          fit
          highlight-current-row 
          :data="tableData"
          :height="height"
          @select="(selection, row) => emitEventHandler('select', selection, row)"
          @select-all="selection => emitEventHandler('select-all', selection)"
          @row-click="(row, event, column) => emitEventHandler('row-click', row, column)"       
>

  <el-table-column type="index" align="center" fixed></el-table-column>
  <el-table-column v-for="(th, key) in tableHeader"
        :key="key"
        :prop="th.prop"
        :label="th.label"
        :fixed="th.fixed"
        :min-width="th.minWidth" 
        :align="th.align">
          <template slot-scope="scope">
            <div v-if="th.oper">
              <el-button v-for="(o, key) in th.oper" :key="key" @click="o.clickFun(scope.row)" type="text" size="small">{{o.name}}</el-button>
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
</el-table>
<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[15, 30, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="currentTotal">
    </el-pagination>
</div>
</template>
<script>


let props = {
  loading: { type: Boolean, default: false},
  height: {type:[String, Number],default: '350px'},
  highlightCurrentRow: Boolean,
  currentRowKey: [String, Number],
  rowClassName: [String, Function],
  rowStyle: [String, Function],
  rowKey: [String, Function],
  defaultExpandAll: Boolean,
  expandRowKeys: Array,
  defaultSort: Object,
  tooltipEffect: String,
  showSummary: Boolean,
  sumText: String,
  summaryMethod: Function,
  tableStyle: {  type: String, default: "width:100%;margin-top:20px;" },
  formOptions: {
    type: Object
  },
  autoLoad: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: 'remote',
    validator(value) {
      const types = ['remote', 'local']
      const validType = types.indexOf(value) !== -1
      if (!validType) {
        throw new Error(`Invalid type of '${value}', please set one type of 'remote' or 'local'.`)
      }
      return validType
    }
  },
  tableData: { type: Array },
  tableHeader: { type: Array },
}
 
export default {
  name: 'AppTable',
  data() {
    return {
      currentPage: 1,
      pageSize: 30,
      currentTotal: 0,
    }
  },
  props,
  computed: {
  },
  methods:{
    emitEventHandler(event,row) {
      this.$emit(event, row)
    },
    handleSizeChange(val){
      this.pageSize = val
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val){
      this.currentPage = val
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

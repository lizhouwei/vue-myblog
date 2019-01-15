<template>
<!--参考 https://www.cnblogs.com/sosoqi/p/9438549.html-->

  <!-- prop: 字段名name, label: 展示的名称, fixed: 是否需要固定(left, right), minWidth: 设置列的最小宽度(不传默认值), oper: 是否有操作列
           oper.name: 操作列字段名称, oper.clickFun: 操作列点击事件, formatData: 格式化内容 
  -->
  <!-- 加入template主要是有操作一栏， 操作一栏的内容是相同的， 数据不是动态获取的，不过我这里操作一栏的名字定死了（oper表示是操作这一列，否则就不是） -->
<div id ='show'>

<el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"  border size="mini" fit highlight-current-row height="350" 
          @row-dblclick="rowDblclick"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.3)">

      <el-table-column type="index" align="center" fixed></el-table-column>
      <el-table-column v-for="(th, key) in tableHeader"
        :key="key"
        :prop="th.prop"
        :label="th.label"
        :fixed="th.fixed"
        :min-width="th.minWidth" align="center">
          <template slot-scope="scope">
            <div v-if="th.oper">
              <el-button v-for="(o, key) in th.oper" :key="key" @click="o.clickFun(scope.row)" type="text" size="small">{{o.name}}</el-button>
            </div>
            <div v-else>
              <span v-if="!th.formatData">{{ scope.row[th.prop] }}</span>
              <span v-else>{{ scope.row[th.prop] | formatters(th.formatData) }}</span>
            </div>
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
export default {
    name: 'AppTable',
     data() {
      return {
        currentPage: 1,
        pageSize: 30,
        currentTotal: 0,
      }
    },
    props: {
      tableData: {
      type: Array,
      default: function () {
        return []
      }
    },
    tableHeader: {
      type: Array,
      default: function () {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    rowDblclick: {
      type: Function,
      default: (row, event, column) => { console.log('default: ' + row + '---' + event + '---' + column) }
    }
  },
  computed: {
         
  },
  methods:{
    formatters(val, format) {
      if (typeof (format) === 'function') {
        return format(val)
      } else return val
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

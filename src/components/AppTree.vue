<template>

<div id ='show'>
  <el-input  placeholder="输入关键字进行过滤"  v-model="filterText"> </el-input>
  <el-tree
          class="filter-tree"
          highlight-current
          :show-checkbox='checkbox'
          node-key="id"
          :data="treeData"
          :props="defaultProps"
          :filter-node-method="filterNode"
          :default-expanded-keys="expandedKeys"
          :default-checked-keys="eheckedKeys"
          @node-click=" (object,node,treeObject) => emitEventHandler('node-click', object, node)"
          :ref='reference'>
        </el-tree>
 
</div>
</template>
<script>


let props = {
  tableConfig : Object,
  url: { type: String },
  formParams: {  type: Object},
  autoLoad: { type: Boolean, default: true },
  type: { type: String, default: 'remote', },
  treeData: { type: Array },
  expandAll:{ type: Boolean, default: false },
  expandedKeys: { type: Array },
  eheckedKeys: { type: Array },
  checkbox:{ type: Boolean, default: false },
  reference:{ type: String, default: 'tree' },
}
 
export default {
  name: 'AppTree',
  data() {
     return {
       filterText: '',
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        checkedKeys:[]
    }
  },
  props,
  computed: {
  },
  watch: {
    filterText(val) {
      const {reference} = this
      this.$refs[reference].filter(val)
    }
  },
  mounted() {
  },
  methods:{
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1;
    },
    emitEventHandler(event,object) {
      this.$emit(event, object)
    },
    getCheckedKeys() {
      const {reference} = this
      this.checkedKeys =this.$refs[reference].getCheckedKeys()
     },
 
  }
}

</script>

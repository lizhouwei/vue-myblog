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
          :default-expand-all="expandAll"
          :default-expanded-keys="expandedKeys"
          :default-checked-keys="eheckedKeys"
          @node-click=" (object,node,treeObject) => emitEventHandler('node-click', object, node)" 
          ref="tree2">
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
    }
  },
  props,
  computed: {
  },
  watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
  mounted() {
  },
  methods:{
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    emitEventHandler(event,object) {
      this.$emit(event, object)
    }
  }
}

</script>

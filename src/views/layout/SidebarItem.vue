<template>
    <el-submenu v-if="item.children && item.children.length" :index="navIndex"> 
        <!-- 创建父级菜单 -->
        <template slot="title"> <font-awesome-icon v-if="item.icon" icon="item.icon" fixed-width />{{ item.name }}</template>
        <!-- 创建子菜单 -->
        <sidebar-item v-for="(subItem,i) in item.children" :key="navIndex+'-'+i" :navIndex="navIndex+'-'+i" :item="subItem" ></sidebar-item>
    </el-submenu>
    <el-menu-item v-else :index="item.path" :route="{path: item.path}"><i v-if="item.icon" class="item.icon"></i>{{ item.name }}</el-menu-item>
</template>
<script>
export default {
  name: 'SidebarItem',
  props: ['item','navIndex'],
  methods: {
    handleClick (e) {
      e.preventDefault()
      e.target.parentElement.classList.toggle('open')
    },
    addActive(e){
      e.preventDefault()
      e.target.parentElement.parentElement.parentElement.classList.add('open')
    }
  },
  mounted(){
    console.log(this.routes)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .wscn-icon {
        margin-right: 10px;
    }
    .hideSidebar .menu-indent{
        display: block;
        text-indent: 10px;
    }
</style>


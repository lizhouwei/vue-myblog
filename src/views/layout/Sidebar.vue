<template>
  <div class="side-nav">
    <el-menu  router ref="navbar" class="el-menu-vertical-demo" :default-active="defActive"  @select="selectMenu" @open="openMenu" @close="closeMenu" :collapse="isCollapse" unique-opened>
      <el-menu-item index='/home' :to="{ path: '/home' }">首页</el-menu-item>
      <sidebar-item v-for="(item, n) in navList" :item="item" :navIndex="String(n)" :key="n"></sidebar-item>
    </el-menu>
  </div>
</template>
<script>
import SidebarItem from './SidebarItem.vue';

import {mapState, mapGetters } from 'vuex';
export default {
  name: 'sidebar',
  components: { SidebarItem },
  computed: {
    ...mapState({
      navList: state => state.menu.sideNavList,
      collapse :state => state.menu.isCollapse,
    }),
    isCollapse() {
      return this.collapse
    },
    defActive(){
      return this.$route.path
    }
  },
  watch: {
    // 当通过TagNav来激活页面时也执行一次selectMenu
    // $route(){
    //   let path = this.$route.path
    //   let indexPath = this.$refs.navbar.items[path].keyPath
    //   this.selectMenu(path, indexPath)
    // }
  },
  methods: {
    selectMenu(index, indexPath){
      /**
      * 在选择父级菜单时自动关闭其下所有子菜单
      * 选择时获取点击菜单的父级index，并计算得到该index在已打开菜单中的索引值，
      * 关闭位于当前打开菜单中该索引值之后的全部菜单
      */
      let openedMenus = this.$refs.navbar.openedMenus
      let openMenuList
      // // 如果点击的是二级菜单，则获取其后从已经打开的菜单
      // if(indexPath.length > 1){
      //   let parentPath = indexPath[indexPath.length-2]
      //     openMenuList = openedMenus.slice(openedMenus.indexOf(parentPath)+1)
      // } else{
      //     openMenuList = openedMenus
      // }
            
      // 关闭菜单
      openMenuList = openedMenus.reverse()
      openMenuList.forEach((ele) => {
        this.$refs.navbar.closeMenu(ele)
      })
    },
    openMenu(){
      if(this.navMode == 'horizontal'){
        this.navBgShow = true
      }
    },
    closeMenu(){
      if(this.navMode == 'horizontal'){
        this.navBgShow = false
      }
    },
    closeAll(){
      console.log("背景遮罩图")
      let openMenu = this.$refs.navbar.openedMenus.concat([])
      openMenu = openMenu.reverse()
      openMenu.forEach((ele) => {
        this.$refs.navbar.closeMenu(ele)
      })
      if(this.navMode == 'horizontal'){
        this.navBgShow = false
      }
    }
  }
}
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
.menu-collapsed{
				flex:0 0 60px;

				width: 60px;

			}

			.menu-expanded{

				flex:0 0 230px;

				width: 230px;

			}
</style>

 



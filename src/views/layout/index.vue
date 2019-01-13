<template>
 <el-container class="layout-container">
  <el-header><AppHeader/></el-header> 
  <el-container>
    <el-aside :class="classObj"><Sidebar/></el-aside>
    <el-container>
      <el-main>
        <tag-nav></tag-nav>
        <keep-alive :include="tagNavList">
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
   </el-container>
 </el-container>
 </template>
<script>
import AppHeader from './Header'
import Sidebar from './Sidebar'
import AppAside from './Aside'
import AppFooter from './Footer'
import Breadcrumb from './Breadcrumb'
import TagNav from './TagNav'

import {mapState, mapGetters } from 'vuex';
export default {
  components: {
    AppHeader,
    Sidebar,
    AppAside,
    AppFooter,
    TagNav
  },
  computed: {
     ...mapState({
      collapse :state => state.menu.isCollapse,
      tagNavList: state => state.tagNav.cachedPageName
    }),
   classObj() {
      return {
        hideSidebar: this.collapse,
        openSidebar: !this.collapse,
       }
    }
  }
}
</script>

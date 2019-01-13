<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"  @select="handleSelect" >
      <el-menu-item  v-for="(item, index) in topNavList" :index='String(index)' :key='item.id'>
        {{item.name}}
      </el-menu-item>
    </el-menu>
</template>
<script>
import { mapState ,mapActions} from 'vuex'
export default {
  name: 'navbar' ,
  data() {
      return {
        activeIndex: '0',
        }
    },
  computed: {
    ...mapState({
      topNavList: state => state.menu.topNavList
    }),
  },
  methods: {
    ...mapActions({
      generateSideNavList: 'menu/generateSideNavList'
    }),
    handleSelect(key,keypath) {
         const activeNav = this.topNavList[key]
         this.generateSideNavList( {  pid: activeNav.id })
    }   
  }
}
</script>

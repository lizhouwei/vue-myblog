<template>
  <div class="sys-header">
      <el-row>
        <el-col :span="4">
            <div class="logo">
                <span>后台管理系统</span>
                </div>
            <div class="logo" style="float:right;">
               <span  @click.prevent="setcollapse"><font-awesome-icon icon="align-justify" fixed-width :class="classObj" />
                </span>
            </div>
        </el-col>
         <el-col :span="17"><navbar></navbar></el-col>
         <el-col :span="3"><userinfo></userinfo></el-col>
        </el-row>
    </div>
</template>

<script>
import { mapState ,mapActions} from 'vuex'
import navbar from './Navbar'
import userinfo from './User'

export default {
    name: 'appheader',
    computed: {
        ...mapState({
            collapse :state => state.menu.isCollapse,
        }),
        classObj() {
            return {
             hamburger: this.collapse,
            hamburgeractive: !this.collapse,
            }
        }
    },
    methods: {
        ...mapActions({
            toggleSideBar: 'menu/toggleSideBar'  
        }),
        setcollapse() {
            this.toggleSideBar()
        }
    },
    components: {
        navbar,
        userinfo 
  },

}
</script>
<style scoped>
.hamburger {
  display: inline-block;
  cursor: pointer;
  width: 20px;
  height: 20px;
  transform: rotate(90deg);
  transition: .38s;
  transform-origin: 50% 50%;
}

.hamburgeractive {
    cursor: pointer;
    transform: rotate(0deg);
    transition: .38s;
    transform-origin: 50% 50%;
}
</style>

<template>
    <div class="tag-nav">
       <scroll-bar ref="scrollBar">
            <el-tag  :key="index" :class="isActive(item) ? 'cur' : ''" v-for="(item, index) in cachedViewList"  closable :disable-transitions="false" @close="handleClose(item, index)">
                <router-link ref="tag"  :to="item.path">
                    {{item.title}} 
                </router-link>
        </el-tag>
        </scroll-bar>
    </div>

</template>

<script>
import ScrollBar from 'components/ScrollBar'
import {mapState, mapGetters } from 'vuex';

export default {
    data(){
        return {
            defaultPage: '/home' 
        }
    },
    computed: {
        ...mapState({
            cachedViewList: state => state.tagNav.openedPageList
        }),
    },
    mounted(){
        // 首次加载时将默认页面加入缓存
        this.addTagNav()
    },
    watch: {
        $route(){ // 如果路由有变化，会再次执行该方法
            this.addTagNav()
            this.scrollToCurTag()
        }
    },
    methods: {
        addTagNav(){
         // 如果需要缓存则必须使用组件自身的name，而不是router的name
            this.$store.commit("tagNav/addTagNav", {
                name: this.$router.currentRoute.meta.name,
                path: this.$route.path,
                title: this.$route.meta.name
            })
        },
        isActive(item){
            return item.path === this.$route.path
        },
        handleClose(item, index) {
       // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
         // 当关闭当前页面的Tag时，则自动加载前一个Tag所属的页面
            // 如果没有前一个Tag，则加载默认页面
            this.$store.commit("tagNav/removeTagNav", item)
            if(this.$route.path == item.path){
                if(index){
                    this.$router.push(this.cachedViewList[index-1].path)
                } else {
                    this.$router.push(this.defaultPage)
                    if(this.$route.path == "/home"){
                        this.addTagNav()
                    }
                }
            } 
        },
        scrollToCurTag(){
            this.$nextTick(() =>{
                for (let item of this.$refs.tag) {
                    if (item.to === this.$route.path) {
                        this.$refs.scrollBar.scrollToCurTag(item.$el)
                        break
                    }
                }
            })
        }
    },
    components: {ScrollBar}
}
</script>
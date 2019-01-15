import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import Auth from 'utils/auth'
import store from '../store'
import staticRoute from './staticRoute'
import whiteList from './whiteList'

const Layout = () => import(/* webpackChunkName: 'index' */ 'views/layout/index.vue')

function asyncRouter(asyncRouterMap) { //遍历后台传来的路由字符串，转换为组件对象
    if (!asyncRouterMap || asyncRouterMap.length === 0) {
        return []
    }
    
    const accessedRouters =[] 

    asyncRouterMap.forEach(permission => {
        const { type,path, componentUrl, name, icon, children } = permission
        if(path=='/home'){//不同的角色应该有不同的首页 , 暂时将首页静态化
            return 
        }
        const router = {
            path: type == 'root'? path : path.substring(path.lastIndexOf("/")+1),
            meta: {
                name: name,
                icon: icon
            },
            children : asyncRouter(children)
        }
      
        if(type=='root'|| path=='/home'){
            router.component = Layout
        }else if(componentUrl==''){
            router.component = {render (c) { return c('router-view') }}
        }else{
            //router.component = (resolve) =>  require([componentUrl], resolve)
            router.component = () => import(`views/${componentUrl}.vue`) //必须在变量前面加字符串
            //import(`${componentUrl}`) //这种不行
        }
 
        accessedRouters.push(router)

     })

    return accessedRouters
}

function initRoute(router){
    return new Promise((resolve) => {
        console.log("没有权限数据，正在获取")
        store.dispatch('auth/getPermissionTree').then((res ) => {
            const asynceouter = asyncRouter(res) 
            asynceouter.push({ path: '*', redirect: '/404', hidden: true })
            router.addRoutes(asynceouter)
            store.commit('auth/setRouters',asynceouter)
            resolve() 
        })
        console.log("路由生成完毕")
    })
}

NProgress.configure({ showSpinner: false });

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'hash',
    routes: staticRoute
})

// 路由跳转前验证
router.beforeEach((to, from, next) => {
    // 开启进度条
    NProgress.start();
    
    // 判断用户是否处于登录状态
    if (Auth.isLogin()) {
        // 如果当前处于登录状态，并且跳转地址为login，则自动跳回系统首页
        if (to.path === '/') {
            next({path: "/login", replace: true})
        }else if (to.path === '/login') {
            next({path: "/home", replace: true})
        } else {
            if(store.state.auth.addRouters.length==0){
                initRoute(router).then(()=>{
                    next({ ...to , replace: true })
                })
             }else{
                next()
            }
        }
    } else {
        // 如果是免登陆的页面则直接进入，否则跳转到登录页面
        if (whiteList.indexOf(to.path) >= 0) {
            next()
        } else {
            console.warn('当前未处于登录状态，请登录')
            next({path: "/login", replace: true})
            // 如果store中有token，同时Cookie中没有登录状态
            if(store.state.user.token){
                Message({
                    message: '登录超时，请重新登录'
                })
            }
            NProgress.done()
        }
    }   
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

export default router

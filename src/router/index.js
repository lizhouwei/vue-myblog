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

        const router = {
            path: path.substring(path.lastIndexOf("/")),
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
            router.component = () => import(`${componentUrl}`)
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
            asynceouter.forEach(arouter => {
                 console.log(arouter)
                 router.addRoutes(arouter)
            })
           
                console.log(router)
            
            //router.options.routes.push(asynceouter)
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
        if (to.path === '/login') {
            next({path: "/home", replace: true})
        } else if(to.path.indexOf("/error") >= 0){
            // 防止因重定向到error页面造成beforeEach死循环
            next()
        } else {
            if(router.options.routes.length <= 3){
                initRoute(router).then(() => {
                    next({ ...to }) // hack方法 确保addRoutes已完成
                })
            }else{
                next()
            }
        }
    } else {
        // 如果是免登陆的页面则直接进入，否则跳转到登录页面
        if (whiteList.indexOf(to.path) >= 0) {
            console.log('该页面无需登录即可访问')
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
    NProgress.done(); // 结束Progress
})

export default router
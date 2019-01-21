import axios from 'utils/ajax'

const state = {
    isCollapse: false,
    navList: [],
    topNavList: [],
    sideNavList: [],
    menuTree:[],
    flatMenuList:[]
    
}

const mutations = {
    setcollapse : state => {
        state.isCollapse  = !state.isCollapse
    },
    setMenuTree : (state, data) =>{
        state.menuTree = data
    },
    setFlatMenuList:(state, data)=>{
        state.flatMenuList = data
    },
    setNavList: (state, data) => {
        state.navList = data
    },
    setTopNavList: (state, data) => {
        state.topNavList = data
    },
    setSideNavList: (state, data) => {
        state.sideNavList = data
    },
}

const actions = {
    toggleSideBar({ commit }) {
        commit('setcollapse')
    },
     // 获取该用户的菜单列表
     getMenuTree({dispatch,commit},params){
        return new Promise((resolve) =>{
           axios({
               url: '/user/navlist',
               methods: 'post',
               data: {...params}
           }).then((res) => {
            commit('setMenuTree', res)
            dispatch("getFlatMenuList")
            resolve(res)
           })
       })
   },
   getMenuList({state},params){
        return new Promise((resolve) =>{
            const { pid} = params
            let permissionList = []
            state.flatMenuList.forEach((v)=>{
                if(v.pid == pid){
                    permissionList.push(v)
                }
            })
            resolve(permissionList)
        })
   },
   // 将菜单列表扁平化形成权限列表
   getFlatMenuList({commit,state}){
        return new Promise((resolve) =>{
            let permissionList = []
            // 将菜单数据扁平化为一级
            function flatNavList(arr){
                for(let v of arr){
                    permissionList.push(v)
                    if(v.children && v.children.length){
                        flatNavList(v.children)
                    }
                }
            }
            flatNavList(state.menuTree)
            commit('setFlatMenuList', permissionList)
            resolve()
        })
    },
   // 获取该用户的菜单列表
   generateTopNavList({dispatch,state}){
    return new Promise((resolve) =>{
        state.navList.map((nav) =>{
            if(nav.pid=='' && nav.type==='root'){
                state.topNavList.push(nav)
            }
        })
        if(state.topNavList.length>0){
            const pid = state.topNavList[0].id 
            dispatch("generateSideNavList",{pid: pid})
        }
        resolve()
    })
},
   // 获取该用户的菜单列表
   generateSideNavList({commit,state},params){
       const pid = params.pid
       return new Promise((resolve) =>{
           state.navList.map((res) =>{
             if(res.id===pid && res.children !='undefined'){
               commit('setSideNavList', res.children)
             }
           })
           resolve()
       })
   },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
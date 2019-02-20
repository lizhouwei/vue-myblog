
const state = {
    isCollapse: false,
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
    generateMenuList({commit,state},permissionList){
        console.log(permissionList)
        return new Promise((resolve) =>{
            commit('setMenuTree', permissionList)
            state.menuTree.map((nav) =>{
                if(nav.pid=='0'){
                    state.topNavList.push(nav)
                }
            })
            resolve()
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
   generateSideNavList({commit,state},params){
       const pid = params.pid
       return new Promise((resolve) =>{
           state.menuTree.map((res) =>{
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
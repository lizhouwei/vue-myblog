
const state = {
    isCollapse: false,
    navList: [],
    topNavList: [],
    sideNavList: []
}

const mutations = {
    setcollapse : state => {
        state.isCollapse  = !state.isCollapse
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
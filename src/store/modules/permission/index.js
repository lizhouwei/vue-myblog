import axios from 'utils/ajax'

const state = {
  permsList:[],
    
}

const mutations = {
}

const actions = {
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
     // 获取该用户的菜单列表
     savePermission({ commit},params){
        return new Promise((resolve) =>{
           axios({
               url: 'myblog/resource/savePermission',
               method: 'post',
               data: { ...params }
           }).then((res) => {
            
            resolve(res)
           })
       })
   },
     
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
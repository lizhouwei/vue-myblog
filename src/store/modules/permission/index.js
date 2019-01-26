import axios from 'utils/ajax'

const state = {
  permsList:[],
  permissionTree:[]
    
}

const mutations = {
    setPermissionTree : (state, data) =>{
        state.permissionTree = data
    }
}

const actions = {
     // 获取该用户的菜单列表
     permissionTree({dispatch,commit},params){
        return new Promise((resolve) =>{
           axios({
               url: 'myblog/resource/permsTree',
               method: 'post',
               data: {...params}
           }).then((res) => {
            commit('setPermissionTree', res.data)
            //dispatch("getFlatMenuList")
            resolve(res.data)
           })
       })
    },
    permissionList({commit},params){
        console.log('permissionList')
        return new Promise((resolve) =>{
            const { pid} = params
            let permissionList = []
            // 将菜单数据扁平化为一级
            function flatNavList(arr){
                for(let v of arr){
                    console.log(v.pid)
                    if(v.pid === pid ){
                        permissionList.push(v)
                    }else{
                        flatNavList(v.children)
                    }
                }
            }
            flatNavList(state.permissionTree)
            resolve(permissionList)
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
   delPermission({ commit},params){
    return new Promise((resolve) =>{
       axios({
           url: 'myblog/resource/delPermission',
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
import axios from 'utils/ajax'
const state = {
    // 用户名
    id:'123456',
    name: 'lizhouwei',
    role: {id:'1',name:'admin'},
}

const mutations = {
    setUser: (state, data) => {
        if(data==''){
            state.id = ''
            state.name = ''
            state.role = ''
            return
        }
        state.id = data.id
        state.name = data.name
        state.role = data.role
    }
}
const actions = {
    getUserList({ commit},params) {
        return new Promise((resolve) => {
            axios({
                url: 'myblog/user/userList',
                method: 'post',
                data: { ...params}
            }).then(res => {
                resolve(res)
            }) 
        })
    },
    getAllRole({ commit},params) {
        return new Promise((resolve) => {
            axios({
                url: 'myblog/user/allRoleList',
                method: 'post',
                data: { ...params}
            }).then(res => {
                resolve(res)
            }) 
        })
    },
    saveUser({ commit},params){
        return new Promise((resolve) =>{
           axios({
               url: 'myblog/user/saveUser',
               method: 'post',
               data: { ...params }
           }).then((res) => {
            
            resolve(res)
           })
        })
      },
      updateUser({ commit},params){
          return new Promise((resolve) =>{
          axios({
              url: 'myblog/user/updateUser',
              method: 'post',
              data: { ...params }
          }).then((res) => {
              resolve(res)
          })
      })
      },
    
      delUser({ commit},params){
      return new Promise((resolve) =>{
        axios({
            url: 'myblog/user/delUser',
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
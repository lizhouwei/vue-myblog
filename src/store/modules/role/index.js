import axios from 'utils/ajax'
const state = {
     
}

const mutations = {
     
}
const actions = {
  roleList({ commit},params) {
    return new Promise((resolve) => {
      axios({
          url: 'myblog/role/roleList',
          method: 'post',
          data: { ...params}
      }).then(res => {
            resolve(res)
      }) 
    })
  },
  saveRole({ commit},params){
    return new Promise((resolve) =>{
       axios({
           url: 'myblog/role/saveRole',
           method: 'post',
           data: { ...params }
       }).then((res) => {
        
        resolve(res)
       })
    })
  },
  updateRole({ commit},params){
      return new Promise((resolve) =>{
      axios({
          url: 'myblog/role/updateRole',
          method: 'post',
          data: { ...params }
      }).then((res) => {
          resolve(res)
      })
  })
  },

  delRole({ commit},params){
  return new Promise((resolve) =>{
    axios({
        url: 'myblog/role/delRole',
        method: 'post',
        data: { ...params }
    }).then((res) => {
      resolve(res)
    })
  })
},
permissionTree({ commit},params){
  return new Promise((resolve) =>{
    axios({
        url: 'myblog/role/findResourceByRoleId',
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
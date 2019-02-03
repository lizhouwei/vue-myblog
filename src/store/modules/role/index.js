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
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
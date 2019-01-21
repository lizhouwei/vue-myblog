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
    getUserList(params) {
        console.log(params)
        return new Promise((resolve) => {
            axios({
                url: '/user/userList',
                method: 'post',
                data: { ...params}
            }).then(res => {
                console.log(res)
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
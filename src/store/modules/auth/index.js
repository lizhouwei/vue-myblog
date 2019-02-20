import Cookies from 'js-cookie'
import axios from 'utils/ajax'
import Auth from 'utils/auth'

const state = {
    token: '',
    userId:'',
    roleId:'',
    permissionList: [],
    addRouters: [],
    newAction: [],
    allAction: []
}

const mutations = {
    
    setUserId: (state, data) => {
        state.userId = data
    },
    setRoleId: (state, data) => {
        state.roleId = data
    },
    setToken: (state, data) => {
        if(data){
            Auth.setToken(data)
            Auth.setLoginStatus()
        } else {
            Auth.removeToken()
            Auth.removeLoginStatus()
        }
        state.token = data
    },
    setPermissionList: (state, data) => {
        state.permissionList = data
    },
    setRouters: (state, routers) => {
        state.addRouters = routers;
    },
    setActions: (state, action) => {
        let path = action.path        
        let new_action_routers = action.routesTemplate        
        state.allAction.push(path)        
        state.newAction = new_action_routers    
    }
}

const actions = {
    // 邮箱登录
    loginByEmail({ commit }, userInfo) {
        console.log(userInfo)
        return new Promise((resolve) => {
            axios({
                url: '/login',
                method: 'post',
                data: {
                    ...userInfo
                }
            }).then(res => {
                if(res.code=='10000'){
                    res.login=true
                    commit('setToken', res.token)
                    commit('setUserId', res.user.id)
                    commit('setRoleId', res.user.role.id)
                    commit('user/setUser', res.user, { root: true })
                }
                resolve(res)
            })
        });
    },

    // 登出
    logout({commit}) {
        return new Promise((resolve) => {
            commit('setToken', '')
            commit('user/setuser', '', { root: true })
            commit('tagNav/removeTagNav', '', {root: true})
            resolve()
        })
    },

     // 重新获取用户信息及Token
    // TODO: 这里不需要提供用户名和密码，实际中请根据接口自行修改
    relogin({dispatch, commit, state}){
        return new Promise((resolve) => {
            // 根据Token进行重新登录
            let token = Cookies.get('token') 
            // 重新登录时校验Token是否存在，若不存在则获取
            if(!token){
                dispatch("getNewToken").then(() => {
                    commit('setToken', state.token)
                })
            } else {
                commit('setToken', token)
            }
            resolve()
        })
    },

    // 获取新Token
    getNewToken({commit, state}){
        return new Promise((resolve) => {
            axios({
                url: '/getToken',
                method: 'get',
                param: {
                    token: state.token
                }
            }).then((res) =>{
                commit("setToken", res.token)
                resolve()
            })
        })
    },
    // 获取该用户角色的菜单列表
    getPermissionTree({dispatch,commit,state},params){
        return new Promise((resolve) => { 
            axios({
            url: 'myblog/login/rolePremsTree',
            method: 'post',
            data:{id : '1'}
            }).then((res) => {
                const response = res.data
                commit('setPermissionList', response)
                dispatch("menu/generateMenuList",response, { root: true })
                resolve(response)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
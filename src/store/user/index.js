// 登录与注册模块
import {setToken,getToken,removeToken} from '@/utils/token'
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo,reqLogout} from '@/api';
const state = {
    code: '',
    token: getToken('TOKEN'),//初始状态让内存中的vuex找localStorage找token
    userInfo: {},
};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state, token) {
        state.token = token;
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    CLEAR(state) {
        // 把仓库中用户有关的信息清空
        state.token='';
        state.userInfo={};
        // 将本地存储的数据清空
        removeToken();
    }
};
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        // 获取验证码这个接口，把验证码直接返回了。正常情况应该是发送给用户手机
        let res = await reqGetCode(phone);
        console.log('res', res);
        if (res.code == 200) {
            commit("GETCODE", res.data)
            return 'ok';
        } else return Promise.reject(new Error('fail'));
    },
    // 用户注册
    async userRegister({ commit }, user) {
        let res = await reqUserRegister(user);
        if (res.code == 200) {
            return 'ok';
        } else return Promise.reject(new Error('Fail'));
    },
    // 用户登录[token]
    async userLogin({ commit }, data) {
        let res = await reqUserLogin(data);
        /* 服务器下发token，用户唯一标识符uuid
            将来经常通过token来找服务器要用户信息进行展示
        */
        //    用户登录成功且已经获取到了token
        if (res.code == 200) {
            commit('USERLOGIN', res.data.token);
            // 对token进行持久化存储
            setToken(res.data.token);
            return 'ok';
        } else return Promise.reject(new Error('Fail'));
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
        let res = await reqUserInfo();
        if (res.code == 200) {
            //    提交用户信息
            commit('GETUSERINFO', res.data);
            return 'ok';
        } else return Promise.reject(new Error('Fail'));
    },
    async userLogout({ commit}) {
     let res =await reqLogout();
     if(res.code == 200) {
        //  action中不能操作state，需要提交mutations修改state
        commit('CLEAR');
        return 'ok';
     }else return Promise.reject(new Error('Fail'));
    }
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters,
}
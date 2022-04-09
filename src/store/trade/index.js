import {reqAddressInfo,reqOrderInfo} from "@/api";
const state={
    addressList:[],
    orderInfo:{},
};
const mutations={
    GETUSERADDRESS(state,addressList){
        state.addressList = addressList;
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo = orderInfo;
    }
};
const actions={
    // 获取用户地址信息
    async getUserAddress({commit}){
        let res=await reqAddressInfo();
        if(res.code === 200){
            commit('GETUSERADDRESS', res.data);
            return 'ok';
        }else return Promise.reject(new Error('Fail'));
    },
    // 获取商品清单数据
    async getOrderInfo({commit}){
        let res=await reqOrderInfo();
        if(res.code == 200){
            commit('GETORDERINFO', res.data);
        }
    }
};
const getters={};

export default{
    state,
    mutations,
    actions,
    getters
}

import {reqGoodsInfo,reqAddOrUpdateShopCart} from "@/api";
import {getUUID} from "@/utils/uuid_token";
const state={
    goodsInfo:{},
    uuid_token:getUUID(),
};
const mutations={
    GETGOODSINFO(state,goodsInfo){
        state.goodsInfo=goodsInfo;
    }
};
const actions={
    // 获取产品信息action
    async getGoodsInfo({commit},skuId){
        let res=await reqGoodsInfo(skuId)
        if(res.code==200){
            commit('GETGOODSINFO',res.data);
        }
    },
    // 将产品添加到购物车中
    async addOrUpdateShopCart({commit},{skuId,skuNum}){//返回值是Promise,dispatch触发该函数也是返回Promise
        // 加入购物车返回的解构
        // 服务器写入数据成功后，并没有返回除code=200外的其他数据，
        // 因此不需要进行commit存储数据
        // console.log(skuId,skuNum);
        let res=await reqAddOrUpdateShopCart(skuId,skuNum);
        if(res.code==200){
            return 'ok';
        }else return Promise.reject(new Error('Fail'));

    },
};  
const getters={
    // 路径导航简化的数据
    categoryView(state){
        // 当goodsInfo还没有获取到，而页面需要用到categoryViw时，返回一个空对象
        return state.goodsInfo.categoryView||{};
    },
    // 监护按产品信息的数据
    skuInfo(state){
        return state.goodsInfo.skuInfo||{};
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state){
        return state.goodsInfo.spuSaleAttrList||[];
    }
};
export default{
    state,
    actions,
    mutations,
    getters,
}
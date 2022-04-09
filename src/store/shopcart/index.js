import {reqCartList,reqDeleteCartById,reqUpdateCheckedById} from "@/api"
const state={
    cartInfoList:[],
};
const mutations = {
    GETCARTLIST(state,cartInfoList){
        console.log('cartInfoList',cartInfoList);
        state.cartInfoList=cartInfoList;
    }
};
const actions ={
    // 获取购物车列表数据
    async getCartList({commit}){
        let res=await reqCartList();
        // 测试是否能获取个人购物车的数据
        console.log('res:',res);
        if(res.data.length==0)commit("GETCARTLIST",[]);//直接返回空数组
        else commit("GETCARTLIST",res.data[0].cartInfoList);
    },
    // 删除购物车某一个产品
    async deleteCartListBySkuId({commit},skuId){
        let res=await reqDeleteCartById(skuId);
        if(res.code==200){
            return 'ok';
        }else return Promise.reject(new Error('Fail'));
    },
    // 修改购物车某一个产品的选中状态
    async updateCheckedById({commit},{skuId,isChecked}){
        let res=await reqUpdateCheckedById(skuId,isChecked);
        if(res.code==200){
            return 'ok';
        }else return Promise.reject(new Error('Fail'));
    },
    // 删除全部勾选的产品
    deleteAllCheckedCart({dispatch,state}){
        // context：小仓库，commit（提交mutation，修改state），getters（计算属性）
        //dispatch（派发action），state（当前仓库数据）
        // 获取购物车中全部的产品--数组
        // console.log(state.cartInfoList); 
        let PromiseAll=[];//用于存储每次返回的Promise数组
        state.cartInfoList.forEach((item)=>{
            console.log('item.isChecked',item.isChecked,typeof item.isChecked);//isChecked是number
           let promise= item.isChecked==1?dispatch("deleteCartListBySkuId",item.skuId):'';
           PromiseAll.push(promise);

        });
        // 只有数组中全部Promise都成功才会成功，否则返回失败。
        return Promise.all(PromiseAll);//!!!
    },

    // 全选所有的产品
    setAllChecked({dispatch,state},isChecked){
        let PromiseAll=[];
        state.cartInfoList.forEach((item)=>{
            let promise=item.isChecked!=parseInt(isChecked)?dispatch("updateCheckedById",{skuId:item.skuId,isChecked}):'';
            PromiseAll.push(promise);
        });
        return Promise.all(PromiseAll);
    }

};
const getters={};


export default{
    state,
    mutations,
    actions,
    getters
}
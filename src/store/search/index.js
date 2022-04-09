import {reqGetSearchInfo} from '@/api';
// search模块的小仓库
const state = ()=>({
    searchList:{}
})
const mutations = {
    GETSEARCHINFO(state,searchList){
        state.searchList=searchList;
        // console.log('searchList',state.searchList);
    }
}
const actions = {
    async getSearchInfo({commit},params={}){
        // 当前这个reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
        // params形参，是当用户派发（dispatch）action的时候，第二个参数传递过来的，至少是一个空对象
      let res=  await reqGetSearchInfo(params)
    //   console.log('res',res.data);
      if(res.code==200){
          commit('GETSEARCHINFO',res.data);
      }
    }
}
// 计算属性，在项目中，为了简化数据而生:对state中的数据进行加工处理
// 可以把将来在组件中用到的数据简化以下，则以后用到数据时会简单很多
const getters = {
    // 该形参表示当前仓库的state
    goodsList(state){
        // 直接return state.searchList.goodsList有问题
        // 而假如网络不好，至少返回一个空数组
        return state.searchList.goodsList||[];
    },
    trademarkList(state){
        return state.searchList.trademarkList||[];
    },
    attrsList(state){
        return state.searchList.attrsList||[];
    },
    pageNo(state){
        return state.searchList.pageNo||0;
    },
    total(state){
        return state.searchList.total;
    },
    pageSize(state){
        return state.searchList.pageSize;
    }
}

export default{
    state,
    mutations,
    actions,
    getters,
}
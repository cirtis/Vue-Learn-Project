// home模块的小仓库
import { reqCategoryList,reqGetBannerList,reqFloorList} from "@/api"

const state =()=> ({
    // state中数据的默认初始值别瞎写
    categoryList:[],
    bannerList:[],
    floorList:[],
})
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList;
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList=bannerList;
    },
    GETFLOORLIST(state,floorList){
        state.floorList=floorList;
    }
}
const actions = {
    // 通过API里面的接口函数调用，向服务器发请求，获取数据
    async categoryList({commit}){
        let result=await reqCategoryList();
        if(result.code==200){
            // console.log('**',result.data);
            // console.log('hello');
            commit("CATEGORYLIST",result.data);
        }
    },
    async getBannerList({commit}){
        let  result=await reqGetBannerList();
        // console.log('res',result.data);
        if(result.code==200){
            commit("GETBANNERLIST",result.data);
        }
    },
    async getFloorList({commit}){
        let res=await reqFloorList();
        if(res.code==200){
            // 提交mutations
            commit("GETFLOORLIST",res.data);
        }
    }
}
const getters = {}

// 以对象的形式暴露出去
export default{
    state,
    mutations,
    actions,
    getters,
}
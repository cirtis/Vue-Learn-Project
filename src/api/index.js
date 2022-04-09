// 对所有api模块进行统一管理
import requests from './request'
import mockRequests from './mockRequest'

// 三级联动的接口
// /api/product/getBaseCategoryList get 无参数

export const reqCategoryList=()=>{
    // 发请求:axios发请求返回的是Promise对象
    return requests({url:'/product/getBaseCategoryList',method: 'GET'})
}

// 获取banner（首页轮播图接口）
export const reqGetBannerList=()=>mockRequests.get('/banner')

// 获取floor数据
export const reqFloorList=()=>mockRequests.get('/floor');

// 获取搜索模块的数据 请求地址/api/list 请求方式POST 参数:需要参数
// 箭头函数需要接收外部的参数.
// 当前这个接口（搜索模块获取数据），给服务器传递一个默认参数【至少是一个空对象】
export const reqGetSearchInfo=(params)=>requests({url:'/list',method:'POST',data:params});

// 获取产品详情信息的接口 URL：/api/item/{skuId} 请求方式get
export const reqGoodsInfo=(skuId)=>requests({url:`/item/${skuId}`,method:'GET'});

// 将产品添加到购物车中（获取更新某一个产品的个数）
// /api/cart/addToCart/{skuId}/{skuNum} POST
export const reqAddOrUpdateShopCart=(skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:"POST"});

// 获取购物车列表数据接口
// URL: /api/cart/cartList method:get
export const reqCartList=()=>requests({url:'/cart/cartList',method:'GET'});

// 删除购物车商品的接口
// URL /api/cart/deleteCart/{skuId} method:DELETE
export  const reqDeleteCartById=(skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'DELETE'});

// 修改商品选中状态
// URL：/api/cart/checkCart/{skuId}/{isChecked} method:GET
export const reqUpdateCheckedById=(skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'GET'});

// 获取验证码
// URL: /api/user/passport/sendCode/{phone} method:GET
export const reqGetCode=(phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'GET'});

// 注册
// URL /api/user/passport/register method:POST data需要带phone,code,password
export const reqUserRegister=(data)=>requests({url:'/user/passport/register',data,method:'POST'});

// 登录
// URL /api/user/passport//login method:POST data中带phone和password
export const reqUserLogin=(data)=>requests({url:'/user/passport//login',data,method:'POST'});

//获取用户信息【需要带着用户的token向服务器发请求】
// URL: /api/user/passport/auth/getUserInfo method:GET
export const reqUserInfo=()=>requests({url:'/user/passport/auth/getUserInfo',method:'GET'});

// 退出登录
//  URL: /api/user/passport/logout  method:GET
export const reqLogout=()=>requests({url:'/user/passport/logout',method:'GET'});

// 获取用户地址信息
// URL: /api/user/userAddress/auth/findUserAddressList  method:GET
export const reqAddressInfo=()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'GET'});

// 获取商品清单
// URL /api/order/auth/trade method:GET
export const reqOrderInfo=()=>requests({url:'/order/auth/trade',method:'GET'});

// 提交订单的接口
// URL: /api/order/auth/submitOrder?traderNo={traderNo} POST，其余商品数据通过data带||路径千万别写错
export const reqSubmitOrder=(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'POST'});

// 获取支付信息
// URL :/api/payment/weixin/createnNative/{orderId} GET
export const reqPayInfo=(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'GET'});

// 获取支付订单状态
// URL：/api/payment/weixin/queryPayStatus/{orderId} GET
export const reqPayStatus=(orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'GET'});

// 获取我的订单列表
// URL：/api/order/auth/{page}/{limit} GET page:页码，limit：每页显示的数量
export const reqMyOrderList=(page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'GET'});
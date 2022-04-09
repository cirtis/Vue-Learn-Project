import {v4 as uuidv4} from 'uuid';
// 要生成一个随机字符串，且生成后该字符串不再发生变化，游客身份持久存储
export const getUUID=()=>{//单例
    // 先从本地存储获取uuid（看一下本地存储中是否含有uuid）
    let uuid_token=localStorage.getItem("UUIDTOKEN")
    // 如果没有
    if(!uuid_token){
        // 生成游客临时身份
        uuid_token=uuidv4();
        // 本地存储一次
        localStorage.setItem('UUIDTOKEN',uuid_token);
    }
    return uuid_token;
}
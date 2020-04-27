import request from '../common/js/httpRequest'

interface loginParamsType {
    username:string,
    password:string,
}
// 获取token
export async function getToken(params:loginParamsType) {
    return request('/auth/oauth/token',{
        method:'POST',
        params:params
    })
}
// 获取用户信息
export async function getUserInfo(showMsg=false) {
    return request('/api/users/info',{
        method: 'GET',
        params:{showMsg}
    })
}
// 获取数据词典
export async function getDataDict(showMsg=false) {
    return request('/api/datadict',{
        method: 'GET',
        params:{showMsg}
    })
}

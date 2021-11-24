import request from '@/utils/request'
const api_name = '/ucenter/member'

export default {
    //用户修改密码
    updatepass(id,curpass,newpass){
        return request({
            url: `${api_name}/updatepass`,
            method: 'post',
            data: {
                id,
                curpass,
                newpass
            }
        })
    },
    //用户修改个人信息
    updateInfo(member){
        return request({
            url: `${api_name}/updateinfo/`,
            method: 'post',
            data: member
        })

    },
    //用户登录
    memberLogin(mobile, password){
        return request({
            url: `${api_name}/login`,
            method: 'post',
            data: {
                mobile,
                password
            }
        })
    },
    // 检查用户手机号是否存在
    checkMobileIsExist(mobile) {
        return request({
            url: `${api_name}/checkmobile/${mobile}/2`,
            method: 'get'
        })
    },
    // 根据token获取用户信息
    getInfoByToken(token) {
        return request({
            url: `${api_name}/info/`,
            method: 'post',
            params:{token}
        })
    },
    // 用户注册
    memberRegister(member) {
        return request({
            url: `${api_name}/register`,
            method:'post',
            data: member
        })
    }


}
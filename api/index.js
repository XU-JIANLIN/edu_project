import request from '@/utils/request'
const api_name = '/online/frontteachers'
export default {
    //获取权重较高的老师
    getGoodTeacher() {   
        return request({
            url: 'online/frontteachers',
            method: 'get'
        })
    },
    //获取最新课程
    getNewCourse() {   
        return request({
            url: 'online/frontcourse',
            method: 'get'
        })
    },
    //获取轮播图
    getLunbotu() {   
        return request({
            url: 'ucenter/websetting/getlunbotu',
            method: 'get'
        })
    }
    
}
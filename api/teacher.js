import request from '@/utils/request'
const api_name = '/online/frontteachers'
export default {

    //查询讲师列表
    getPageList(page, limit) {   
        return request({
            url: `${api_name}/${page}/${limit}`,
            method: 'get'
        })
    },
    getTeacherDetails(teacherId){
        return request({
            url: `${api_name}/${teacherId}`,
            method: 'get'
        })

    }
}
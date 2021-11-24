import request from '@/utils/request'
import request2 from '@/utils/request2'
import { getToken, setToken, removeToken } from '@/utils/auth'
const api_name = '/online/frontcourse'
export default {
  //查询课程列表
  getPageList(subjectid,page, limit) {   
    return request({
      url: `${api_name}/${subjectid}/${page}/${limit}`,
      method: 'get'
    })
  },
  //查询课程详情信息
  getById(courseId,auth) {
    
    return request({
        url: `${api_name}/${courseId}/${auth}`,
        method: 'get',
        headers: {'authorization': auth},//设置header信息
    })
}
}
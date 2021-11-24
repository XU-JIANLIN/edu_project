import request from '@/utils/request'
const api_name = '/online/subject'

export default {

    getAllSubject() {
        return request({
            url: `${api_name}`,
            method: 'get'
        })
  }

}
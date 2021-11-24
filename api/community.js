import request from '@/utils/request'

import { getToken, setToken, removeToken } from '@/utils/auth'
const api_name = '/ucenter/eduarticle'
export default {
  //查询文章列表
  getPageList(page, limit) {   
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get'
    })
  },
  //查询文章详情
  getArticleDetails(articleId){
    return request({
        url: `${api_name}/${articleId}`,
        method: 'get'
    })
  },
  submitContent(articleId,memberId,content){
    return request({
      url: '/ucenter/educomment',
      method: 'post',
      data: {
        articleId,
        memberId,
        content
    }
  })
  },
  saveArticle(article){
    return request({
      url: `${api_name}/article`,
      method: 'post',
      data:article
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
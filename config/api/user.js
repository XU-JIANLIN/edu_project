/**
 * 用户模块数据请求
 */

import Http from './core/http'

/**
 * 用户登录
 */
export const userLogin = {
  request: (data, success, fail) => {
    Http.postRes('/ucenter/member/login', data, success, fail)
  }
}

/**
 * 用户信息
 */
export const userInfo = {
  request: (success, fail) => {
    Http.postRes('/ucenter/member/info', '', success, fail)
  }
}

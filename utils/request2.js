// import axios from 'axios'
// import { Message, MessageBox } from 'element-ui'
// const store = require('@/store')
// import { getToken } from '@/utils/auth'
// const Cookie = process.client ? require('js-cookie') : undefined

// // 创建axios实例
// const service = axios.create({
//   baseURL: process.env.BASE_API, // api 的 base_url
//   timeout: 5000 // 请求超时时间
// })

// // request拦截器
// service.interceptors.request.use(
//   config => {
//     console.log(store);
//     if (Cookie) {
//       let token = Cookie.get('auth')
//       // console.log(token)
//       if (token) {
//         config.headers = {
//           'Authorization':`${token}`
//         }
//       }
//     }
//     return config
//   },
//   error => {
//     // Do something with request error
//     console.log(error) // for debug
//     Promise.reject(error)
//   }
// )

// export default service

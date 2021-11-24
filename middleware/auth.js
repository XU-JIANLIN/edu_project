// export default function ({route, req, res, redirect}) {
//     let redirectURL = '/login';
//     let cookieArr,token
//     if(req.headers.cookie){
//     // console.log(req.headers.cookie)
//         cookieArr = req.headers.cookie.split(";");

//          //获取token，判断用户是否登录
//         cookieArr.forEach((i) => {
//             let arr = i.split("=");
//             // console.log("获取token，判断用户是否登录")
//             if(i.indexOf("auth") >= 0){
//                 console.log(i)
//                 token = i
//             }
//         });
//     }
//     if(token){
//         console.log("登录成功")
//     }else{
//         console.log("未登录")
//         redirect(redirectURL)
//     }
// }
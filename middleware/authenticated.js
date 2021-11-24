import getCookie from '@/config/get-cookie'

export default function ({store, route, redirect, req}) {
    // If the user is not authenticated
    const {auth} = getCookie(req)
    // console.log('middle')
    // console.log(auth)
    if (auth) {
        console.log("已登录")
        store.commit('setAuth', auth)
        // return store.dispatch('getUserInfo')
    }else{
        // console.log("首页未登录")
        // console.log("用户未登录")
        return redirect('/login')
    }

  // const routePath = route.path
  // console.log(routePath)
  // const extraPath = ['/', '/en']
  // console.log(extraPath)
  // console.log(extraPath.indexOf(routePath) )
  // if ((!store.state.auth) && extraPath.indexOf(routePath) === -1) {
  //   return redirect('/')
  // }
}

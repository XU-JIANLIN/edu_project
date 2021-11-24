<template>
  <div class="in-wrap">
    <!-- 公共头引入 -->
    <header id="header">
      <section class="container">
        <h1 id="logo">
          <a href="#" title="谷粒学院">
            <img src="~/assets/img/logo.png" width="100%" alt="谷粒学院">
          </a>
        </h1>
        <div class="h-r-nsl">
          <ul class="nav">
            <router-link to="/" tag="li" active-class="current" exact>
              <a>首页</a>
            </router-link>
            <router-link to="/course" tag="li" active-class="current">
              <a>课程</a>
            </router-link>
            <router-link to="/teacher" tag="li" active-class="current">
              <a>名师</a>
            </router-link>
            <router-link to="/community" tag="li" active-class="current">
              <a>社区</a>
            </router-link>
            <!-- <li v-if="loginInfo.accesstoken" id="is-login-two" class="h-r-user">
            <router-link to="/member/course" tag="li" active-class="current">
              <a>我的</a>
            </router-link>
            </li> -->
          </ul>
          <!-- / nav -->
          <!-- 未登录显示 -->
          <ul class="h-r-login">
            <li v-if="!loginInfo.accesstoken" id="no-login">
                <a href="/login" title="登录">
                    <em class="icon18 login-icon">&nbsp;</em>
                    <span class="vam ml5">登录</span>
                </a>
                <a href="/register" title="注册">
                    <span class="vam ml5">注册</span>
                </a>
            </li>

            <!-- 登录成功显示 -->
            <li v-if="loginInfo.accesstoken" id="is-login-two" class="h-r-user">
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    <a href="#" title>
                          <img
                              :src="loginInfo.avatar"
                              width="30"
                              height="30"
                              class="vam picImg"
                              alt
                              >
                          <span id="userName" class="vam disIb" style="max-width:100%">{{ loginInfo.nickname }}</span>
                    </a><i class="el-icon-arrow-down el-icon--right"></i>
                  </span>

                  <el-dropdown-menu slot="dropdown">
                    <a href="/member/course" title="注册">
                      <el-dropdown-item>我的课程</el-dropdown-item>
                    </a>
                    <router-link to="/member" class="routerline">
                    
                      <el-dropdown-item>个人信息</el-dropdown-item>
                    </router-link>  
                    <!-- <el-dropdown-item>订单中心</el-dropdown-item> -->
                    <!-- <el-dropdown-item>积分商城</el-dropdown-item> -->
                    <el-dropdown-item divided>
                      <span style="display:block;" @click="logout">退出</span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
            </li>
            <!-- /未登录显示第1 li；登录后显示第2 li -->
        </ul>
          <aside class="h-r-search">
            <form action="#" method="post">
              <label class="h-r-s-box">
                <input type="text" placeholder="输入你想学的课程" name="queryCourse.courseName" value>
                <button type="submit" class="s-btn">
                  <em class="icon18">&nbsp;</em>
                </button>
              </label>
            </form>
          </aside>
        </div>
        <aside class="mw-nav-btn">
          <div class="mw-nav-icon"></div>
        </aside>
        <div class="clear"></div>
      </section>
    </header>
    <!-- /公共头引入 -->
      
    <nuxt/>

    <!-- 公共底引入 -->
    <footer id="footer">
      <section class="container">
        <div class>
          <h4 class="hLh30">
            <span class="fsize18 f-fM c-999">友情链接</span>
          </h4>
          <ul class="of flink-list">
            <li>
              <a href="http://www.gdpuxjl.top/" title="尚硅谷" target="_blank">许帅帅</a>
            </li>
          </ul>
          <div class="clear"></div>
        </div>
        <div class="b-foot">
          <section class="fl col-7">
            <section class="mr20">
              <section class="b-f-link">
                <a href="#" title="关于我们" target="_blank">关于我们</a>|
                <a href="#" title="联系我们" target="_blank">联系我们</a>|
                <a href="#" title="帮助中心" target="_blank">帮助中心</a>|
                <a href="#" title="资源下载" target="_blank">资源下载</a>|
                <span>Email：gdpuxjl@163.com</span>
              </section>
              <section class="b-f-link mt10">
                <span>©2020课程版权均归云上学所有 粤ICP备19102815号</span>
              </section>
            </section>
          </section>
          <aside class="fl col-3 tac mt15">
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wx-icon.png" alt>
              </span>
            </section>
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wb-icon.png" alt>
              </span>
            </section>
          </aside>
          <div class="clear"></div>
        </div>
      </section>
    </footer>
    <!-- /公共底引入 -->
  </div>
</template>
<script>
import "~/assets/css/reset.css";
import "~/assets/css/theme.css";
import "~/assets/css/global.css";
import "~/assets/css/web.css";
import member from '@/api/member'
import { getToken, setToken, removeToken } from '@/utils/auth'
import axios from 'axios'
export default {

  data() {
    return {
      token: '',
      loginInfo: {}
    }
  },
  created() {
    // console.log(this.$route.query.token)

    // TODO: 登录获取信息
    this.token = getToken()
    // console.log(this.token)
    if (this.token) {
      this.showInfo(this.token)
    }
  },

  methods: {
    showInfo() {
      member.getInfoByToken(this.token).then(response => {
        const loginInfo = response.data.data.loginInfo
        if (loginInfo) { // token未过期
          this.loginInfo = response.data.data.loginInfo
        } else {
          this.$router.push({ path: '/' })
        }
      })
    },
    logout(){
      //删除redis缓存
      axios.get('http://localhost:8000/ucenter/member/logout/')
            .then(response =>{
              console.log(response.data)
              if(response.data.code == 20000){
                this.$message({
                  type: 'success',
                  message: '退出成功!'
                })
                 //删除本地cookie
                removeToken()
                //退出成功
                location.reload()
                // this.reload()
              }else{
                this.$message({
                  type: 'error',
                  message: '网络异常，稍后再试!'
                })
              }
            })
     
    }
  }
}
</script>
<style >

  .el-dropdown-link {
    cursor: pointer;
    color: #68cb9b;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 文章内容 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">{{ articleVO.title}}</span>
        </h2><br><br>
        <h4 class="fl tac">
          <span class="c-333">作者：
            <el-image
              style="width: 30px; height: 30px"
              :src="articleVO.avatar"
              ></el-image>
            {{ articleVO.author }} 
            | 发布时间：{{ articleVO.gmtCreate }} | 阅读数： {{ articleVO.viewCount }}</span>
        </h4>
      </header>
      <div class="t-infor-wrap">
        <!-- 讲师基本信息 开始 -->
        <section class="fl t-infor-box c-desc-content">
        
        </section>
        <!-- /讲师基本信息 结束 -->
        <div class="clear"/>
      </div>
      <section class="mt30">
        <div>
            <!-- 内容 开始 -->
            <div>
              <div class="course-txt-body-wrap">
                <section class="course-txt-body">
                  <!-- 将内容中的html翻译过来 -->
                  <p v-html="articleVO.content">{{ articleVO.content }}</p>
                </section>
              </div>
            </div>
            <!-- /内容 结束 -->
        </div>
      </section>
      <section class="mt20">
        <div class="lh-menu-wrap">
            <menu id="lh-menu" class="lh-menu mt10 mr10">
                <ul>
                    <!--  -->
                    <li v-for="comment in articleVO.eduComments" :key="comment.id" class="lh-menu-stair">
                      <span class="c-333">
                        <el-image
                          style="width: 50px; height: 50px"
                          :src="articleVO.avatar"
                          ></el-image>
                      </span>
                      <span>{{ comment.author}}</span> : <span style="font-size:20px">{{ comment.content }}</span>
                      <div style="font-size:10px">{{ comment.gmtCreate }}</div>
                      <el-divider></el-divider>
                    </li>
                </ul>
            </menu>
          </div>
      </section>
      <section >
       <!-- 无数据提示 开始-->
            <section class="no-data-wrap" v-if="articleVO.eduComments.length==0">
                <em class="icon30 no-data-ico">&nbsp;</em>
                <span class="c-666 fsize14 ml10 vam">暂时没有评论，小编正在努力整理中...</span>
            </section>
            <!-- /无数据提示 结束-->
     <!-- 未登录显示 -->
        <span v-if="!loginInfo.accesstoken" id="no-login">
          <a href="/login" title="登录">
              <el-button type="warning">请先登录</el-button>
          </a>
        </span>
        <!-- 登录成功显示 -->
        <li v-if="loginInfo.accesstoken" id="is-login-two" class="h-r-user">
        <el-form ref="form"  label-width="100px">
          <el-form-item label="评论">
              <el-input v-model="content"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
          </el-form-item>
        </el-form>
        </li>
        <div class="clear"/>
        </section>

    </section>
    <!-- /文章内容 结束 -->
  </div>
</template>
<script>
import community from "@/api/community"
import member from '@/api/member'
import { getToken, setToken, removeToken } from '@/utils/auth'
import axios from 'axios'
export default {
  asyncData({ params, error }) {
    return community.getArticleDetails(params.id).then(response => {
      console.log(response.data.data);
      return { 
        articleVO: response.data.data
      }
    })
  },
  data() {
    return {
      token: '',
      loginInfo: {},
      content:''
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
    onSubmit(){
      if(this.content==''){
        this.$message({
              type: 'error',
              message: "不能为空"
            });
      }
  
      community.submitContent(this.articleVO.id,this.loginInfo.id,this.content).then(response =>{
        if(response.data.code==20000){
          this.$router.push({ path: "/community/"+this.articleVO.id })
          this.$message({
              type: 'success',
              message: "发表成功"
            });
        }else{
           this.$message({
              type: 'error',
              message: "网络异常"
            });
        }
      })

      
    }
  }
  
}

</script>
<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 文章内容 开始 -->
    <section class="container">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="文章标题" style="width:50%">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <!--// TODO: 等待整合富文本 -->
        
        <el-form-item label="文章内容" style="width:70%;  height:400px;">
          <el-input  type="textarea" rows=19 v-model="form.content" ></el-input>
        </el-form-item>



        <el-form-item>
          <el-button type="primary" @click="onSubmit">发布文章</el-button>
          <el-button @click="clear">清空</el-button>
        </el-form-item>
      </el-form>
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
  data() {
    return {
      token: '',
      loginInfo: {},
      content:'',
      form: {
          id:'',
          userId: '',
          author: '',
          avatar: '',
          title: '',
          content: '',
          viewCount: '',
          replyCount: ''
        },
      
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
      if(this.form.content==''){
        this.$message({
              type: 'error',
              message: "不能为空"
            });
      }else{

        this.form.userId = this.loginInfo.id
        this.form.author = this.loginInfo.nickname
        this.form.avatar = this.loginInfo.avatar
        this.form.viewCount = 1
        this.form.replyCount = 1
        

        community.saveArticle(this.form).then(response =>{
        if(response.data.code==20000){
          this.$router.push({ path: '/community/' })
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
    },
    clear(){
      this.form.title=''
      this.form.content=''
    }
  }
  
}

</script>

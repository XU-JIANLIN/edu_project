<template>
  <div class="main">
    <div class="title">
      <a class="active" href="/login">登录</a>
      <span>·</span>
      <a href="/register">注册</a>
    </div>

    <div class="sign-up-container">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
          <el-form-item  prop="mobile">
            <el-input placeholder="手机号" v-model.number="ruleForm.mobile" autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item  prop="password" >
            <el-input placeholder="密码" type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="btn">
            <el-button  class="sign-in-button" type="primary" @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>

      <!-- 更多登录方式 -->
      <div class="more-sign">
        <h6>社交帐号登录</h6>
        <ul>
          <li><a id="weixin" class="weixin" target="_blank" href="http://localhost:8082/api/ucenter/wx/login"><i class="iconfont icon-weixin"/></a></li>
          <li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfont icon-qq"/></a></li>
        </ul>
      </div>
    </div>


  </div>
</template>

<script>
import '~/assets/css/sign.css'
import '~/assets/css/iconfont.css'
import member from '@/api/member'
import { getToken, setToken, removeToken } from '@/utils/auth'

export default {
  layout: 'sign',
  data() {
      return {
        ruleForm: {
          mobile:'',
          password: '',
        },
        rules: {
          mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        }
      };
    },
  created() {
  },
  methods: {
    //表单验证提交
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert("login")
            this.login()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    //提交登录
    login(){
      // alert(this.ruleForm.mobile)
      let vm = this;
      member.memberLogin(this.ruleForm.mobile, this.ruleForm.password)
      .then( response =>{
          // alert(response.data.code)
          
          if(response.data.code === 20000){
            //登录成功，返回Token，将Token存入Cookie
            let token = response.data.data.token
            vm.$store.commit("setAuth", token)
            setToken(token)
            //提示信息，跳转页面
            this.$message({
              type: 'success',
              message: '登录成功!'
            })
            this.$router.push({ path: '/' });
          }else {
            this.$message({
              type: 'error',
              message: '手机号或密码错误!'
            })
          }
      })
    }

  }
}




</script>
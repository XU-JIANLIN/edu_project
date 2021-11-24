<template>
  <div class="main">
    <div class="title">
      <a href="/login">登录</a>
      <span>·</span>
      <a class="active" href="/register">注册</a>
    </div>

    <div class="sign-up-container">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
          
          <el-form-item  prop="nickname">
            <el-input placeholder="昵称" v-model="ruleForm.nickname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item  prop="mobile">
            <el-input placeholder="手机号" v-model.number="ruleForm.mobile" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item  prop="password" >
            <el-input placeholder="密码" type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="" prop="checkPass">
            <el-input placeholder="确认密码" type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="btn">
            <el-button  class="sign-up-button" type="primary" @click="submitForm('ruleForm')">注册</el-button>
          </el-form-item>
        <p class="sign-up-msg">
          点击 “注册” 即表示您同意并愿意遵守简书
          <br>
          <a target="_blank" href="http://www.jianshu.com/p/c44d171298ce">用户协议</a>
          和
          <a target="_blank" href="http://www.jianshu.com/p/2ov8x3">隐私政策</a> 。
        </p>
        </el-form>
      <!-- 更多注册方式 -->


      <div class="more-sign">
        <h6>社交帐号直接注册</h6>
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

export default {
  layout: 'sign',
  data() {
      var checkMobile = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号'));
        } else {
          if (!(/^1[34578]\d{9}$/.test(value))) {
          callback(new Error('请输入正确的手机号码!'));
          } else {
            this.checkIsExist(value)
            if(this.mobileisExist ==true){
              callback(new Error('该手机号码已存在!'));
            }
          }
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        mobileisExist: false,
        ruleForm: {
          nickname:'',
          mobile:'',
          password: '',
          checkPass: '', 
        },
        rules: {
          nickname: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          mobile: [
            { validator: checkMobile, trigger: ['change', 'blur'] }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      };
    },
  created() {
  },
  methods: {
    //检查手机号是否注册
    checkIsExist(mobile){
      member.checkMobileIsExist(mobile)
      .then( response => {
        if(response.data.code == 21){
          this.mobileisExist = true
        }else {
          this.mobileisExist = false
        }
        
      })
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.register()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    register(){
      // alert(this.ruleForm.nickname)
      member.memberRegister(this.ruleForm)
      .then( response =>{
          this.$message({
            type: 'success',
            message: '注册成功!'
          })
          this.$router.push({ path: '/login' });
      })
      .catch(response=>{
          this.$message({
            type: 'error',
            message: '注册失败!'
          })
      })
    }
  },
}
</script>


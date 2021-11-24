<template>
<el-container style="height: 620px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: #f8fafc; text-align:center">
    <el-upload
      class="avatar-uploader"
      action="http://localhost:8000/online/oss/fileupload?host=photo'"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="loginInfo.avatar" :src="loginInfo.avatar" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <p>点击头像进行更换</p>
  </el-aside>
    <!--主要中间区域-->
    <el-main>

      <el-tabs style="height: 400px; margin-top:-5px">
      <el-tab-pane label="用户管理">
        <div class="memberinfo">
          <div class="pull-left">昵称</div>
          <div class="pull-right">{{ loginInfo.nickname }}</div>
        </div>
        <div class="memberinfo">
          <div class="pull-left">性别</div>
          <div class="pull-right">{{ loginInfo.sex == 0? "未设置" : loginInfo.sex == '1'? "女" : '男'}}</div>
        </div>
        <div class="memberinfo">
          <div class="pull-left">年龄</div>
          <div class="pull-right">{{ loginInfo.age == 0 ? "未设置" : loginInfo.age}}</div>
        </div>
        <div class="memberinfo">
          <div class="pull-left">个性签名</div>
          <div class="pull-right">{{ loginInfo.sign == null? "未设置" : loginInfo.sign }}</div>
        </div>
        <div class="memberinfo">
            <el-button class="anniu" type="primary" @click="dialogFormVisible = true">编辑</el-button>
        </div>


        <el-dialog title="个人信息" :visible.sync="dialogFormVisible">
          <el-form :model="loginInfo">
            <el-form-item label="昵称" :label-width="formLabelWidth">
              <el-input v-model="loginInfo.nickname" autocomplete="off"></el-input>
            </el-form-item>
            
            <el-form-item label="年龄" :label-width="formLabelWidth">
              <el-input v-model="loginInfo.age" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="个性签名" :label-width="formLabelWidth">
              <el-input v-model="loginInfo.sign" autocomplete="off"></el-input>
              </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-radio-group v-model="loginInfo.sex">
                <el-radio :label="0">保密</el-radio>
                <el-radio :label="2">男</el-radio>
                <el-radio :label="1">女</el-radio>
              </el-radio-group>
              



            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="changeInfo()">确 定</el-button>
          </div>
        </el-dialog>

      </el-tab-pane>

      
      <el-tab-pane label="修改密码">
        <div class="sign-up-container">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
    
          <el-form-item  prop="curpassword" >
            <el-input placeholder="当前密码" type="password" v-model="ruleForm.curpassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item  prop="password" >
            <el-input placeholder="密码" type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="" prop="checkPass">
            <el-input placeholder="确认密码" type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="btn">
            <el-button  class="sign-up-button" type="primary" @click="submitForm('ruleForm')">确认</el-button>
          </el-form-item>
        </el-form>
    </div>
      </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>
<script>
import axios from 'axios'
import member from '@/api/member'
import { getToken, setToken, removeToken } from '@/utils/auth'


export default {
    // middleware: 'authenticated',
    data() {
      var validatecurPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入当前密码'));
        } else {
          
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

        imageUrl: 'https://gdpuxjl-edu.oss-cn-shenzhen.aliyuncs.com/default.png',
        ruleForm: {
          curpassword:'',
          password: '',
          checkPass: '', 
        },
        rules: {
          curpassword: [
            { validator: validatecurPass, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }, 
        token: '',
        loginInfo: {},
        dialogTableVisible: false,
        dialogFormVisible: false,
        formLabelWidth: '100px',
      
      };
    },
    created() {
    // console.log(this.$route.query.token)

    // TODO: 登录获取信息
    this.token = this.$cookies.get("auth")

    
    // console.log("获得的=" +this.$cookies.get("auth"))
    if (this.token) {
      this.showInfo(this.token)
    }else{
        this.$router.push("/login");
    }
  },

    
    methods: {
      showInfo() {
      console.log("用户查看信息")
      member.getInfoByToken(this.token).then(response => {
        const loginInfo = response.data.data.loginInfo
        if (loginInfo) { // token未过期
          this.loginInfo = response.data.data.loginInfo
          console.log(this.loginInfo)
        } else {
          this.$router.push({ path: '/' })
        }
      })
    },
      handleAvatarSuccess(res, file) {
        // this.loginInfo.avatar = res.data;
        alert(this.loginInfo.avatar)
        this.changeInfo()
        
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.changepass()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //修改密码
      changepass(){
        member.updatepass(this.loginInfo.id,this.ruleForm.curpassword,this.ruleForm.password)
        .then(response =>{
          console.log(response.data.code)
          if(response.data.code == 20000){
            
              //修改成功
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
          }else if(response.data.code == 20002){
            this.$message({
                type: 'error',
                message: '当前密码错误!'
              })
          }else{
            this.$message({
                type: 'error',
                message: '网络异常，晚点在试!'
              })
          }
        })
        this.ruleForm.curpassword="",
        this.ruleForm.password="",
        this.ruleForm.checkPass=""
      },
      //修改个人信息
      changeInfo(){
        member.updateInfo(this.loginInfo)
          .then(response =>{
            if(response.data.code == 20000){
            
              //修改成功
              this.confirm();
            }else{
              this.$message({
                type: 'error',
                message: '网络异常，晚点在试!'
              })
              this.dialogFormVisible = false
              
            }
          })
        
        

      },
      confirm() {
        this.$alert('修改成功', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.dialogFormVisible = false
            this.$router.go(0)
          }
        });
      }
    }

};
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 128px;
    height: 128px;
    display: block;
  }
  .memberinfo{
    float: left;
    margin-top: 20px;
    margin-left: 50px;
   
    
  }
  .memberinfo .pull-left{
    font-size: 15px;
    width: 120px; 
    color: #07111b;
    line-height: 20px;
    padding: 20px 0;
    text-align: center;
    background-color: #f3f5f7;
    float: left;
  }
  .memberinfo .pull-right{
    margin-left: 20px;
    font-size: 15px;
    width: 750px; 
    height: 58;
    color: #07111b;
    line-height: 20px;
    padding: 20px 0;
    float: left;
    border-bottom: 2px solid  #e7e7e7;
  }
  .memberinfo .anniu{
    margin-left: 820px;
  }

</style>

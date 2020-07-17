<template>
    <div class="login-container">
      <div class="login-titles">
        <span v-for="(item,index) in titleData" :key="index" :class="{titles:item.model}" @click="titleTab(item)">{{item.name}}</span>
      </div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Login Form dev</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user1" className="menu"></svg-icon>
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="pass1"></svg-icon>
        </span>
        <el-input
          ref="password"
          v-model="loginForm.password"
          placeholder="Password"
          name="password"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
      <el-form-item prop="passwords" v-if="this.loginType=='register'">
        <span class="svg-container">
         <i class="el-icon-service"></i>
        </span>
        <el-input
          ref="passwords"
          v-model="loginForm.passwords"
          placeholder="Passwords"
          name="passwords"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
       <el-form-item prop="email">
        <el-input
          ref="email"
          v-model="loginForm.email"
          placeholder="Email"
          name="email"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
         <el-button class="svg-container svg-containers" @click="getSms" :disabled="btnStatus">{{verCodeStatus}}</el-button>
      </el-form-item>
      <el-button type="primary" @click="handleLogin('loginForm')" class="login-button" :disabled="btnLoginStatus" >{{this.loginType==='login'?'登录':'注册'}}</el-button>
   </el-form>
  </div>
</template>
<script>
import { GetInfo, Register } from '@/api/login'
export default {
  data () {
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      titleData: [
        { name: '登录', model: true, type: 'login' },
        { name: '注册', model: false, type: 'register' }
      ],
      loginType: 'login', // 登录注册切换的变量值
      btnStatus: false, // 获取验证码按钮的状态改变
      verCodeStatus: '获取验证码', // 获取验证码的状态改变 //很多的变量的话可以声明到一个对象中，相当于声明的一个变量
      btnLoginStatus: true,
      timer: null,
      loginForm: {
        username: '',
        password: '',
        passwords: '',
        email: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      }
    }
  },
  computed: {

  },
  methods: {
    // tab切换
    titleTab (item) {
      this.titleData.forEach(ele => {
        ele.model = false
      })
      item.model = true
      if (item.type === 'register') {
        this.loginType = 'register'
      } else {
        this.loginType = 'login'
      }
      this.$refs.loginForm.resetFields() // 重置表单，切换内容清空
    },
    /**
     * 提交表单
     */
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (this.loginType === 'register') {
            this.register()
          } else if (this.loginType === 'login') {
            this.login()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /**
    * 登录接口
    */
    login () {
      let requestData = {
        username: this.loginForm.username,
        password: this.loginForm.password,
        code: this.loginForm.email,
        module: 'login'
      }
      this.$store.dispatch('Login', requestData).then(res => { // vuex里面返回了结果才可以链式调用
        this.$message({
          message: res.data.message,
          type: 'success'
        })
        this.$router.push({ name: 'about' })
      }).catch(err => {
        console.log(err)
      })
    },
    /**
    * 注册接口
    */
    register () {
      let data = {
        username: this.loginForm.username,
        password: this.loginForm.password,
        code: this.loginForm.email,
        module: 'register'
      }
      Register(data).then(res => {
        this.$message({
          message: res.data.message,
          type: 'success'
        })
        // 注册成功跳转到登陆,这一步是做的注册成功跳登陆的时候，内容清空
        this.titleTab(this.titleData[0])
        // 这一步做的是清空定时器,全局定义一个定时器
        this.clearCountdown()
      }).catch(err => {
        console.log(err)
      })
    },
    /**
     * 获取验证码
     */
    getSms () {
      // 这里做的判断是还不用走接口的时候去判断，减少性能的消耗
      if (this.loginForm.username === '') {
        this.$message({
          message: '用户名不能为空！！',
          type: 'error'
        })
        return false // 如果不满足，直接停止接下来的操作
      }
      let data = {
        username: this.loginForm.username,
        module: this.loginType
      }
      this.btnStatus = true // 一点击就改变，但是接口还没有请求
      this.verCodeStatus = '发送中' // 一点击就改变，但是接口还没有请求
      setTimeout(() => { // 模拟延时请求，因为要考虑到网络请求时间，异步
        GetInfo(data).then(res => { // 2s以后接口开始请求
          this.$message({
            message: res.data.message,
            type: 'success'
          })
          this.btnLoginStatus = false // 2s以后接口开始请求,获取成功以后登录按钮状态开启
          this.countdown(10) // 调取倒计时，被封装为一个方法
        }).catch(err => {
          console.log(err)
        })
      }, 2000)
    },
    /****
     * 获取验证码的倒计时，被封装为一个方法
     */
    countdown (number) {
      // 判断定时器是否存在，存在则需要清除,当不设置禁用的时候，不会被混乱加载
      if (this.timer) { clearInterval(this.timer) }
      // setTimeout 只会执行一次
      // setInterval 会不断的执行，需要条件才会停止
      // setTimeout(() => {
      //   console.log('setTimeout')
      // }, 1000)
      // setInterval(() => {
      //   console.log('setInterval')
      // }, 1000)
      let times = number
      this.timer = setInterval(() => {
        times--
        if (times <= 0) {
          clearInterval(this.timer)
          this.verCodeStatus = '重新获取'
          this.btnStatus = false
        } else {
          this.verCodeStatus = `倒计时${times}`
        }
      }, 1000)
    },
    /**
     * 切换时清除定时器
    */
    clearCountdown () {
      // 重置内容
      this.btnStatus = false
      this.verCodeStatus = '发送验证码'
      // 清除定时器
      clearInterval(this.timer)
    }
  }
}
</script>
<style lang="scss">
.login-container{
  $bg:#283443;
  $light_gray:#fff;
  $cursor: #fff;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 70%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>
<style lang="scss" scoped>
$bg:#2d3a4b;
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  box-sizing: border-box;
  .login-titles{
    text-align: center;
    cursor: pointer;
    span{
      display: inline-block;
      padding: 10px 20px;
      color: white;
      border: 1px solid;
    }
    .titles{
      background: black;
    }
  }
  .login-form {
    position: relative;
    width: 35%;
    max-width: 100%;
    padding: 60px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    .title-container{
      text-align: center;
      .title{
        font-size: 26px;
        font-weight: bold;
        color: #fff;
        margin: 40px 0;
      }
    }
    .svg-container {
      padding: 6px 5px 6px 5px;
      vertical-align: middle;
      width: 20px;
      display: inline-block;
    }
     .svg-containers {
      padding: 6px 5px 6px 5px;
      vertical-align: middle;
      width: 100px;
      display: inline-block;
    }
    .login-button{
      width: 100%;
      height: 47px;
    }
  }
}
</style>

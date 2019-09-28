<template>
  <div class="login-wrapper">
    <el-form label-width="80px" :model="loginForm" class="login-form">
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <el-form-item>
        <el-input ref="username" v-model="loginForm.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input ref="password" placeholder="请输入密码" v-model="loginForm.psw" show-password></el-input>
      </el-form-item>
       <el-button type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import { post } from '../request/http'
export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        name: '',
        psw: ''
      }
    }
  },
  methods: {
    handleLogin () {
      let username = this.loginForm.name.trim()
      let password = this.loginForm.psw.trim()
      if (!username || !password) {
        this.$message({
          message: '用户名或密码不能为空',
          type: 'warning'
        })
        return ''
      }
      let userInfo = {
        username,
        password
      }
      post('api/token/login', userInfo)
        .then((res) => {
          if (res.code === 400) {
            this.$message({
              message: '用户名或密码不正确',
              type: 'warning'
            })
          } else if (res.code === 200) {
            res = res.data
            localStorage.setItem('token', res.token)
            localStorage.setItem('id', res.id)
            localStorage.setItem('username', res.username)
            localStorage.setItem('headPic', res.headPic)
            this.$router.push('/home')
          }
        })
        .catch((err) => {
          console.log('登录出错', err)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.login-wrapper >>> .el-form-item__content
  margin-left: 0 !important
.login-wrapper
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background-image: linear-gradient(to top, #99acbe 5%, #a8b3bf 20%, #cfd7dd)
  .login-form
    width: 420px
    padding: 20px
    border-radius: 8px
    background: #ffffff
    border: 1px solid #cccccc
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
    .title-container
      line-height: 30px
      text-align: center
      margin-bottom: 30px
</style>

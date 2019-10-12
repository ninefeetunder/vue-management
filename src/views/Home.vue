<template>
  <div>
    <nav class="nav-container">
      <div class="nav-brand">
        <div class="headerpic-container">
          <img :src="userHeadPic" class="head-img" alt="">
        </div>
        <div class="user">
          你好, {{ username }} ~~
        </div>
      </div>
      <a href="#" class="logout" @click="handleLogout">注销</a>
    </nav>

    <!-- 侧边导航栏 -->
    <aside class="aside-container">
       <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        >
        <el-menu-item
          :index="item.route"
          @click.native="handleClick(item.route)"
          v-for="item in functionList"
          :key="item.id"
        >
          <i class="el-icon-menu"></i>
          <span slot="title">{{item.content}}</span>
        </el-menu-item>
        <!-- 下拉菜单 -->
        <el-submenu
          v-for="slideItem in slideMenuList"
          :key="slideItem.id"
          :index="slideItem.id"
        >
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{slideItem.content}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="subItem in slideItem.children"
              :index="subItem.route"
              :key="subItem.id"
              @click.native="handleClick(subItem.route)"
            >
              <i class="el-icon-s-platform"></i>
              <span slot="title">{{ subItem.content }}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </aside>
    <!-- 侧边栏显示的内容 -->
    <main class="content-container">
      <Animation>
        <router-view></router-view>
      </Animation>
    </main>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Animation from '../components/common/Animation'
export default {
  name: 'home',
  data () {
    return {
      functionList: [
        { content: '访问人数', route: '/home/vistors', id: 0 },
        { content: '说说控制', route: '/home/tweets', id: 1 },
        { content: '资料控制', route: '/home/materials', id: 2 },
        { content: '社团活动', route: '/home/activity', id: 4 },
        { content: '系统消息', route: '/home/message', id: 5 }
      ],
      slideMenuList: [
        {
          content: '认证相关',
          id: '6', // 组件的index必须是字符串
          children: [
            {
              content: '用户认证',
              route: '/home/approve',
              id: 7
            },
            {
              content: '成功认证',
              route: '/home/approvesucc',
              id: 8
            },
            {
              content: '失败认证',
              route: '/home/approvefail',
              id: 9
            }
          ]
        },
        {
          content: '控制面板',
          id: '7',
          children: [
            {
              content: '敏感字屏蔽',
              route: '/home/shield',
              id: 10
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleClick (route) {
      this.$router.push(route)
    },
    handleLogout () {
      localStorage.clear()
      this.clearUserInfo()
      this.$router.replace({ name: 'login' })
    },
    ...mapMutations(['clearUserInfo'])
  },
  computed: {
    ...mapState(['userHeadPic', 'username'])
  },
  components: {
    Animation
  }
}
</script>

<style lang="stylus" scoped>
.aside-container >>> .el-menu-item.is-active
  color: #54a0ff
.aside-container >>> .el-menu
  border-right: none
.nav-container
  display: flex
  height: 50px
  background: #222f3e
  justify-content: space-between
  position: fixed
  top: 0
  left: 0
  right: 0
  .nav-brand
    width: 250px
    height: 100%
    display: flex
    align-items: center
    justify-content: space-between
    font-weight: 700
    box-sizing: border-box
    padding: 0 50px
    color: #fff
    .headerpic-container
      width: 40px
      height: 40px
      border-radius: 50%
      background: url('https://c-ssl.duitang.com/uploads/item/201505/06/20150506213201_SsGic.thumb.700_0.jpeg') no-repeat center center
      background-size: cover
      .head-img
        height: 100%
        width: 100%
    .user
      overflow: hidden
      text-overflow: ellipsis
      white-space: nowrap
  .logout
    height: 100%
    padding: 0 30px
    display: flex
    align-items: center
    font-size: 14px
.aside-container
  position: fixed
  left: 0
  top: 50px
  bottom: 0
  width: 250px
  padding-top: 5px
  border-right: solid 1px #e6e6e6
  overflow: auto
.content-container
  padding: 15px
  position: fixed
  top: 50px
  bottom: 45px
  left: 250px
  right: 0
  overflow: auto

@media screen and (max-width: 768px)
  .aside-container
    display: none
  .content-container
    left: 0
</style>

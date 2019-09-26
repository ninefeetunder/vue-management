<template>
  <div>
    <nav class="nav-container">
      <a href="#" class="nav-brand">控制台</a>
      <input type="text" class="search" placeholder="Search">
      <a href="#" class="logout">注销</a>
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
      </el-menu>
    </aside>
    <!-- 侧边栏显示的内容 -->
    <main class="content-container">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      functionList: [
        { content: '访问人数', route: '/home/vistors', id: 0 },
        { content: '说说控制', route: '/home/tweets', id: 1 },
        { content: '资料控制', route: '', id: 2 },
        { content: '用户认证', route: '/home/approve', id: 3 },
        { content: '社团活动', route: '', id: 4 },
        { content: '系统消息', route: '', id: 5 }
      ]
    }
  },
  methods: {
    handleClick (route) {
      this.$router.push(route)
    }
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
  position: fixed
  top: 0
  left: 0
  right: 0
  .nav-brand
    width: 250px
    height: 100%
    display: flex
    align-items: center
    justify-content: center
    font-weight: 700
  .logout
    height: 100%
    padding: 0 30px
    display: flex
    align-items: center
    font-size: 14px
  .search
    border: none
    outline: none
    flex: 1
    padding: 20px
    background: #576574
.aside-container
  position: fixed
  left: 0
  top: 50px
  bottom: 0
  width: 250px
  padding-top: 5px
  border-right: solid 1px #e6e6e6;
.content-container
  padding: 15px
  position: fixed
  top: 50px
  bottom: 0
  left: 250px
  right: 0

@media screen and (max-width: 768px)
  .aside-container
    display: none
  .content-container
    left: 0
</style>

import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Login from './views/Login'
import Vistors from './components/Vistors'
import Tweets from './components/Tweets'
import Approve from './components/Approve'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'router-link-active',
  routes: [
    {
      path: '/',
      redirect: '/home/vistors'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      name: 'home',
      children: [ // 子路由必须也得加上 { requireAuth: true }
        {
          path: 'vistors',
          component: Vistors,
          name: 'vistors'
        },
        {
          path: 'tweets',
          component: Tweets,
          name: 'tweets',
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'approve',
          component: Approve,
          name: 'approve'
        }
      ]
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Login from './views/Login'
import Vistors from './components/Vistors'
import Tweets from './components/Tweets'
import Approve from './components/Approve'
import Materials from './components/Materials'
import Activity from './components/Activity'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'router-link-active',
  routes: [
    {
      path: '/home',
      redirect: '/home/vistors'
    },
    {
      path: '/login',
      component: Login,
      name: 'login'
    },
    {
      path: '/home',
      component: Home,
      name: 'home',
      meta: {
        requireAuth: true
      },
      children: [ // 子路由必须也得加上 { requireAuth: true }
        {
          path: 'vistors',
          component: Vistors,
          name: 'vistors',
          meta: {
            requireAuth: true
          }
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
          name: 'approve',
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'materials',
          component: Materials,
          name: 'materials'
        },
        {
          path: 'activity',
          component: Activity,
          name: 'activity'
        }
      ]
    }
  ]
})

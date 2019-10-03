import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import router from './router'
import store from './store'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import './assets/style/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'swiper/dist/css/swiper.css'

Vue.component('chart', ECharts)
Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

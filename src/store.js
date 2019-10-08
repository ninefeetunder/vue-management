import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let token = localStorage.getItem('token')
let id = localStorage.getItem('id')
let headPic = localStorage.getItem('headPic')
let username = localStorage.getItem('username')

export default new Vuex.Store({
  state: {
    token,
    userHeadPic: headPic,
    username,
    id
  },
  mutations: {
    getUserInfo (state, userInfo) {
      state.userHeadPic = userInfo.headPic
      state.username = userInfo.username
    },
    clearUserInfo (state) {
      state.token = ''
      state.id = ''
      state.headPic = ''
      state.username = ''
    }
  }
})

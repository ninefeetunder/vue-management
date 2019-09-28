import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let token = localStorage.getItem('token')
let id = localStorage.getItem('id')
let headPic = localStorage.getItem('headPic')
let username = localStorage.getItem('username')

export default new Vuex.Store({
  state: {
    token: token,
    userHeadPic: headPic,
    username: username,
    id: id
  },
  mutations: {
    getUserInfo (state, userInfo) {
      state.userHeadPic = userInfo.headPic
      state.username = userInfo.username
    }
  }
})

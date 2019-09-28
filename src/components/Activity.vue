<template>
  <div class="activity">
    <div class="card" v-for="item in activityList" :key="item.id">
      <img :src="item.pics" alt="">
      <div class="content">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { get } from '../request/http'
export default {
  name: 'activity',
  data () {
    return {
      activityList: [],
      currentPage: 1,
      token: localStorage.getItem('token')
    }
  },
  created () {
    this.getActivityData()
  },
  methods: {
    getActivityData () {
      get('api/activity/' + this.currentPage, { token: this.token })
        .then((res) => {
          // console.log(res)
          this.activityList = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.activity
  width: 100%
  height: 100%
  box-sizing: border-box
  display: flex
  flex-wrap: wrap
  overflow: auto
  .card
    box-shadow: 2px 2px 12px 0 rgba(0,0,0,.1)
    width: 23%
    padding-bottom: 26%
    height: 0
    margin-left: 20px
    margin-bottom: 10px
</style>

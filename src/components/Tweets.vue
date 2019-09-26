<template>
  <div class="tweets-info">
    <el-table
      :data="tweetsData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item>
              <div>
                <h3>发布内容</h3>
                <div class="tweet-content">
                  {{ props.row.allContent }}
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div>
                <h3>图片</h3>
                <div class="tweetimg-container">
                  <img
                    class="tweet-img"
                    v-for="(item, index) in props.row.pics"
                    :key="index"
                    :src="item"
                    alt=""
                  >
                </div>
              </div>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="用户 ID"
        prop="user_id">
      </el-table-column>
      <el-table-column
        label="用户名"
        prop="username">
      </el-table-column>
      <el-table-column
        label="发布内容"
        prop="section">
      </el-table-column>
      <el-table-column
        label="点赞人数"
        prop="likes">
      </el-table-column>
      <el-table-column
        label="发布时间"
        prop="time">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleTweetDelete(scope.$index, scope.row)">删除</el-button>
        </template>
    </el-table-column>
    </el-table>
    <Pagination @change-page="handleChangePage"></Pagination>
  </div>
</template>

<script>
import { get } from '../request/http'
import Pagination from '../components/common/Pagination'
export default {
  name: 'vistors',
  data () {
    return {
      dataList: [],
      currentPage: 1
    }
  },
  computed: {
    tweetsData () {
      let filterDataList = []
      this.dataList.forEach(item => {
        let obj = {}
        obj.user_id = item.user_id
        obj.username = item.username
        obj.section = item.content.length > 10 ? item.content.substr(0, 9) + '...' : item.content
        obj.allContent = item.content
        obj.likes = item.likes
        obj.time = item.time
        obj.tweetId = item.id + ''
        obj.pics = item.pics === '' ? [] : item.pics.split(',')
        filterDataList.push(obj)
      })
      return filterDataList
    }
  },
  created () {
    this.getTweetsData()
  },
  methods: {
    getTweetsData () {
      get('/api/talk/' + this.currentPage, { token: 'f7cb505f825455df5bbaad8cd180a8aa' })
        .then(res => {
          console.log(res)
          this.dataList = res.data
        })
        .catch(err => {
          console.log('说说信息获取失败' + err)
        })
    },
    handleTweetDelete (index, obj) {
      let requestObj = {
        token: 'f7cb505f825455df5bbaad8cd180a8aa',
        userId: '8',
        id: obj.tweetId
      }
      get('/api/talk/delete', requestObj)
        .then(res => {
          this.tweetsData.splice(index, 1)
        })
        .catch(err => {
          console.log('删除请求失败', err)
        })
      this.$notify({
        title: '删除成功',
        type: 'success'
      })
    },
    handleChangePage (pageIndex) {
      this.currentPage = pageIndex
      this.getTweetsData()
    }
  },
  components: {
    Pagination
  }
}
</script>

<style lang="stylus" scoped>
.tweets-info
  height: 100%
  overflow: auto
  .demo-table-expand
    font-size: 0
    .el-form-item
      margin-right: 0
      margin-bottom: 0
      width: 80%
.tweet-img
  height: 200px
  margin-left: 10px
</style>

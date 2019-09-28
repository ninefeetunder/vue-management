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
                  {{props.row.allContent | contentTesting}}
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div>
                <h3>图片</h3>
                <div class="tweetimg-container">
                  <img
                    class="tweet-img"
                    v-for="item in props.row.pics"
                    :key="item"
                    :src="item"
                    alt=""
                    @click="handleShowImg(props.row.pics)"
                  >
                </div>
              </div>
            </el-form-item>
            <el-form-item>
              <div>
                <h3>评论</h3>
                <div class="talks-container">
                  <p
                    v-for="(item, index) in props.row.talks"
                    :key="index"
                  >
                    <span>评论{{index + 1}}：</span>
                    <span>{{item.content}}</span>
                  </p>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        v-for="item in theadList"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop">
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
    <Gallery v-if="showGallery" :imgList="imgList" @close="handleCloseGallery"></Gallery>
  </div>
</template>

<script>
import { get } from '../request/http'
import Pagination from './common/Pagination'
import Gallery from './common/Gallery'
export default {
  name: 'vistors',
  data () {
    return {
      dataList: [],
      currentPage: 1,
      showGallery: false,
      imgList: [],
      theadList: [
        {
          label: '说说ID',
          prop: 'tweetId'
        },
        {
          label: '用户名',
          prop: 'username'
        },
        {
          label: '发布内容',
          prop: 'section'
        },
        {
          label: '点赞人数',
          prop: 'likes'
        },
        {
          label: '发布时间',
          prop: 'time'
        }
      ],
      token: localStorage.getItem('token'),
      id: localStorage.getItem('id') // 管理员id
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
        obj.pics = !item.pics ? [] : item.pics.split(',')
        obj.talks = item.talks
        filterDataList.push(obj)
      })
      return filterDataList
    }
  },
  created () {
    this.getTweetsData()
  },
  filters: {
    contentTesting (value) {
      if (!value) {
        return '---用户没有填写此项内容---'
      }
      return value
    }
  },
  methods: {
    getTweetsData () {
      get('/api/talk/' + this.currentPage, { token: this.token })
        .then(res => {
          console.log(res)
          this.dataList = res.data
        })
        .catch(err => {
          console.log('说说信息获取失败' + err)
        })
    },
    handleTweetDelete (index, item) {
      let requestObj = {
        token: this.token,
        userId: this.id,
        id: item.tweetId
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
    },
    handleShowImg (imgList) {
      this.imgList = imgList
      this.showGallery = true
    },
    handleCloseGallery () {
      this.showGallery = false
    }
  },
  components: {
    Pagination,
    Gallery
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

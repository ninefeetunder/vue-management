<template>
  <div class="approve_fail">
    <el-table
      :data="approveFailData"
      style="width: 100%">
      <el-table-column
        label="用户ID">
        <template slot-scope="scope">
          <span>{{scope.row.user_id}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="用户头像">
        <template slot-scope="scope">
          <img class="avatar" :src="scope.row.headPic" alt="">
        </template>
      </el-table-column>
      <el-table-column
        label="认证图片">
        <template slot-scope="scope">
          <img class="approve-img" :src="scope.row.pics" @click="handleShowGallery(scope.row.pics)" alt="">
        </template>
      </el-table-column>
      <el-table-column
        label="认证时间">
        <template slot-scope="scope">
          <span>{{scope.row.time}}</span>
        </template>
      </el-table-column>
    </el-table>
    <Pagination @change-page="handleChangePage" />
    <Gallery v-if="showImg" :imgList="imgList" @close="handleCloseGallery"/>
  </div>
</template>

<script>
import { get } from '../request/http'
import Pagination from './common/Pagination'
import Gallery from './common/Gallery'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      tableData: [],
      currentPage: 1,
      showImg: false,
      imgList: []
    }
  },
  computed: {
    ...mapState(['token']),
    approveFailData () {
      const approveData = []
      this.tableData.forEach(item => {
        let filterItem = {}
        filterItem.user_id = item.user_id
        filterItem.time = item.time
        filterItem.pics = item.pics
        filterItem.headPic = item.user.headPic
        approveData.push(filterItem)
      })
      return approveData
    }
  },
  created () {
    this.getApproveFailData()
  },
  methods: {
    getApproveFailData () {
      const reqObj = {
        token: this.token
      }
      get(`/api/approve/fail/${this.currentPage}`, reqObj)
        .then(res => {
          // console.log(res.data)
          this.tableData = res.data
        })
        .catch(err => {
          console.log('数据请求失败', err)
        })
    },
    handleChangePage (page) {
      this.currentPage = page
      this.getApproveFailData()
    },
    handleShowGallery (imgUrl) {
      this.showImg = true
      this.imgList.push(imgUrl)
    },
    handleCloseGallery () {
      this.showImg = false
      this.imgList = []
    }
  },
  components: {
    Pagination,
    Gallery
  }
}
</script>

<style lang="stylus" scoped>
  .approve_fail
    height: 100%
    overflow: auto
    .avatar
      width: 50px
      height: 50px
      border-radius: 100%
    .approve-img
      height: 100px
</style>

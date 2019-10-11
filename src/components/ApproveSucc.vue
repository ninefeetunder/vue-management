<template>
  <div class="approve_succ">
    <el-table
      :data="approveSuccData"
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
    <Gallery v-if="showImg" :imgList="imgList" @close="handleCloseGallery" />
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
    approveSuccData () {
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
    this.getApproveData()
  },
  methods: {
    getApproveData () {
      let reqData = {
        token: this.token
      }
      get(`/api/approve/suc/${this.currentPage}`, reqData)
        .then(res => {
          // console.log(res)
          this.tableData = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleChangePage (page) {
      this.currentPage = page
      this.getApproveData()
    },
    handleCloseGallery () {
      this.showImg = false
      this.imgList = []
    },
    handleShowGallery (imgUrl) {
      if (imgUrl === '') {
        return ''
      } else {
        this.showImg = true
        this.imgList.push(imgUrl)
      }
    }
  },
  components: {
    Pagination,
    Gallery
  }
}
</script>

<style lang="stylus" scoped>
  .approve_succ
    height: 100%
    .avatar
      width: 50px
      height: 50px
      border-radius: 100%
    .approve-img
      height: 100px
</style>

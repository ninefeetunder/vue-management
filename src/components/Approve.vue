<template>
  <div class="approve-info">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="ID">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
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
          <img class="approve-img" @click="showApproveImg(scope.row.imgUrl)" :src="scope.row.imgUrl" alt="">
        </template>
      </el-table-column>
      <el-table-column
        label="时间">
        <template slot-scope="scope">
          <span>{{scope.row.time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleApproveSucc(scope.$index, scope.row)">认证</el-button>
            <el-button
            size="mini"
            type="danger"
            @click="handleApproveFail(scope.$index, scope.row)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination @change-page="handleChangePage"></Pagination>
    <Gallery v-if="showImg" @close="closeApproveImg" :imgList="imgList" />
  </div>
</template>

<script>
import { get, post } from '../request/http'
import { mapState } from 'vuex'
import Pagination from '../components/common/Pagination'
import Gallery from './common/Gallery'
export default {
  name: 'approve',
  data () {
    return {
      data: [],
      currentPage: 1,
      msg: '', // 拒绝认证msg
      showImg: false, // 控制Gallery组件显示
      imgList: [] // 传递给Gallery组件的图片url数组
    }
  },
  computed: {
    ...mapState(['id', 'token']),
    tableData () {
      let filterList = []
      // 过滤信息
      this.data.forEach((item) => {
        let obj = {}
        if (item.pics === '') {
          obj.imgUrl = '未上传图片'
        } else {
          obj.imgUrl = item.pics
        }
        obj.id = item.id
        obj.user_id = item.user_id
        obj.headPic = item.user.headPic
        obj.time = item.time
        filterList.push(obj)
      })
      return filterList// 返回过滤完成的信息--数据为--(认证图片url--认证id)
    }
  },
  created () {
    this.getApproveData()
  },
  methods: {
    getApproveData () {
      get('/api/approve/all/' + this.currentPage, { token: this.token })
        .then((res) => {
          // console.log(res)
          if (res.code === 200) {
            this.data = res.data
          }
        })
        .catch((err) => {
          console.log('数据获取失败', err)
        })
    },
    handleApproveSucc (index, rowObj) { // rowObj为tableData中对应的一个数据对象
      let putObj = {
        token: this.token,
        id: rowObj.id,
        userId: rowObj.user_id,
        '_method': 'put'
      }
      post('api/approve/suc', putObj)
        .then((res) => {
          this.tableData.splice(index, 1)
          this.$notify({
            title: '认证成功',
            type: 'success'
          })
        })
        .catch((err) => {
          console.log('成功认证请求失败', err)
        })
    },
    handleApproveFail (index, rowObj) {
      this.$prompt('请输入拒绝理由', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          this.msg = value
          let putObj = {
            token: this.token,
            id: rowObj.id,
            msg: this.msg,
            userId: rowObj.user_id,
            '_method': 'put'
          }
          console.log(this.token)
          post('/api/approve/fail', putObj)
            .then(res => {
              this.$notify({
                title: '拒绝认证成功',
                type: 'success'
              })
              this.tableData.splice(index, 1)
            })
            .catch(err => {
              console.log('拒绝认证请求失败', err)
            })
        })
        .catch((err) => {
          console.log('取消成功', err)
        })
    },
    handleChangePage (pageIndex) {
      this.currentPage = pageIndex
      this.getApproveData()
    },
    showApproveImg (imgUrl) {
      this.imgList.push(imgUrl)
      this.showImg = true
    },
    closeApproveImg () {
      this.imgList = []
      this.showImg = false
    }
  },
  components: {
    Pagination,
    Gallery
  }
}
</script>

<style lang="stylus" scoped>
.approve-info
  height: 100%
  overflow: auto
  box-sizing: border-box
  .avatar
    width: 50px
    height: 50px
    border-radius: 100%
  .approve-img
    height: 100px
</style>

<template>
  <div class="approve-info">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="ID"
        width="300">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="认证图片"
        width="300">
        <template slot-scope="scope">
          <img class="approve-img" :src="scope.row.imgUrl" alt="">
        </template>
      </el-table-column>
      <el-table-column
        label="时间"
        width="300">
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
  </div>
</template>

<script>
import { get, post } from '../request/http'
import Pagination from '../components/common/Pagination'
export default {
  name: 'approve',
  data () {
    return {
      data: [],
      currentPage: 1,
      token: localStorage.getItem('token'),
      id: localStorage.getItem('id') // 管理员id
    }
  },
  computed: {
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
        obj.id = item.id + ''
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
          console.log(res)
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
        userId: this.id,
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
      let putObj = {
        token: this.token,
        id: rowObj.id,
        '_method': 'put'
      }
      post('/api/approve/fail', putObj)
        .then(res => {
          console.log(res) // 带处理
          this.$notify({
            title: '拒绝认证成功',
            type: 'success'
          })
        })
        .catch(err => {
          console.log('拒绝认证请求失败', err)
        })
    },
    handleChangePage (pageIndex) {
      this.currentPage = pageIndex
      this.getApproveData()
    }
  },
  components: {
    Pagination
  }
}
</script>

<style lang="stylus" scoped>
.approve-info
  height: 100%
  overflow: auto
  box-sizing: border-box
  .approve-img
    height: 100px
</style>

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
        label="认证时间">
        <template slot-scope="scope">
          <span>{{scope.row.time}}</span>
        </template>
      </el-table-column>
    </el-table>
    <Pagination @change-page="handleChangePage" />
  </div>
</template>

<script>
import { get } from '../request/http'
import Pagination from './common/Pagination'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      tableData: [],
      currentPage: 1
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
    }
  },
  components: {
    Pagination
  }
}
</script>

<style lang="stylus" scoped>
  .approve_fail
    height: 100%
    overflow: auto
</style>

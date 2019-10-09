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
    approveSuccData () {
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
    }
  },
  components: {
    Pagination
  }
}
</script>

<style lang="stylus" scoped>
  .approve_succ
    height: 100%
    overflow: auto
</style>

<template>
  <div class="approve-info">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="认证图片"
        width="300">
        <template slot-scope="scope">
          <img class="approve-img" :src="scope.row.imgUrl" alt="">
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleApprove(scope.$index, scope.row)">认证</el-button>
            <el-button
            size="mini"
            type="danger"
            @click="handleRejectApprove(scope.$index, scope.row)">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <Pagination></Pagination> -->
  </div>
</template>

<script>
import { get, post } from '../request/http'
import Pagination from '../components/common/Pagination'
export default {
  name: 'approve',
  data () {
    return {
      data: []
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
        obj.id = item.user_id + ''
        filterList.push(obj)
      })
      return filterList// 返回过滤完成的信息--数据为--(认证图片url--用户id)
    }
  },
  created () {
    get('/api/approve/all/1', { token: 'f7cb505f825455df5bbaad8cd180a8aa' })
      .then((res) => {
        // console.log(res)
        if (res.code === 200) {
          this.data = res.data
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    handleApprove (index, rowObj) { // rowObj为tableData中对应的一个数据对象
      console.log(rowObj.id)
      let putObj = {
        token: 'f7cb505f825455df5bbaad8cd180a8aa',
        id: '8',
        userId: rowObj.id
      }
      post('/api/approve/suc', putObj)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleRejectApprove (index, rowObj) {

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

<template>
  <div class="activity">
    <el-table
      :data="activityData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="活动名称: ">
                <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="活动地点: ">
              <span>{{ props.row.place }}</span>
            </el-form-item>
            <el-form-item label="活动图片: ">
              <img class="activity-img" :src="props.row.pics" alt="">
            </el-form-item>
            <el-form-item label="发布时间: ">
              <span>{{ props.row.time }}</span>
            </el-form-item>
            <el-form-item label="活动详情: ">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="活动名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="活动位置"
        prop="place">
      </el-table-column>
      <el-table-column
        label="活动时间"
        prop="time">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleActivityDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination @change-page="handleChangePage"></Pagination>
    <el-button type="primary" class="option-button" @click.native="handleOpenForm">发布活动</el-button>
    <submit-form v-if="showForm" @upload-succ="handleCloseForm"></submit-form>
  </div>
</template>

<script>
import { get, post } from '../request/http'
import { mapState } from 'vuex'
import Pagination from './common/Pagination'
import SubmitForm from './common/SubmitForm'
export default {
  name: 'activity',
  data () {
    return {
      activityList: [],
      currentPage: 1,
      showForm: false
    }
  },
  created () {
    this.getActivityData()
  },
  computed: {
    ...mapState(['token']),
    activityData () {
      const dataList = []
      this.activityList.forEach((item) => {
        let obj = {}
        obj.name = item.name
        obj.place = item.place
        obj.time = item.time
        obj.desc = item.descripe
        obj.pics = item.pics
        obj.id = item.id
        obj.userId = item.userId
        dataList.push(obj)
      })
      return dataList
    }
  },
  methods: {
    getActivityData () {
      get('api/activity/v/' + this.currentPage, { token: this.token })
        .then((res) => {
          // console.log(res)
          this.activityList = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleActivityDelete (index, item) {
      const obj = {
        userId: item.userId,
        id: item.id,
        token: this.token,
        '_method': 'delete'
      }
      post('/api/activity', obj)
        .then((res) => {
          console.log(res)
          this.activityData.splice(index, 1)
          this.$notify({
            title: '删除成功',
            type: 'success'
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleChangePage (pageIndex) {
      this.currentPage = pageIndex
      this.getActivityData()
    },
    handleOpenForm () {
      this.showForm = true
    },
    handleCloseForm () { // 发布和取消活动都调用这个方法关闭表单--取消发布时也会刷新页面
      this.showForm = false
      this.getActivityData()
    }
  },
  components: {
    Pagination,
    SubmitForm
  }
}
</script>

<style lang="stylus" scoped>
.activity >>> .el-form-item
  display: block
.activity >>> .el-form-item__label
  font-weight: 900
.activity
  height: 100%
  .activity-img
    height: 80px
    vertical-align: top
</style>

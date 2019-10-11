<template>
  <div class="materials">
    <el-table
      :data="materialsData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="上传用户: ">
                <span>{{ props.row.username }}</span>
            </el-form-item>
            <el-form-item label="考试名称: ">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="资料类型: ">
              <span>{{ props.row.type }}</span>
            </el-form-item>
            <el-form-item label="资料链接: ">
              <span>{{ props.row.url }}</span>
            </el-form-item>
            <el-form-item label="提取密码: ">
              <span>{{ props.row.secret }}</span>
            </el-form-item>
            <el-form-item label="资料详情: ">
              <span>{{ props.row.details }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="上传用户"
        prop="username">
      </el-table-column>
      <el-table-column
        label="考试名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="资料类型"
        prop="type">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleMaterialsDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination @change-page="handleChangePage"></Pagination>
  </div>
</template>

<script>
import { get, post } from '../request/http'
import { mapState } from 'vuex'
import Pagination from './common/Pagination'
export default {
  name: 'materials',
  data () {
    return {
      dataList: [],
      currentPage: 1
    }
  },
  computed: {
    ...mapState(['id', 'token']),
    materialsData () {
      let list = []
      this.dataList.forEach((item) => {
        let obj = {}
        obj.username = item.username
        obj.type = item.type
        obj.name = item.name
        obj.details = item.details
        obj.url = item.url
        obj.secret = item.secret
        obj.id = item.id
        list.push(obj)
      })
      return list
    }
  },
  created () {
    this.getMaterialsData()
  },
  methods: {
    getMaterialsData () {
      let data = {
        token: this.token
      }
      get('api/data/' + this.currentPage, data)
        .then((res) => {
          this.dataList = res.data
        })
        .catch((err) => {
          console.log('数据请求出错', err)
        })
    },
    handleMaterialsDelete (index, item) {
      let deleteData = {
        dataId: item.id,
        id: this.id,
        token: this.token,
        '_method': 'delete'
      }
      post('api/data', deleteData)
        .then(res => {
          this.materialsData.splice(index, 1)
          this.$notify({
            title: '删除成功',
            type: 'success'
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleChangePage (page) {
      this.currentPage = page
      this.getMaterialsData()
    }
  },
  components: {
    Pagination
  }
}
</script>

<style lang="stylus" scoped>
.materials >>> .el-form-item
  display: block
.materials >>> .el-form-item__label
  font-weight: 900
.materials
  height: 100%
</style>

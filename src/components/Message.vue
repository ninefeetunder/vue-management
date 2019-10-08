<template>
  <div class="message">
    <el-table
      :data="MessageData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="消息ID: ">
                <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="信息内容: ">
              <span>{{ props.row.content }}</span>
            </el-form-item>
            <el-form-item label="发送时间: ">
              <span>{{ props.row.time }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="消息ID"
        prop="id">
      </el-table-column>
      <el-table-column
        label="发送时间"
        prop="time">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleMessageDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" class="option-button" @click.native="handleOpenForm">推送消息</el-button>
    <message-form v-if="showForm" @upload-succ="handleCloseForm"></message-form>
  </div>
</template>

<script>
import { get, post } from '../request/http'
import { mapState } from 'vuex'
import MessageForm from './common/MessageForm'
export default {
  name: 'message',
  data () {
    return {
      dataList: [],
      showForm: false
    }
  },
  computed: {
    ...mapState(['id', 'token']),
    MessageData () {
      const messageList = []
      this.dataList.forEach((item) => {
        let obj = {}
        obj.content = item.content
        obj.time = item.time
        obj.id = item.id
        messageList.push(obj)
      })
      return messageList
    }
  },
  created () {
    this.getMessageData()
  },
  methods: {
    getMessageData () {
      get('api/push/system', { id: this.id, token: this.token })
        .then(res => {
          // console.log(res)
          this.dataList = res.data
        })
        .catch(err => {
          console.log('消息信息数据获取失败', err)
        })
    },
    handleMessageDelete (index, item) {
      const deleteObj = {
        token: this.token,
        id: this.id,
        pushId: item.id,
        '_method': 'delete'
      }
      post('api/push', deleteObj)
        .then(res => {
          if (res.code == 200) {
            this.$notify({
              title: '删除成功',
              type: 'success'
            })
            this.getMessageData()
          }
        })
        .catch(err => {
          console.log('消息删除失败', err)
        })
    },
    handleOpenForm () {
      this.showForm = true
    },
    handleCloseForm () {
      this.showForm = false
      this.getMessageData()
    }
  },
  components: {
    MessageForm
  }
}
</script>

<style lang="stylus" scoped>
.message >>> .el-form-item
  display: block
.message >>> .el-form-item__label
  font-weight: 900
.message
  width: 100%
  height: 100%
  overflow: auto
</style>

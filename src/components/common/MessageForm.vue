<template>
  <div class="form-container">
    <div class="submit-form">
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="消息内容">
          <el-input v-model="formLabelAlign.content"></el-input>
        </el-form-item>
        <el-form-item label="上传活动图片">
          <div class="upload-container">
            <input type="file" class="upload" ref="upload" @change="handleUpload">上传图片
          </div>
          <div class="show-img">
            <img class="upload-img" :src="uploadPics" alt="">
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">发布消息</el-button>
          <el-button @click="$emit('upload-succ')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { post } from '../../request/http'
import { mapState } from 'vuex'
import axios from 'axios'
export default {
  name: 'MessageForm',
  data () {
    return {
      labelPosition: 'top',
      uploadPics: '',
      formLabelAlign: {
        content: ''
      }
    }
  },
  computed: {
    ...mapState({
      id: 'id',
      token: 'token'
    })
  },
  methods: {
    handleUpload () {
      let formData = new FormData()
      formData.append('file', this.$refs.upload.files[0])
      axios.post('https://www.hut-idea.top/resources/upload', formData)
        .then(res => {
          // console.log(res)
          res = res.data
          setTimeout(() => {
            this.uploadPics = res.data
          }, 1000)
        })
        .catch(err => {
          console.log(err)
        })
    },
    onSubmit () {
      if (!this.formLabelAlign.content) {
        this.$message({
          message: '请输入正确的信息内容',
          type: 'warning'
        })
        return ''
      } else {
        const obj = {
          token: this.token,
          id: this.id,
          content: this.formLabelAlign.content.trim(),
          pics: this.uploadPics
        }
        post('/api/push', obj)
          .then((res) => {
            if (res.code == 200) {
              this.$notify({
                title: '信息发布成功',
                type: 'success'
              })
              this.$emit('upload-succ')
            }
          })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.form-container
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: rgba(0,0,0,.7)
  display: flex
  justify-content: center
  align-items: center
  z-index: 99
  .submit-form
    width: 500px
    padding: 30px
    background: #ffffff
    border-radius: 5px
.upload-container
  position: relative
  display: inline-block
  padding: 5px 10px
  line-height: 20px
  border-radius: 5px
  background: rgb(64,158,255)
  border: 1px solid #99D3F5
  color: #fff
  cursor: pointer
  margin-bottom: 10px
  .upload
    position: absolute
    top: 0
    right: 0
    left: 0
    bottom: 0
    width: 100%
    opacity: 0
.show-img
  width: 200px
  line-height: 0
  .upload-img
    height: 100px
    border-radius: 5px
</style>

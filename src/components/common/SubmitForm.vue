<template>
  <div class="form-container">
    <div class="submit-form">
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="名称">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-input v-model="formLabelAlign.region"></el-input>
        </el-form-item>
        <el-form-item label="活动描述">
          <el-input v-model="formLabelAlign.descripe"></el-input>
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
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="$emit('upload-succ')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { post, uploadFile } from '../../request/http'
import { mapState } from 'vuex'
export default {
  name: 'submitform',
  data () {
    return {
      labelPosition: 'top',
      uploadPics: '',
      formLabelAlign: {
        name: '',
        region: '',
        descripe: ''
      }
    }
  },
  computed: {
    ...mapState({
      userId: 'id',
      token: 'token'
    })
  },
  methods: {
    handleUpload () {
      let formData = new FormData()
      formData.append('file', this.$refs.upload.files[0])
      uploadFile('/resources/upload', formData)
        .then(res => {
          setTimeout(() => {
            this.uploadPics = res.data
          }, 500)
        })
        .catch(err => {
          console.log('文件上传失败', err)
          this.$message({
            messsage: '上传失败',
            type: 'error'
          })
        })
    },
    onSubmit () {
      if (!this.formLabelAlign.name || !this.formLabelAlign.region || !this.formLabelAlign.descripe || !this.uploadPics) {
        this.$message({
          message: '请输入正确的活动信息',
          type: 'warning'
        })
        return ''
      } else {
        const obj = {
          token: this.token,
          userId: this.userId,
          name: this.formLabelAlign.name.trim(),
          place: this.formLabelAlign.region.trim(),
          descripe: this.formLabelAlign.descripe,
          pics: this.uploadPics
        }
        post('/api/activity', obj)
          .then((res) => {
            if (res.code == 200) {
              this.$notify({
                title: '活动发布成功',
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

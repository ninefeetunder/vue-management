<template>
  <div class="swiper">
    <div class="show-swiper">
      <h2>当前展示图片</h2>
      <el-carousel width="500px">
        <el-carousel-item v-for="item in showSwiperList" :key="item.uid">
          <img :src="item.url" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="upload-swiper">
      <div class="upload-container">
        <input type="file" class="upload" ref="upload" @change="handleUpload">选择上传图片
      </div>
      <el-upload
        :multiple="true"
        :on-remove="handleRemove"
        class="upload-demo"
        action="#"
        :file-list="fileList"
        list-type="picture">
      </el-upload>
      <el-button v-show="fileList.length" @click.native="handleSendFileList">替换图片</el-button>
    </div>
  </div>
</template>

<script>
import { get, uploadFile, post } from '../request/http'
import { mapState } from 'vuex'
export default {
  name: 'swiper',
  data () {
    return {
      fileList: [],
      showSwiperList: []
    }
  },
  computed: {
    ...mapState(['token']),
    uploadHeader () {
      return {
        method: 'POST'
      }
    }
  },
  created () {
    this.getSwiper()
  },
  methods: {
    getSwiper () {
      let swiperData = {
        token: this.token
      }
      get('/api/banner/', swiperData)
        .then(res => {
          res.data = JSON.parse(res.data)
          this.showSwiperList = res.data
        })
        .catch(err => {
          console.log('轮播图片获取失败', err)
        })
    },
    handleUpload () {
      // 上传图片的函数
      let formData = new FormData()
      formData.append('file', this.$refs.upload.files[0])
      uploadFile('/resources/upload', formData)
        .then(res => {
          let imgItem = {}
          imgItem.url = res.data
          setTimeout(() => {
            this.fileList.push(imgItem)
          }, 150)
        })
        .catch(err => {
          console.log('文件上传失败', err)
          this.$message({
            message: '上传失败',
            type: 'error'
          })
        })
    },
    handleSendFileList () {
      // 替换图片的函数
      let pics = JSON.stringify(this.fileList)
      let sendData = {
        token: this.token,
        pics
      }
      post('/api/banner/', sendData)
        .then(res => {
          this.fileList = []
          this.getSwiper()
          this.$message({
            message: '图片替换成功',
            type: 'success'
          })
        })
        .catch(err => {
          console.log('轮播图文件信息上传失败', err)
          this.$message({
            message: '图片替换失败',
            type: 'error'
          })
        })
    },
    handleRemove (file, flieList) {
      let index = 0;
      for (let i in this.fileList) {
        if (this.fileList[i].uid === file.uid) {
          index = i
        }
      }
      this.fileList.splice(index, 1)
    }
  }
}
</script>

<style lang="stylus" scoped>
.swiper
  width: 500px
  .show-swiper
      margin-bottom: 30px
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
</style>

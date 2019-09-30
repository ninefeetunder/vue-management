<template>
  <div class="gallery-wrapper" @click="handleCloseGallery">
    <div class="gallery">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide
        v-for="imgUrl in imgList"
        :key="imgUrl"
        >
        <img class="show-img" :src="imgUrl" alt="">
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  name: 'gallery',
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        paginationType: 'fraction'
      }
    }
  },
  methods: {
    handleCloseGallery () {
      this.$emit('close')
    }
  },
  props: {
    imgList: Array
  }
}
</script>

<style lang="stylus" scoped>
.gallery >>> .swiper-container
  width: 100%
  height: 90%
  text-align: center
  color: #fff
.gallery-wrapper
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: rgba(0,0,0,.7)
  z-index: 999
  .gallery
    width: 600px
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    .show-img
      width: 100%
</style>

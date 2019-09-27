<template>
  <div class="pagination-wrapper">
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="10000">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  methods: {
    handleCurrentChange (pageIndex) {
      this.$emit('change-page', pageIndex)
    }
  }
}
</script>

<style lang="stylus" scoped>
.pagination-wrapper
  padding: 10px 0
  position: fixed
  left: 250px
  bottom: 10px
</style>

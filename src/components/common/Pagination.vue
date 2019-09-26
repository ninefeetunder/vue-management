<template>
  <div class="pagination-wrapper">
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="100">
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
  padding: 20px 0
</style>

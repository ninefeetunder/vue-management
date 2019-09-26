<template>
  <div class="pagination-wrapper">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="1000">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    currentPage: Number
  }
}
</script>

<style lang="stylus" scoped>
.pagination-wrapper
  padding: 20px 0
</style>

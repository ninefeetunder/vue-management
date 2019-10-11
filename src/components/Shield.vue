<template>
  <div class="shield">
    <div class="add_shield">
      <el-input
        v-model="keyword"
        class="shield_input"
        placeholder="请输入屏蔽字符"
      ></el-input>
      <el-button
        class="add_button"
        type="primary"
        @click.native="handleShieldKeyword"
      >
        点击屏蔽
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    handleShieldKeyword () {
      console.log(this.keyword)
    }
  }
}
</script>

<style lang="stylus" scoped>
.add_shield
  margin-bottom: 20px
  .shield_input
    width: 300px
  .add_button
    margin-left: 30px
</style>
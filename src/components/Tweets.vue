<template>
  <div class="tweets-info">
    <el-table
      :data="tweetsData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="用户ID">
              <span>{{ props.row.user_id }}</span>
            </el-form-item>
            <el-form-item label="发布内容">
              <span>{{ props.row.content }}</span>
            </el-form-item>
            <el-form-item label="点赞人数">
              <span>{{ props.row.likeNum }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="用户 ID"
        prop="user_id">
      </el-table-column>
      <el-table-column
        class="content"
        label="发布内容"
        prop="content">
      </el-table-column>
      <el-table-column
        label="点赞人数"
        prop="likeNum">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'vistors',
  data () {
    return {
      tweetsData: [
        {
          user_id: 1,
          content: '这是一条说说这是一条说说这是一条说说这是一条说说这是一条说说这是一条说说这是一条说说这是一条说说这是一条说说这是一条说说这是一条说说这是一条说说这是一条说说这是一条说说这是一条说说',
          likeNum: 100
        },
        {
          user_id: 2,
          content: '这是又一条说说',
          likeNum: 10
        },
        {
          user_id: 3,
          content: '这还是一条说说',
          likeNum: 80
        }
      ]
    }
  },
  methods: {
    handleDelete (index, obj) {
      // console.log(obj.content)
      // this.$notify({
      //   title: '删除成功',
      //   type: 'success'
      // })
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>

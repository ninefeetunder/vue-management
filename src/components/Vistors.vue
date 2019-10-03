<template>
  <div class="vistors-info">
    <h3 class="title">今日用户访问量</h3>
    <chart ref="chart1" :options="orgOptions" :auto-resize="true"></chart>
  </div>
</template>

<script>
import { get } from '../request/http'
import { mapState } from 'vuex'
export default {
  name: 'vistors',
  data () {
    return {
      orgOptions: {},
      chartData: {},
      chartlineY: []
    }
  },
  watch: {
    chartData () {
      const list = []
      for (let i in this.chartData) {
        list.push(this.chartData[i].visitors)
      }
      this.chartlineY = list
      this.drawnLine()
    }
  },
  computed: {
    ...mapState(['token']),
    chartlineX () {
      const list = []
      for (let i = 0; i <= 23; i++) {
        list.push(i + 'H')
      }
      return list
    }
  },
  created () {
    this.getChartData()
  },
  methods: {
    drawnLine () {
      this.orgOptions = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.chartlineX
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.chartlineY,
          type: 'line',
          areaStyle: {}
        }]
      }
    },
    getChartData () {
      const obj = {
        token: this.token
      }
      get('/api/visit/', obj)
        .then(res => {
          this.chartData = res.data
        })
        .catch(err => {
          console.log('获取访客数据失败', err)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.vistors-info
  height: 100%
  .title
    text-align: center
  .echarts
    width: 100%;
    height: 100%;
</style>

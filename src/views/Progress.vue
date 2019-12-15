<template>
  <div class="progress">
    <div class="content">
      <el-timeline>
        <el-timeline-item v-for="(item, index) in progressData"
        :key="index"
        color="#0bbd87"
        >
          <el-card>
            <h3>{{item.name}}</h3>
            <div class="detail">{{item.detail}}</div>
            <div class="time">{{item.time}}</div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    <div class="label">
        <PLabel/>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ProgressItem } from '../interfaces/index';
import PLabel from '../components/PLabel.vue';
// import Header from '../components/Header.vue'

@Component({
  components: {
    PLabel,
  },
})
export default class Progress extends Vue {
  // computed
  progressData: Array<ProgressItem> = [{
    name: '公司实习',
    time: '2016年4月-2016年9月',
    detail: '从学校去公司的路上是一直睡过去的~',
  }, {
    name: '导师实验室参与项目开发',
    time: '2016年10月-2017年3月',
    detail: '和实验室同学一起开发学习的日子总是开心的。',
  }, {
    name: '常州建行培训中心实习',
    time: '2017年4月-2017年6月',
    detail: '主要是做一套培训系统，但是建行的自助餐诱人了，体重忍不住又涨了。',
  }, {
    name: '毕业',
    time: '2017年7月-2018年3月',
    detail: '那年我毕业啦~',
  }, {
    name: '第一份工作',
    time: '2018年3月-至今',
    detail: '工作环境挺好的，同事和小师傅也很照顾我。在这里学习成长了很多。',
  }]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.progress {
  .detail, .time {
    margin-top: 15px;
  }
  .el-timeline {
    margin: 20px;
  }
}

</style>

<template>
  <div class="project">
    <div class="content">
      <el-row>
        <el-col :span="6" v-for="(o, index) in 3" :key="o" :offset="index > 0 ? 2 : 1">
          <el-card :body-style="{ padding: '0px' }">
            <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
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

@Component({
  components: {
    PLabel,
  },
})
export default class Project extends Vue {
  // computed

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.el-container {
    height: 100%;
}
</style>

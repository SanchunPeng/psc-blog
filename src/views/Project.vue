<template>
  <div class="project">
    <div class="content">
      <div v-for="(item, index) in projects" :key="index" class="project-item">
        <el-card :body-style="{ padding: '0px' }" class="project-item">
          <img :src="item.imgUrl" class="item-image">
          <div style="padding: 14px;">
            <span>{{item.title}}</span>
            <div class="bottom clearfix">
              <el-button type="text" class="button">
                <a :href="item.projectUrl">查看更多</a></el-button>
            </div>
          </div>
        </el-card>
      </div>
      <!-- <video width="320" height="240" controls="controls">
        <source src="https://sanchunpeng.github.io/three-example/src/assets/car.mov" type="video/mp4" />
      </video> -->
    </div>
    <div class="label">
      <PLabel/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ProjectItems } from '../interfaces/index';
import PLabel from '../components/PLabel.vue';

@Component({
  components: {
    PLabel,
  },
})
export default class Project extends Vue {
  // computed
  projects : Array<ProjectItems> = [
    { title: 'VR车模型展示', projectUrl: 'https://github.com/SanchunPeng/three-example',
      desc: '', imgUrl: 'https://sanchunpeng.github.io/pscblog/src/assets/car.png' },
    { title: '编辑自己的VUE UI', projectUrl: 'https://github.com/SanchunPeng/psamrt-ui',
      desc: '', imgUrl: 'https://sanchunpeng.github.io/pscblog/src/assets/ui.png' },
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.el-container {
    height: 100%;
    .project-item {
      display: inline-block;
      width: 250px;
      height: 445;
      .item-image {
        width: 250px;
        height: 345px;
      }
    }
    .project-item + .project-item {
      margin-left: 20px;
    }
}
</style>

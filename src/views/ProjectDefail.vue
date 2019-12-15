<template>
  <div class="project-detail">
      <video width="320" height="240" controls="controls">
        <source src="https://sanchunpeng.github.io/three-example/src/assets/car.mov" type="video/mp4" />
      </video>
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

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.project-detail {
  
}
</style>

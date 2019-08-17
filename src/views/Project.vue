<template>
  <div class="project">
    <div class="content">
      项目
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

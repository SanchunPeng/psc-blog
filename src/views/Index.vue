<template>
  <el-container>
    <el-header>
        <Header/>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
    <!-- <el-footer height="50px">Footer</el-footer> -->
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '../components/Header.vue';

@Component({
  components: {
    Header,
  },
})
export default class Index extends Vue {
  // computed
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.el-container {
  height: 100%;
  .el-header {
    padding: 0;
  }
  .el-main {
    padding: 20px 120px;
    .content, .label {
      float: left;
      // height: 100%;
    }
    .label {
      width: 200px;
      margin-left: 30px;
    }
    .content {
      // padding: 20px;
      width: calc(100% - 230px);
      background-color: #ffffff;
      border-radius: 4px;
    }
  }
}
</style>

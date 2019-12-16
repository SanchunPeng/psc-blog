<template>
  <el-container>
    <el-header height="250px">
        <Header/>
    </el-header>
    <div class="main">
      <router-view/>
    </div>
    <el-footer height="40px">联系：13732211452@163.com</el-footer>
    <el-backtop target=".main"></el-backtop>
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
    background-image: url('../assets/head.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: 50% 100%;
  }
  .main {
    padding: 20px 70px;
    .content, .label {
      float: left;
      // height: 100%;
    }
    .label {
      width: 180px;
      margin-left: 30px;
    }
    .content {
      // padding: 20px;
      width: calc(100% - 230px);
      background-color: #ffffff;
      border-radius: 4px;
    }
  }
  .el-footer {
    line-height: 40px;
    text-align: center;
    color: #ffffff;
    background-color: #22016c;
  }
}
</style>

<template>
  <div class="header">
    <el-menu
      :default-active="activeIndex"
      :router="true"
      class="el-menu-demo"
      mode="horizontal"
      background-color="transparent"
      text-color="#FFFFFF"
      active-text-color="#FFAA00">
        <!-- <el-menu-item index="hompage">首页</el-menu-item> -->
        <el-menu-item index="article">文章</el-menu-item>
        <el-menu-item index="project">项目</el-menu-item>
        <el-menu-item index="progress">历程</el-menu-item>
        <el-menu-item index="about">关于</el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';


@Component

export default class Header extends Vue {
  activeIndex : String = 'article'

  mounted() {
    const { name } = this.$route;
    this.activeIndex = name === 'articledetail' ? 'article' : name || '';
  }
}
</script>

<style lang="scss">
.header .el-menu-demo {
  padding-left: 120px;
  .el-menu-item {
    font-size: 18px !important;
    border-bottom: 0px !important;
  }
}
.el-menu--horizontal > .el-menu-item:hover,
.el-menu--horizontal > .el-menu-item.is-active {
  background-color: transparent !important;
  font-weight: 700 !important;
  color: #FFAA00;
}
.el-menu {
  background-color: transparent !important;
}
.el-menu.el-menu--horizontal {
  border-bottom: solid 1px transparent !important;
}
</style>

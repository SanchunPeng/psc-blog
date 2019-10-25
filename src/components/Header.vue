<template>
  <div class="header">
    <el-menu :default-active="activeIndex" :router="true" class="el-menu-demo" mode="horizontal">
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
    const name = this['$route'].name
    this.activeIndex =  name === 'articledetail' ? 'article' : name || ''
  }
}
</script>

<style lang="scss">
.header .el-menu-demo {
  padding-left: 120px;
}
</style>

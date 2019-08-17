<template>
  <div id="app">
    <Index/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Index from './views/Index.vue';
@Component({
  components: {
    Index,
  },
})
export default class App extends Vue {
}
</script>

<style lang="scss">

html, body{
  font: 14px 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', 'arial', 'Tahoma', 'SimSun', 'sans-serif';
  width: 100%;
  height: 100%;
  margin: 0;
  min-height: 600px;
}

#app {
  width: 100%;
  height: 100%;
  background-color: #f7f9fc;
  // padding: 5px;
}


body, dd, dl, dt, h2, h3, h4, h6, li, ol, p, ul{
  margin: 0;
  padding: 0;
  list-style: none;
  -webkit-text-size-adjust: none;
}
img{
  border: 0;
}
em, i, h2, h3, h4, h6{
  font-style: normal;
}
a{
  cursor: pointer;
  text-decoration: none;
  color: #409eff;
}
*, *:before, *:after{
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
:focus{
  outline: none;
}
:visited{
  color: #409eff;
}
::-webkit-scrollbar{
  width: 3px;
  height: 3px;
}
::-webkit-scrollbar-track-piece{
  -webkit-border-radius: 3px;
}
::-webkit-scrollbar-thumb:vertical{
  height: 5px;
  -webkit-border-radius: 3px;
  background-color: #ccc;
}
::-webkit-scrollbar-thumb:horizontal{
  width: 5px;
  -webkit-border-radius: 3px;
  background-color: #ccc;
}

.clearfix{
  zoom: 1;
}
.clearfix:after{
  display: block;
  clear: both;
  content: '';
}
.pull-left{
  float: left;
}
.pull-right{
  float: right;
}


</style>

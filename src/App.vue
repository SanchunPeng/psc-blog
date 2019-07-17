<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Hello from './components/Hello.vue';
@Component({
  components: {
    Hello
  }
})
export default class App extends Vue {
}
</script>

<style lang="scss">
  #app {
    padding: 5px;
  }
</style>

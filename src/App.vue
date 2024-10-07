<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { onMounted } from 'vue';

export default {
  name: 'App',
  setup() {
    onMounted(() => {

      console.log(` ____                            _       
/ ___|  ___ _ __ ___   ___ _ __ | |_ ___ 
\\___ \\ / _ \\ '_ \` _ \\ / _ \\ '_ \\| __/ _ \\
 ___) |  __/ | | | | |  __/ | | | ||  __/
/____/ \\___|_| |_| |_|\\___|_| |_|\\__\\___|`);
    });
  }
}
</script>

<style>

</style>

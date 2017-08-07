<template>
  <div id="app">
    <h1>Currency Converter</h1>
    <dashboard>Converter controls</dashboard>
    <archive>Latest transactions</archive>
  </div>
</template>

<script>

import Dashboard from './components/Dashboard'
import Archive from './components/Archive'

export default {
  name: 'app',
  components: {
    Dashboard,
    Archive
  }
}
</script>

<style scoped>
#app{
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  padding-top: 60px;
  background-color: #f1f1f1;
  text-align: center;
}

h1 {
  font-size: 30px;
  padding: 10px 30px;
  box-sizing: border-box;
  background-color: #79d2ce;
  text-align: left;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

</style>

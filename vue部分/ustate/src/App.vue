<template>
  <div id="app">
     <div class="view">
       <keep-alive>
        <router-view></router-view>
       </keep-alive>
     </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  created () {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import 'common/css/reset.css'
@import 'common/css/icon.css'
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  word-break:break-all; /*支持IE，chrome，FF不支持*/
  word-wrap:break-word;/*支持IE，chrome，FF*/
</style>

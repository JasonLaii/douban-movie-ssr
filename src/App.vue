<template>
  <div id="app">
    <Header></Header>
    <keep-alive exclude="movieDetails">
      <router-view></router-view>
    </keep-alive>
    <foot></foot>
  </div>
</template>

<script>
import Header from './components/header'
import foot from './components/footer'

export default {
  name: 'app',
  components: {
    Header,
    foot
  }
}
</script>

<style>

</style>

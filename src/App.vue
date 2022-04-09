<template>
  <div id="app">
    <Header></Header>

    <router-view></router-view>

    <!-- 在homt、Search显示，在登录、注册隐藏 -->
    <!-- <Footer v-show="$route.path=='/home'||$route.path=='/search'"></Footer> -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted(){
    this.$store.dispatch("categoryList");
  }
};
</script>

<style>
#app {
}
</style>

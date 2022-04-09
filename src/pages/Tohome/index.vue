<template>
  <div>
    <h1>你还未登录,请<span class="strong" @click="login">先登录</span></h1>
    <br />
    <h2>{{ second }}秒后自动跳转至首页...</h2>
  </div>
</template>

<script>
export default {
  name: "Tohome",
  data() {
    return {
      second: 5,
      timer: null,
    };
  },
  methods: {
    login() {
      let fromPath = this.$route.query.fromPath;
      console.log("tohome中转页中的fromPath", fromPath);
      console.log("点击登录时,需要清除定时器");
      this.$router.push("/login?redirect=" + fromPath); //push中直接加入路径字符串就好了！！！
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
  },
  mounted() {
    //已经不知道在this上翻过多少个跟头了
    if (!this.timer) {
      console.log("开始倒计时");
      this.timer = setInterval(() => {
        if (this.second == 0) {
          clearInterval(this.timer);
          this.timer = null;
          this.$router.push("/home");
        }
        this.second--;
      }, 1000);
    }
  },
  beforeDestroy() {
    if (this.timer) {
      console.log("tohome被销毁时,如果timer还在,也需要确保定时器被清除");
      clearInterval(this.timer);
      this.timer = null;
    }
  },
};
</script>

<style lang="css" scoped>
div {
  width: 300px;
  margin: 100px auto;
}
div h1 span.strong {
  color: red !important;
  font-weight: 900;
  font-size: 30px;
  cursor: pointer;
}
</style>
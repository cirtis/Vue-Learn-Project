<template>
  <div>
    <!-- 三级联动组件已经注册为全局组件了，因此不再需要引入 -->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :list="floor" />
    <!-- <Floor></Floor> -->
    <Brand></Brand>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 引入其余的组件
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    // 派发action，获取floor组件的数据
    this.$store.dispatch("getFloorList");
/*     // 获取用户信息
    this.$store.dispatch("getUserInfo"); */
  },
  computed: {
    ...mapState({ floorList: (state) => state.home.floorList }),
  },
};
</script>

<style>
</style>
<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(slide, index) in skuImageList"
        :key="slide.id"
      >
        <img :src="slide.imgUrl" :class="{active:currentIndex==index}" @click="changeCurrentIndex(index)"/>
        <!-- 高亮的图片的索引值应该传递给 “放大镜”兄弟去放大 -->
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
// Swiper的样式在main.js中已经引入过了
export default {
  name: "ImageList",
  props: ["skuImageList"],
  data(){
    return{
      currentIndex:0,
    }
  },
  methods:{
    changeCurrentIndex(index){
      this.currentIndex=index;
      // 还应该通知兄弟组件当前的索引值改变成什么了
      this.$bus.$emit('getIndex',index);
    }
  },
  // 呈现swiper必须使用nextTick
  watch: {
    // 监听数据：可以保证数据一定ok，但是不能保证结构一定完整。因此需要nextTick
    skuImageList(newValue, oldValue) {
      this.$nextTick(() => {
        var mySwiper = new Swiper(this.$refs.cur, {
          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          slidesPerView:3,
          slidesPerGroup:1,//默认为1
        });
      });
      //nextTick结束
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
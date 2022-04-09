<template>
  <div class="spec-preview">
    <img :src="curImg.imgUrl" />
    <!-- 绑定鼠标事件 -->
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="curImg.imgUrl" ref="big"/>
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["skuImageList"],
  data() {
    return {
      curIndex: 0,
    };
  },
  methods: {
    handler(e) {
      //鼠标事件,其实函数的作用域中默认有event这个鼠标事件
      // console.log(e);
      let mask = this.$refs.mask;
      let big=this.$refs.big;
      let left = e.offsetX - mask.offsetWidth / 2;
      let top = e.offsetY - mask.offsetHeight / 2;
      // 修改元素的left和top属性值
      // 约束left和top的范围
      if (left < 0) left = 0;
      if(left>mask.offsetWidth) left=mask.offsetWidth;
      if (top < 0) top = 0;
      if(top>mask.offsetHeight)top=mask.offsetHeight;
      mask.style.top = top + "px";
      mask.style.left = left + "px";
      big.style.left=-2*left+'px';
      big.style.top=-2*top+'px';

    },
  },
  mounted() {
    // console.log('curIndex',this.curIndex);
    // 获取来自兄弟组件轮播图的图片
    this.$bus.$on("getIndex", (index) => {
      this.curIndex = index;
    });
  },
  computed: {
    // 浏览器在没有获得数据渲染页面时，所依赖的数据需要进行处理
    curImg() {
      // console.log('Zoom组件中的this.skuImgList',this.skuImageList);
      return this.skuImageList[this.curIndex] || {};
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
    // 不是display:none吗？为什么还可以显示
    // 原来是给外层套了个div，且hover时让其显示
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    // 向右移动一个图片的宽度
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
// ~为后续兄弟选择器
  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
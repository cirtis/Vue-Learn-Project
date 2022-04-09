<template>
  <div class="pagination">
    <button :disabled="pageNo<=1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <!-- 上半部分 -->
    <button :class="{active:pageNo==1}" v-if="StartAndEnd.start>1" @click="$emit('getPageNo',1)"> 1</button>
    <button v-if="StartAndEnd.start > 2">···</button>

    <!-- 中间部分 -->
    <button
      v-for="(page, index) in StartAndEnd.end"
      :key="index"
      v-if="page >= StartAndEnd.start"
      :class="{active:pageNo==page}"
      @click="$emit('getPageNo',page)"
    >
      {{ page }}
    </button>
    <!-- 下半部分 -->
    <button v-if="StartAndEnd.end < totalPage - 1">···</button>
    <button :class="{active:pageNo==totalPage}" v-if="StartAndEnd.end < totalPage" @click="$emit('getPageNo',totalPage)">{{ totalPage }}</button>
    <button :disabled="pageNo>=totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共{{ total }} 条</button>
    <!-- <div>{{total}}:{{pageSize}}</div> -->
   <!--  <div>
      总页数:{{ totalPage }}|开始页:{{ StartAndEnd.start }}|结束页:{{
        StartAndEnd.end
      }}|当前页:{{ pageNo }}
    </div> -->
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["total", "pageSize", "continues", "pageNo"],
  computed: {
    // 哥老官！这里面一定得加this啊！！
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    StartAndEnd() {
      let start = 0,
        end = 0;
      // 嫌this麻烦的，可以解构赋值，将this中的对应数据提取出来
      if (this.totalPage <= this.continues) {
        start = 1;
        end = this.totalPage;
      } else {
        //看到了一个弊端，当计算属性或方法用到很多data中的数据时，每次都需要this.
        start = this.pageNo - parseInt(this.continues / 2);
        end = this.pageNo + parseInt(this.continues / 2);
        if (start < 1) {
          start = 1;
          end = this.continues;
        }
        if (end > this.totalPage) {
          start = this.totalPage - this.continues + 1;
          end = this.totalPage;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      // background-color: #409eff;
      background-color: red;
      color: #fff;
    }
  }
}
</style>
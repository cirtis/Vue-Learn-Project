<template>
  <div class="type-nav">
    <!-- <h1>{{categoryList}}</h1> -->
    <div class="container">
      <!-- 鼠标移出事件绑定给模块的外层容器 -->
      <!-- 称之为事件委派，将子元素的事件委派给了父亲 -->
      <div @mouseleave="leaveIndex" @mouseenter="entershow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <!-- 三级联动 一级分类 -->
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <!-- 鼠标移入事件绑定给分类的大标题 -->
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1ID="c1.categoryId"
                  >
                    {{ c1.categoryName }}
                  </a>
                </h3>
                <!-- 二三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <!-- 需要用对象 -->
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2ID="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3ID="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 这种引入的方式，是把lodash全部的功能函数引入了
// 最好的引入方式是按需引入
// import _ from "lodash";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  // 组件挂载完毕，可以向服务器发请求
  mounted() {
    // 通知Vuex发请求，获取数据，存储于仓库中。然而每次切换组件会不断建立和销毁，多次请求会冗余
    // this.$store.dispatch("categoryList");//放在这个组件这里降低了性能
    if (this.$route.path !== "/home") {
      // 非主页的三级联动组件默认隐藏
      this.show = false;
    }
  },
  data() {
    return {
      currentIndex: -1,
      show: true,
    };
  },
  methods: {
    // 鼠标进入修改响应式数据currentIndex属性
    // index：鼠标移到某一个一级分类的元素的索引值
    /*正常情况（用户慢慢的操作）：鼠标进入，每一个一级分类h3，都会触发鼠标进入事件 
        非正常情况（用户操作很快）本身全部的一级分类都应该触发鼠标进入事件，但是经过测试，只有部分h3触发了
        就是由于用户行为过快，导致浏览器反应不过来。如果当前回调函数中有大量业务，有可能出现卡顿现象。
      */
    //  lodash的节流函数 throttle,其中最好别用箭头函数，可能出现上下文this
    changeIndex: throttle(function (index) {
      // console.log("鼠标进入了", index);
      this.currentIndex = index;
    }, 50),

    // 鼠标移出一级分类的回调
    leaveIndex(index) {
      // 鼠标移出，currentIndex变为-1
      this.currentIndex = -1;
      if (this.$route.path !== "/home") {
        this.show = false;
      }
    },
    entershow() {
      this.show = true;
    },
    // 进行路由跳转-搜索
    goSearch(event) {
      // console.log("----跳转");
      // this.$router.push({name:'search',query:{key:1,day:2}});
      //event会作为默认参数自动传入
      // 最好的解决方案：编程式导航+事件委派
      /* 
        利用事件委派存在的问题：1.如果确定点击的就是a标签？2.如何获取参数【一二三级分类的名字+ID】
        事件委派，是把所有子节点委派给父节点。
        1.点击a标签时，才应该进行跳转，如何确定点击的是a标签
          把子节点中a标签加上自定义属性。 data-categoryName，其余节点是没有的
        2.如何确定是一级，二级和三级a标签？
          获取到当前触发事件的结点，需要带有自定义属性的结点就是a标签。
      */
      //  结点有一个dataset属性，可以获取节点的自定义属性与属性值
      let element = event.target;
      // console.log("element.dataset", element.dataset);
      //  如果标签身上有categoryname属性，则一定是a标签
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      if (categoryname) {
        //  依次为一级，二级，三级分类的a标签
        //  整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 整理完参数
        location.query = query;
        // console.log('params',this.$route);
        // 如果有params参数，也需要传入
        if(this.$route.params){
          location.params = this.$route.params
        }
        // console.log('***',location);
        this.$router.push(location);
      }
    },
  },
  computed: {
    // mapState的返回值是一个对象，因此需要将其展开
    ...mapState({
      // 右侧需要的是一个函数，当使用这个计算属性时，右侧函数会立即执行一次
      //注入一个参数state。其实即为大仓库中的数据
      categoryList: (state) => state.home.categoryList.slice(0, 16),
      // 只要16个
    }),
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background-color: #bfa;
        }
      }
    }
    // 过渡动画的样式
    // 过渡动画的开始状态（进入）
    .sort-enter,
    .sort-leave-to {
      height: 0;
    }
    // 过渡动画的结束状态（进入）
    .sort-enter-to,
    .sort-leave {
      height: 461px;
    }
    // 定义动画时间、速率
    .sort-enter-active,
    .sort-leave-active {
      transition: all .1s linear;
    }
  }
}
</style>
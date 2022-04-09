<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="removekeyword">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="removeTrademark">×</i>
            </li>
            <!-- 商品属性的属性值展示 -->
            <li
              class="with-x"
              v-for="(attr, index) in searchParams.props"
              :key="index"
            >
              {{ attr.split(":")[1] }}
              <i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @sendTrademark="getTrademark" @sendAttr="getAttr" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: sort1 }" @click="changeOrder(1)">
                  <a>综合<i v-show="sort1" :class="iconClass"></i></a>
                </li>
                <li :class="{ active: sort2 }" @click="changeOrder(2)">
                  <a>价格<i v-show="sort2" :class="iconClass"></i></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(good, index) in goodsList"
                :key="good.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 进行路由跳转至详情页时，需要带params参数 -->
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <!-- 在父组件中调用子组件时绑定自定义事件，从而让子组件点击按钮触发事件向父组件传值（页码） -->
          <Pagination
            :pageNo="pageNo"
            :pageSize="pageSize"
            :total="total"
            :continues="5"
            @getPageNo="processPageNo"
          ></Pagination>
          <!-- <span>{{total}}:{{pageNo}}:{{pageSize}}</span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",

  components: {
    SearchSelector,
  },
  // 组件挂载完毕执行一次【只执行一次！】
  // 而搜索会执行多次，因此函数体直接放入mounted不合适
  mounted() {
    // console.log('searchlist',this.$store.state.search.searchList);
    this.getData();
    // 经测试，将getData放入updated函数中依然不可行。——无法实现多次获取搜索模块的数据
    // console.log('$route',this.$route);
  },
  // 挂载之前先执行一次传参
  beforeMount() {
    // 复杂写法，将this.$route.query中的属性和params中的属性一个一个赋值给searchParams

    // Object.assign写法： ES6新增的语法:合并对象
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
    // 在发送请求之前，把接口需要传递的参数，进行整理（在给服务器发请求之前，把参数整理好，服务器就会返回查询的数据）
  },
  data() {
    return {
      // 带个服务器的参数
      searchParams: {
        // 一级分类
        category1Id: "",
        // 二级分类
        category2Id: "",
        // 三级分类
        category3Id: "",
        // 分类名称
        categoryName: "",
        // 搜索关键词
        keyword: "",
        // 排序：初始状态是综合|降序
        order: "1:asc",
        // 分页器用的，代表当前是第几页
        pageNo: 1,
        // 每一页的大小
        pageSize: 10,
        // 平台售卖属性
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  computed: {
    // ...mapState({pageNo:(state)=>state.search.searchList.}),//复杂的数据还是现将state转化为getters
    ...mapGetters(["pageNo", "pageSize", "total"]), //获取分页相关的数据

    // mapGetters里面写法，传递数组，因为getters里面的计算没有划分模块
    ...mapGetters(["goodsList"]),
    sort1() {
      return this.searchParams.order.indexOf("1") != -1; //如果order中含有1，则为第一种排序方式：综合排序
    },
    sort2() {
      return this.searchParams.order.indexOf("2") != -1; //如果order中含有2，则为第二种排序方式：价格排序
    },
    iconClass() {
      let isAsc = this.searchParams.order.indexOf("asc") != -1; //如果是升序，isAsc为true
      let iClass = {
        "iconfont arrow-down icon-arrowdown": !isAsc,
        "iconfont arrow-up icon-arrowup": isAsc,
      };
      return iClass;
    },
  },
  methods: {
    processPageNo(pageNo) {
      this.searchParams.pageNo = pageNo;
      // 根据取到的页码整理好参数后向服务器发送请求更新页面
      this.getData();
    },
    removeAttr(index) {
      /* 
      for (let i in this.searchParams.props) {
        if (this.searchParams.props[i] == attr) {
          // id = i;
          console.log("需要删除", attr.split(":")[1]);
          this.searchParams.props.splice(i, 1);//splice直接把数组切割了，返回值是切割出去的部分
        }
      } */
      this.searchParams.props.splice(index, 1); //删除对应元素
      this.getData();
    },
    changeOrder(flag) {
      //flag代表用户点击的排序方式：1：综合| 2：价格
      let originOrder = this.searchParams.order;
      let originFlag = originOrder.split(":")[0];
      let originSort = originOrder.split(":")[1];
      // console.log("flag", originFlag, "sort", originSort);
      // let sorts = ["asc", "desc"];
      // let newSort;
      let newOrder;
      if (flag == originFlag) {
        // newSort = sorts[(sorts.indexOf(originSort) + 1) % 2];
        // 模板字符串中加入三目运算符！优雅
        newOrder = `${flag}:${originSort == "asc" ? "desc" : "asc"}`;
      } else {
        newOrder = `${flag}:asc`; //这种方式更加优雅！！！
        // newSort = sorts[0];//默认升序
      }
      // this.searchParams.order = flag + ":" + newSort;
      this.searchParams.order = newOrder;
      // 再次发送请求
      this.getData();
    },
    getAttr(attr, attrValue) {
      console.log("attr:", attrValue);
      // 接收了参数就需要整理参数并再次发送请求
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      // js循环中，in返回元素的下标，of返回单个对象
      /*     for (let item of this.searchParams.props) {
        console.log("item", item);
        // js中没有equals方法
        if (item == props) return;
      } */
      if (this.searchParams.props.indexOf(props) == -1) {
        //表示数组this.searchParams.props中没有props
        this.searchParams.props.push(props);
        this.getData();
      }
    },
    getTrademark(trademark) {
      console.log("自定义事件已经被触发,并执行了对应的回调");
      console.log("trademark", trademark);
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      // 再次发请求获取search模块所需的数据
      this.getData();
      // this.$router.push({ name: "search", query: this.$route.query,params:this.$route.params});
    },
    // 向服务器发送请求获取search模块的数据
    // 把这次请求封装为一个函数，需要调用的时候直接调用即可
    getData() {
      // console.log("params", this.searchParams);
      this.$store.dispatch("getSearchInfo", this.searchParams);
    },
    removeCategoryName() {
      // 把带给服务器的参数置空后，还需要向服务器发送请求
      // 由于带给服务器的参数都不是必需的。如果属性值为空串还是会被传送给服务器
      // 但是把相应的字段变为undefined，这个字段就不会发送给服务器
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getData();
      // 地址栏也需要改：进行路由跳转,如果有params参数，需要带上params
      // 空对象的布尔值也是真
      this.$router.push({ name: "search", params: this.$route.params });
    },
    // 删除关键字
    removekeyword() {
      // 把给服务器带的参数searchParams的keyword置空
      this.searchParams.keyword = undefined;
      this.getData();
      // 通知兄弟组件Header清除输入框中的关键字
      this.$bus.$emit("clear");
      // 需要带上query
      this.$router.push({ name: "search", query: this.$route.query });
    },
    removeTrademark() {
      this.searchParams.trademark = undefined;
      this.getData();
    },
  },
  // 数据监听：监听组件实例身上的属性的属性值变化
  watch: {
    // 想想为什么不开启深度监听
    // 监听路由的信息是否发生变化。如果发生变化，再次发起请求。
    $route(newValue, oldValue) {
      // beforeMount只整理了一次，因此参数发生变化时，需要再整理一次
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      // 再次发起ajax请求
      this.getData();
      // 每一次请求完毕，应该把1,2,3级分类的id置空。让其接收下一次相应分类的id
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      // 只需要清空这三个属性，因为只有可能因为这三个属性发生不完全覆盖。
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      //#region
      // .page {
      //   width: 733px;
      //   height: 66px;
      //   overflow: hidden;
      //   float: right;

      //   .sui-pagination {
      //     margin: 18px 0;

      //     ul {
      //       margin-left: 0;
      //       margin-bottom: 0;
      //       vertical-align: middle;
      //       width: 490px;
      //       float: left;

      //       li {
      //         line-height: 18px;
      //         display: inline-block;

      //         a {
      //           position: relative;
      //           float: left;
      //           line-height: 18px;
      //           text-decoration: none;
      //           background-color: #fff;
      //           border: 1px solid #e0e9ee;
      //           margin-left: -1px;
      //           font-size: 14px;
      //           padding: 9px 18px;
      //           color: #333;
      //         }

      //         &.active {
      //           a {
      //             background-color: #fff;
      //             color: #e1251b;
      //             border-color: #fff;
      //             cursor: default;
      //           }
      //         }

      //         &.prev {
      //           a {
      //             background-color: #fafafa;
      //           }
      //         }

      //         &.disabled {
      //           a {
      //             color: #999;
      //             cursor: default;
      //           }
      //         }

      //         &.dotted {
      //           span {
      //             margin-left: -1px;
      //             position: relative;
      //             float: left;
      //             line-height: 18px;
      //             text-decoration: none;
      //             background-color: #fff;
      //             font-size: 14px;
      //             border: 0;
      //             padding: 9px 18px;
      //             color: #333;
      //           }
      //         }

      //         &.next {
      //           a {
      //             background-color: #fafafa;
      //           }
      //         }
      //       }
      //     }

      //     div {
      //       color: #333;
      //       font-size: 14px;
      //       float: right;
      //       width: 241px;
      //     }
      //   }
      // }
      //#endregion
    }
  }
}
</style>
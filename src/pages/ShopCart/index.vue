<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cart, index) in cartInfoList"
          :key="cart.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked"
              @change="updateChecked(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, index)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, index)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, index)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCartById(cart)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked&&cartInfoList.length"
          @change="setAllchecked($event.target.checked)"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  methods: {
    // 删除全部选中的产品
    // 这个回调函数，没有办法在点击事件处收集到有用的数据
    async deleteAllCheckedCart() {
      try {
        await this.$store.dispatch("deleteAllCheckedCart");
        // 再次发送请求获取购物车列表
        this.getData();
      } catch (e) {
        console.log("Error");
      }
    },
    // 修改产品的勾选状态
    async updateChecked(cart, event) {
      // 带给服务器的参数isChecked，不是布尔值，而是0|1
      try {
        let isChecked = event.target.checked ? "1" : "0";
        await this.$store.dispatch("updateCheckedById", {
          skuId: cart.skuId,
          isChecked,
        }); //key|value一致，省略value。
        // 如果修改成功，需要再次获取服务器数据
        this.getData();
      } catch (e) {
        console.log("出错");
      }
    },
    // 获取个人购物车数据
    getData() {
      this.$store.dispatch("getCartList");
    },
    // 修改产品的个数,进行节流，杜绝用户快速点击。
    handler: throttle(async function (type, value, index) {
      //三个状态最好用switch和case来分支。
      // 通知服务器修改某一个产品的数量
      console.log("收到的参数为", type, value);
      let increment = 0;
      if (type == "minus" || type == "add") {
        if (type == "minus" && this.cartInfoList[index].skuNum <= 1)
          increment = 0;
        //数量小于等于1，就不能再减了
        else increment = value;
      } else {
        if (isNaN(value) || value < 1) {
          // 出现非法数据或者小于1的数，传给服务器数字0
          console.log("输入不合法");
          increment = 0;
          // return;
        } else {
          console.log("原来的skuNum", this.cartInfoList[index].skuNum);
          increment = parseInt(value) - this.cartInfoList[index].skuNum;
          this.cartInfoList[index].skuNum = parseInt(value);
        }
      }

      try {
        await this.$store.dispatch("addOrUpdateShopCart", {
          skuId: this.cartInfoList[index].skuId,
          skuNum: increment,
        });
        this.getData();
      } catch (e) {
        console.log("请求出错了");
      }
    }, 200), //思考为什么不节流的情况下点击会出现负数？？
    // 删除产品的操作
    async deleteCartById(cart) {
      try {
        await this.$store.dispatch("deleteCartListBySkuId", cart.skuId);
        // 如果删除成功，则再次发送请求获取新的数据进行展示
        this.getData();
      } catch (e) {
        console.log("请求出错", e.message);
      }
    },
    async setAllchecked(checked) {
      try {
        console.log("checked", checked);
        let isChecked = checked ? "1" : "0";
        await this.$store.dispatch("setAllChecked", isChecked);
        this.getData();
      } catch (e) {
        console.log("error!");
      }
    },
  },
  computed: {
    ...mapState({ cartInfoList: (state) => state.shopcart.cartInfoList }),
    // 计算购买产品的总价
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        sum += item.skuNum * item.skuPrice;
      });
      return sum;
    },
    // 判断底部复选框是否勾选[全部产品都选中,则勾选]
    //every方法需要数组中每个元素都满足回调函数的条件才返回true
    isAllChecked: {
      get() {
        // 点击单个项目选择框时，isAllChecked的get()起作用，并且会在满足条件时改变自身勾选状态
        return this.cartInfoList.every((item) => item.isChecked == 1);
      },
   /*    async set(checked) {//不绑定change事件，用v-model也可以实现。
        try {
          console.log("checked", checked);
          let isChecked = checked ? "1" : "0";
          await this.$store.dispatch("setAllChecked", isChecked);
          this.getData();
        } catch (e) {
          console.log("error!");
        }
      }, */
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
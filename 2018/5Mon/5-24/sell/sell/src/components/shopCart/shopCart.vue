<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left">
          <div class="logo-warpper" @click="showFoodList">
            <div class="logo" :class="{'heightlight':totalCount>0}">
              <i class="icon-shopping_cart" :class="{'heightlight':totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'heightlight':totalPrice>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" @click="buy" :class="{'heightlight':this.totalPrice >= this.minPrice}">{{payDesc}}</div>
        </div>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="fold">
          <div class="list-head">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content">
            <ul>
              <li v-for="food in selectFoods" v-bind:key="food.id" class="food">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-warpper">
                  <cartControl :food="food" :totalCount="totalCount" :fold="fold" @onfoldchange="onFoldChange"></cartControl>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>

    </div>
    <div class="list-mask" v-show="fold"></div>
  </div>

</template>

<script type="text/ecmascript-6">
import cartControl from '@/components/cartcontrol/cartcontrol'
export default {
  props: {
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    selectFoods: {
      type: Array,
      default () {
        return [
          {
            price: 5,
            count: 21
          }
        ]
      }
    }
  },
  components: {cartControl},
  data () {
    return {
      fold: false
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`
      } else if (this.totalPrice > 0 && this.totalPrice < this.minPrice) {
        let num = this.minPrice - this.totalPrice
        return `差${num}元配送`
      } else if (this.totalPrice >= this.minPrice) {
        return '去结算'
      }
    }
  },
  methods: {
    onFoldChange (val) {
      this.fold = val
    },
    empty () {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
      this.fold = false
    },
    showFoodList () {
      console.log(this.totalCount)
      if (this.totalCount) {
        this.fold = !this.fold
      }
    },
    buy () {
      if (this.totalPrice >= this.minPrice) {
        alert(`正在结算 ! 您需要支付${this.totalPrice}元`)
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .shopcart
    position:fixed
    left:0
    bottom:0
    z-index:50
    width:100%
    height:48px
    .content
      display:flex
      background:#14172d
      font-size:0
      .content-left
        flex:1
        .logo-warpper
          display:inline-block
          position:relative
          top:-10px
          margin:0 12px
          padding:6px
          width:56px
          height:56px
          box-sizing:border-box
          vertical-align:top
          border-radius:50%
          background:#14172d
          .logo
            width:100%
            height:100%
            border-radius:50%
            background:#2b343c
            text-align:center
            &.heightlight
              background:rgb(0,160,220)
            .icon-shopping_cart
              font-size:24px
              color:#80858a
              line-height:44px
              &.heightlight
                color:#fff
          .num
            position:absolute
            top:0
            right:0
            width:24px
            height:16px
            line-height:16px
            text-align:center
            font-size:9px
            font-weight:700
            box-shadow:0 4px 8px 0 rgba(0,0,0,.4)
            border-radius:16px
            color:#fff
            background:rgb(240,20,20)
        .price
          display:inline-block
          line-height:24px
          vertical-align:top
          margin-top:12px
          padding-right:12px
          box-sizing:box-sizing
          border-right:1px solid rgba(255,255,255,.1)
          font-size:16px
          font-weight:700
          color:rgba(255,255,255,.4)
          &.heightlight
            color:#fff
        .desc
          display:inline-block
          line-height:24px
          color:rgba(255,255,255,.4)
          margin:12px 0 0 12px
          font-size:12px
      .content-right
        flex:0 0 105px
        width:105px
        background:#2b333b
        .pay
          color:rgba(255,255,255,.4)
          font-size:14px
          font-weight:700
          line-height:48px
          height:48px
          text-align:center
          &.heightlight
            background:#00a0dc
            color:#fff

    .shopcart-list
      position:absolute
      left:0
      bottom:50px
      z-index:-1
      width:100%
      transform :translate3d(0,-100%,0)
        &.fold-enter-active, &.fold-leave-active
          transition :all 0.4s linear
        &.fold-enter, &.fold-leave-active
          transform :translate3d(0,0,0)
      .list-head
        height:40px
        line-height:40px
        padding:0 18px
        background:#f3f5f7
        border-bottom:1px solid raba(7,17,27,.1)
        .title
          float:left
          font-size:14px
          color:rgb(7,17,27)
        .empty
          float:right
          font-size:12px
          color:rgb(0,160,220)
      .list-content
        padding:0 18px
        max-height:240px
        background:#ffffff
        overflow:hidden
        overflow-y:auto
        .food
          position:relative
          padding:12px 0
          box-sizing:border-box
          border-1px(rgba(7,17,27,.1))
        .name
          font-size:14px
          line-height:24px
          color:rgb(7,17,27)
        .price
          position:absolute
          right:90px
          bottom:12px
          line-height:24px
          font-size:14px
          font-weight:700
          color:rgb(240,20,20)
        .cartcontrol-warpper
          position:absolute
          right:0
          bottom:6px
  .list-mask
    position:fixed
    top:0
    right:0
    width:100%
    height:100%
    z-index:40
    backdrop-filter:blur(10px)
    background:rgba(7,17,27,.6)
</style>

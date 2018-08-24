<template>
  <div class="goods">
    <div class="menu-warpper" ref="menuWarp">
      <ul>
        <li v-for="(item,index) in goods" v-bind:key="item.id" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index)">
          <span class="text"><span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-warpper" ref="foodWarp">
      <ul>
        <li v-for="item in goods" v-bind:key="item.id" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li class="food-item" v-for="food in item.foods" v-bind:key="food.id">
             <div class="ico">
               <img :src="food.icon" width="57" height="57" alt="">
             </div>
              <div class="content">
                <h3 class="name" @click="selecteFood(food, $event)">{{food.name}}</h3>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span class="">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="new_price"><span class="flag">￥</span>{{food.price}}</span>
                  <span class="old_price" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-warpper">
                  <cartControl :food="food"></cartControl>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopCart :selectFoods="selectFood" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopCart>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import BScroll from 'better-scroll'
import shopCart from '@/components/shopCart/shopCart'
import cartControl from '@/components/cartcontrol/cartcontrol'
import food from '@/components/food/food'
// const ERR_OK = 0
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    }
  },
  created () {
    // this.$http.get('./api/goods').then((data) => {
    //   data = JSON.parse(data.bodyText)
    //   if (data.errno === ERR_OK) {
    //     this.goods = data.data
    //     this.$nextTick(() => {
    //       this.initScroll()
    //       this.calculateHeight()
    //     })
    //   }
    // })
    axios.get('https://www.easy-mock.com/mock/5b13c7edc5450f078273c580/example/datas').then((response) => {
      this.goods = response.data.goods
      this.$nextTick(() => {
        this.initScroll()
        this.calculateHeight()
        console.log(response)
      })
    })
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  computed: {
    currentIndex () {
      let len = this.listHeight.length
      for (let i = 0; i < len; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    selectFood () {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count > 0) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  methods: {
    selecteFood (food, event) {
      this.selectedFood = food
      this.$refs.food.show()
    },
    initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWarp, {
        click: true
      })
      this.foodScroll = new BScroll(this.$refs.foodWarp, {
        click: true,
        probeType: 3
      })
      this.foodScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    calculateHeight () {
      let foodList = this.$refs.foodWarp.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    selectMenu (index) {
      let foodList = this.$refs.foodWarp.getElementsByClassName('food-list-hook')
      let el = foodList[index]
      this.foodScroll.scrollToElement(el, 300)
    }
  },
  components: {shopCart, cartControl, food}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    position:absolute
    top:169px
    bottom:46px
    display:flex
    width:100%
    overflow:hidden
    .menu-warpper
      flex:0 0 80px
      width:80px
      background-color:#f3f5f7
      .menu-item
        display:table
        height:54px
        width:56px
        line-height:14px
        padding:0 12px
        &.current
          position:relative
          z-index:10
          margin-top:-1px
          background:#fff
          .text
            font-weight:700
        .icon
          display:inline-block
          width:12px
          height:12px
          vertical-align:top
          margin-right:2px
          background-size:12px 12px
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display:table-cell
          width:56px
          height:54px
          vertical-align:middle
          font-size:12px
          border-1px(rgba(7,17,27,0.1))
    .foods-warpper
      flex:1
      .title
        padding-left:14px
        height:26px
        line-height:26px
        border-left:1px solid #d9dde1
        color:rgb(147,153,159)
        font-size:12px
        background-color:#f5f3f7
      .food-item
        display:flex
        margin:18px
        padding-bottom:10px
        border-1px(rgba(7,17,27,.1))
        &:last-child
          border-none()
          margin-bottom:0
        .ico
          flex:0 0 57px
          margin-right:10px
          img
            border-radius:4px
        .content
          flex:1
          .name
            margin:2px 0 8px 0
            height:14px
            line-height:14px
            font-size:14px
            color:rgb(7,17,27)
            font-weight:700
          .desc,.extra
            font-size:10px
            line-height:10px
            color:rgb(147,153,159)
          .desc
            margin-bottom:8px
          .extra
          .count
            margin-right:12px
          .price
            .new_price
              color:red
              font-size:14px
              font-weight:700
              line-height:24px
              .flag
                font-size:10px
            .old_price
              font-size:10px
              color:rgb(147,153,159)
              text-decoration:line-through
          .cartcontrol-warpper
            position:absolute
            right:0
            bottom:5px

</style>

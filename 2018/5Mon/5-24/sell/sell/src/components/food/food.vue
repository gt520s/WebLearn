<template>
  <transition name="food_tra">
    <div class="food" v-show="showFlag" ref="foodBox">
      <div class="food-warpper">
        <div class="food-content">
          <div class="image-head">
            <img :src="food.image" alt="">
            <div class="back" @click="hidden">
              <i class="icon-arrow_lift"></i>
            </div>
          </div>
          <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail">
              <span class="sell-count">月售{{food.sellCount}}份</span>
              <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
              <span class="new_price"><span class="flag">￥</span>{{food.price}}</span>
              <span class="old_price" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
            </div>
            <div class="cartControl-warpper">
              <cartControl :food="food"></cartControl>
            </div>
            <div class="buy" @click="addFirst" v-show="!food.count || food.count === 0">加入购物车</div>
          </div>
          </div>

        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingSelect :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings" @ratingTypeChaneg="changeType"  @toggleContent="onlyContentChange"></ratingSelect>
          <ul class="rating-content">
            <li class="ratings-item" v-for="item in ratings_change" v-bind:key="item.id">
              <div class="head">
                <div class="time">{{item.rateTime | formatDate}}</div>
                <div class="user">
                  <div class="name">{{item.username}}</div>
                  <div class="avatar">
                    <img :src="item.avatar" width="12" height="12">
                  </div>
                </div>
              </div>
              <div class="rating-text">
                <i :class="item.rateType === 1 ? 'icon-thumb_down' : 'icon-thumb_up'"></i>
                <div class="text">{{item.text}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import Vue from 'vue'
import {formatDate} from '@/common/js/data.js'
import cartControl from '@/components/cartcontrol/cartcontrol'
import split from '@/components/split/split'
import ratingSelect from '@/components/ratingSelect/ratingSelect'
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
export default {
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  props: {
    food: {
      type: Object
    }
  },
  components: {cartControl, split, ratingSelect},
  data () {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: false,
      ratings_change: this.food.ratings,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  methods: {
    onlyContentChange (val) {
      this.onlyContent = !val
      let onlyText = []
      if (!val) {
        this.food.ratings.filter(item => {
          if (this.selectType === POSITIVE) {
            if (item.text !== '' && item.rateType === POSITIVE) {
              onlyText.push(item)
            }
          } else if (this.selectType === NEGATIVE) {
            if (item.text !== '' && item.rateType === NEGATIVE) {
              onlyText.push(item)
            }
          } else {
            if (item.text !== '') {
              console.log(`ALL`)
              onlyText.push(item)
            }
          }
        })
        this.ratings_change = onlyText
      } else {
        this.food.ratings.filter(item => {
          if (this.selectType === POSITIVE) {
            if (item.rateType === POSITIVE) {
              onlyText.push(item)
            }
          } else if (this.selectType === NEGATIVE) {
            if (item.rateType === NEGATIVE) {
              onlyText.push(item)
            }
          } else {
            onlyText.push(item)
          }
        })
        this.ratings_change = onlyText
      }
    },
    changeType (type) {
      this.selectType = type
    },
    addFirst () {
      Vue.set(this.food, 'count', 1)
    },
    show () {
      this.showFlag = true
      this.selectType = ALL
      this.onlyContent = true
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foodBox, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    hidden () {
      this.showFlag = false
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .food-content
    position:relative
  .food_tra-enter-active, .food_tra-leave-active
    transition: all .2s linear
    transform: translate3d(0,0,0)
  .food_tra-enter, .food_tra-leave-to
    transform:translate3d(100%,0,0)
  .food
    position:fixed
    left:0
    top:0
    bottom:48px
    z-index:30
    width:100%
    background:#fff
    .image-head
      position:relative
      width:100%
      height:0
      padding-top:100%
      img
        position:absolute
        top:0
        left:0
        width:100%
        height:100%
      .back
        position:absolute
        top:10px
        left:10px
        .icon-arrow_lift
          display:block
          padding:8px
          font-size:15px
          color:#fff
          background:rgba(0,0,0,.3)
          border-radius:50%
    .content
      padding:18px
      .title
        line-height:14px
        margin-bottom:8px
        font-size:14px
        font-weight:700
        color:rgb(7,17,27)
      .detail
        margin-bottom:18px
        line-height:10px
        height:10px
        font-size:0
        .sell-count, .rating
          font-size:10px
          color:rgb(147,153,159)
        .sell-count
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
    .cartControl-warpper
      position:absolute
      right:12px
      bottom:12px
    .buy
      position:absolute
      right:18px
      bottom:18px
      z-index:10
      height:24px
      line-height:24px
      padding:0 12px
      box-sizing:border-box
      font-size:10px
      border-radius:12px
      background:rgb(0,160,220)
      color:#fff
    .info
      padding:18px
      .title
        line-height:14px
        margin-bottom:6px
        font-size:14px
        color:rgb(7,17,27)
      .text
        line-height:24px
        padding:0 8px
        font-size:12px
        color:rgb(77,85,93)
    .rating
      padding-top:18px
      .title
        line-height:14px
        font-size:14px
        color:rgb(7,17,27)
        margin-left:18px
      .rating-content
        font-size:0
        padding:0 18px
        .ratings-item
          position:relative
          padding:16px 0
          border-1px(rgba(7,17,27,.1))
          .time
            font-size:10px
            line-height:12px
            color:rgb(147,153,159)
          .user
            position:absolute
            right:0
            top:16px
            .avatar
              display:inline-block
              img
                border-radius:50%
            .name
              font-size:10px
              line-height:12px
              color:rgb(147,153,159)
              display:inline-block
              vertical-align:top
              margin-right:6px
          .rating-text
            padding-top:6px
            .text
              display:inline-block
              line-height:18px
              font-size:12px
              color:rgb(7,17,27)
            .icon-thumb_down,.icon-thumb_up
              font-size:12px
              line-height:24px
              margin-right:4px
            .icon-thumb_down
              color:rgb(147,153,159)
            .icon-thumb_up
              color:rgb(0,180,220)

</style>

<template>
<div class="ratings" ref="ratings">
  <div class="ratings-content">
    <div class="overview">
      <div class="overview-left">
        <h1 class="score">{{seller.score}}</h1>
        <div class="title">综合评分</div>
        <div class="rank">高于周边商家{{seller.rankRate}}%</div>
      </div>
      <div class="overview-right">
        <div class="score-warpprt">
          <div class="title">服务态度</div>
          <star :size="36" :score="seller.serviceScore"></star>
          <span class="score">{{seller.serviceScore}}</span>
        </div>
        <div class="score-warpprt">
          <div class="title">商品评分</div>
          <star :size="36" :score="seller.foodScore"></star>
          <span class="score">{{seller.foodScore}}</span>
        </div>
        <div class="delivery-warpper">
          <span class="title">送达时间</span>
          <span class="time">{{seller.deliveryTime}}分钟</span>
        </div>
      </div>
    </div>
    <split></split>
    <ratingSelect :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="ratings" @ratingTypeChaneg="changeType"  @toggleContent="onlyContentChange"></ratingSelect>
    <div class="rating-warpper">
      <ul>
        <li v-for="item in ratings_change" v-bind:key="item.id" class="rating-item">
          <div class="avatar">
            <img :src="item.avatar" width="28" height="28">
          </div>
          <div class="content">
            <h1 class="name">{{item.username}}</h1>
            <div class="star-warpper">
              <star :size="24" :score="item.score"></star>
              <span class="time" v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
            </div>
            <p class="text">{{item.text}}</p>
            <div class="recommend"></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script type="text/ecmascript-6">
import star from '@/components/star/star'
import split from '@/components/split/split'
import axios from 'axios'
import BScroll from 'better-scroll'
import ratingSelect from '@/components/ratingSelect/ratingSelect'
const ALL = 2
const POSITIVE = 0
const NEGATIVE = 1
export default {
  created () {
    axios.get('https://www.easy-mock.com/mock/5b13c7edc5450f078273c580/example/datas').then((response) => {
      this.ratings_change = this.ratings = response.data.ratings
      console.log(response)
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    })
  },
  data () {
    return {
      ratings: [],
      ratings_change: [],
      showFlag: false,
      selectType: ALL,
      onlyContent: false,
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
        this.ratings.filter(item => {
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
        this.ratings.filter(item => {
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
      console.log(type)
      let filterData = []
      if (type === POSITIVE) {
        this.ratings.filter(item => {
          if (this.onlyContent) {
            if (item.rateType === POSITIVE && item.text !== '') {
              filterData.push(item)
            }
          } else {
            if (item.rateType === POSITIVE) {
              filterData.push(item)
            }
          }
        })
      } else if (type === NEGATIVE) {
        this.ratings.filter(item => {
          if (this.onlyContent) {
            if (item.rateType === NEGATIVE && item.text !== '') {
              filterData.push(item)
            }
          } else {
            if (item.rateType === NEGATIVE) {
              filterData.push(item)
            }
          }
        })
      } else if (type === ALL) {
        if (!this.onlyContent) {
          filterData = this.ratings
        } else {
          this.ratings.filter(item => {
            if (item.text !== '') {
              filterData.push(item)
            }
          })
        }
      }
      this.ratings_change = filterData
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  components: {star, split, ratingSelect}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
.ratings
  position:absolute
  top:169px
  bottom:0
  left:0
  width:100%
  overflow:hidden
  .overview
    display:flex
    padding:18px 0
    .overview-left
      flex:0 0 137px
      width:137px
      border-right:1px solid rgba(7,17,27,.1)
      text-align:center
      .score
        font-size:24px
        color:rgb(255,153,0)
        line-height:28px
        padding-bottom:12px
      .title
        font-size:12px
        color:rgb(7,17,27)
        line-height:12px
        padding-bottom:12px
      .rank
        font-size:10px
        color:rgb(147,153,159)
        line-height:10px
    .overview-right
      flex:1
      padding-left:24px
      .score-warpprt
        color:rgb(7,17,27)
        line-height:18px
        padding-bottom:8px
        font-size:0
        .title
          display:inline-block
          font-size:12px
          color:rgb(7,17,27)
          margin-right:12px
        .star
          display:inline-block
          margin-right:12px
          vertical-align:top
        .score
          font-size:12px
          color:rgb(255,153,0)
          line-height:18px

      .delivery-warpper
        line-height:18px
        .title
          font-size:12px
          color:rgb(7,17,27)
          line-height:18px
          margin-right:12px
        .time
          font-size:12px
          color:rgb(147,153,159)
          line-height:18px
  .rating-warpper
    padding:0 18px
    .rating-item
      display:flex
      padding:18px 0
      border-1px(rgba(7,17,27,.1))
      font-size:0
      .avatar
        flex:0 0 28px
        width:28px
        margin-right:12px
        img
          border-radius:50%
      .content
        .name
          font-size:10px
          line-height:12px
          color:rgb(7,17,27)
          padding-bottom:4px
        .star
          display:inline-block
          padding-bottom:6px
          margin-right:6px
        .time
          font-size:10px
          line-height:12px
          font-weight:200
          color:rgb(147,153,159)
        .text
          font-size:12px
          color:rgb(7,17,27)
          line-height:18px
</style>

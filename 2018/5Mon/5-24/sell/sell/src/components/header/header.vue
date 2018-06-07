<template>
  <div class="header">
    <div class="content-warp">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span> <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}} / {{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-warp" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" alt="">
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-warp clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-warpper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="supports" v-if="seller.supports">
              <li class="support-item" v-for="item in seller.supports" v-bind:key="item.id">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="closeDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>

  </div>
</template>

<script type="text/ecmascript-6">
import star from '@/components/star/star'
export default {
  props: ['seller'],
  data () {
    return {
      detailShow: false
    }
  },
  methods: {
    showDetail () {
      this.detailShow = true
    },
    closeDetail () {
      this.detailShow = false
    }
  },
  components: {star},
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .header
    position:relative
    overflow:hidden
    color:#ffffff
    background-color:rgba(7,17,27,.5)
    .content-warp
      position:relative
      padding:24px 12px 10px 24px
      .avatar
        display:inline-block
        vertical-align:top
        img
          border-radius:2px
      .content
        display:inline-block
        margin-left:16px
        .title
          margin:2px 0 8px 0
          span
            font-size:16px
            font-weight:bold
            line-height:18px
          .brand
            display:inline-block
            vertical-align:top
            width:30px
            height:18px
            bg-image('brand')
            background-size:30px 18px
            background-repeat:no-repeat
        .description
          font-size:12px
          line-height:12px
          font-weight:200
          padding-bottom:10px
        .support
          .text
            display:inline-block
            margin-top:2px
            font-size:10px
            font-weight:200
            line-height:12px
            vertical-align:top
          .icon
            display:inline-block
            width:12px
            height:12px
            background-size:12px 12px
            background-repeat:no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
      .support-count
        position:absolute
        right:12px
        bottom:10px
        padding:0 8px
        height:24px
        line-height:24px
        border-radius:14px
        background:rgba(0,0,0,.2)
        text-align:center
        .count
          font-size:12px
          vertical-align:top
        .icon-keyboard_arrow_right
          line-height:12px
          font-size:12px
          margin-left:2px
    .bulletin-warp
      height:28px
      line-height:28px
      padding:0 22px 0 12px
      white-space:nowrap
      overflow:hidden
      text-overflow:ellipsis
      position:relative
      background-color:rgba(7,17,27,.2)
      .bulletin-title
        display:inline-block
        width:22px
        height:12px
        bg-image('bulletin')
        background-size:22px 12px
        background-repeat:no-repea
        vertical-align:top
        margin-top:10px
      .bulletin-text
        margin:0 4px
        font-size:10px
      .icon-keyboard_arrow_right
        position:absolute
        font-size:10px
        right:12px
        top:10px
    .background
      position:absolute
      top:0
      left:0
      width:100%
      height:100%
      z-index:-1
      filter:blur(10px)
    .detail
      position:fixed
      z-index:100
      top:0
      left:0
      width:100%
      height:100%
      overflow:auto
      transition:all 0.5s
      background-color:rgba(7,17,27,0.8)
      backdrop-filter:blur(10px)
      .detail-warp
        min-height:100%
        width:100%
        .detail-main
          margin-top:64px
          padding-bottom:64px
          .name
            line-height:16px
            font-size:16px
            text-align:center
            font-weight:700
          .star-warpper
            margin-top:18px
            padding:2px 0
            text-align:center
          .title
            display:flex
            width:80%
            margin:30px auto 24px auto
            .line
              flex:1
              position:relative
              top:-6px
              border-bottom:1px solid rgba(255,255,255,.2)
            .text
              padding:0 12px
              font-size:14px
          .supports
            width:80%
            margin:0 auto
            .support-item
              padding:0 12px
              margin-bottom:12px
              font-size:0
              &:lats-child
                margin-bottom:0
              .icon
                display:inline-block
                width:16px
                height:16px
                vertical-align:top
                margin-right:6px
                background-size:16px 16px
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.invoice
                  bg-image('invoice_2')
                &.special
                  bg-image('special_2')
              .text
                line-height:16px
                font-size:12px
          .bulletin
            width:80%
            margin:0 auto
            padding:0 12px
            line-height:24px
            font-size:12px
      .detail-close
        position:relative
        width:32px
        height:32px
        margin:-64px auto 0 auto
        clear:both
        font-size:32px
</style>

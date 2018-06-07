<template>
  <div class="cartcontrol">
    <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click="decreaseCart"></div>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
export default {
  data () {
    return {
      myFold: this.food
    }
  },
  props: {
    food: {
      type: Object
    },
    totalCount: {
      type: Number
    },
    fold: {
      type: Boolean
    }
  },
  created () {
  },
  methods: {
    addCart () {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
    },
    decreaseCart () {
      if (this.food.count > 0) {
        this.food.count--
      }
      if (this.totalCount <= 1) {
        this.$emit('onfoldchange', false)
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.cartcontrol
  font-size:0px
  .cart-decrease, .cart-add
    display:inline-block
    padding:6px
    font-size:24px
    color:#00a0dc
    line-height:24px
  .cart-count
    display:inline-block
    width:12px
    vertical-align:top
    font-size:14px
    line-height:24px
    padding-top:6px
    color:rgb(147,153,159)
    text-align:center
  .cart-add
    display:inline-block
</style>

<template>
  <div id="app">
    <v_header :seller="seller"></v_header>
    <div class="tab border-1px">
      <router-link to="/goods" class="tab-item">商品</router-link>
      <router-link to="/ratings" class="tab-item">评论</router-link>
      <router-link to="/seller" class="tab-item">商家</router-link>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import header from './components/header/header'
// const ERR_OK = 0
export default {
  data () {
    return {
      seller: {},
      allData: {}
    }
  },
  created () {
    /* this.$http.get('/api/seller').then((data) => {
        data = JSON.parse(data.bodyText)
        if (data.errno === ERR_OK) {
          this.seller = data.data
        }
     })*/
    axios.get('https://www.easy-mock.com/mock/5b13c7edc5450f078273c580/example/datas').then((response) => {
      this.allData = response.data
      this.seller = response.data.seller
    })
  },
  components: { v_header: header },
  methods: {
  }
}
</script>

<style  lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
  #app
    .tab
      display:flex
      widows:100%;
      height:40px;
      line-height:40px;
      border-1px(rgba(7,17,27,.1))
      .tab-item
        flex:1
        text-align:center
      & > a
        color:rgb(77,85,93)
        font-size:14px
        &.active
          color:rgb(240,20,20)
</style>

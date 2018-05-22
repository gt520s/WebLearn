<template>
  <section class="index-container_10L_lQb shop-0">
    <div class="index-shopInfo_1RRTZ0d">
      <div class="logo-container_XoH2Vit_0">
        <div class="logo-main_21aInWJ_0">
          <img class="logo-logo_3S1eSkn_0" :src="'https://fuss10.elemecdn.com/'+data.restaurant.image_path[0]+'/'+data.restaurant.image_path[1]+data.restaurant.image_path[2]+'/'+data.restaurant.image_path.substring(3)+'.jpeg'" />
          <!---->
          <!---->
        </div>
        <!---->
      </div>
      <div class="index-main_N3FfcSz">
        <section class="index-line_2-iYR1A"  @click="gotoDetail(data.restaurant.id)">
          <h3 class="index-shopname_39Y7e3U"><i content="品牌" class="index-premium_39rl0v9">品牌</i> <span>{{data.restaurant.name}}</span></h3>
          <ul class="index-supportWrap_2lTcxr2">
            <!---->
            <li content="票"></li>
          </ul>
        </section>
        <section class="index-line_2-iYR1A">
          <div class="index-rateWrap_39dWx_g">
            <span class="index-rate_WsK58g8">{{data.restaurant.rating}}</span>
            <span>月售{{data.restaurant.recent_order_num}}单</span>
          </div>
          <!---->
        </section>
        <section class="index-line_2-iYR1A">
          <div class="index-moneylimit_2fCq9W5">
            <span>&yen;{{data.restaurant.piecewise_agent_fee.rules[0].price}}起送</span>
            <span>{{data.restaurant.piecewise_agent_fee.tips}}</span>
            <!---->
          </div>
          <div class="index-timedistanceWrap_2Dp_kzY">
            <span class="index-distanceWrap_1EPAlti">{{data.restaurant.distance}}米</span>
            <span>{{data.restaurant.order_lead_time}}分钟</span>
          </div>
        </section>
      </div>
    </div>
    <div class="index-activityWrap_3mo1GyG">
      <!---->
      <span>
        <svg class="index-dashedline_7B79b3W">
         <use xlink:href="#dashed-line.3732003"></use>
        </svg></span>
      <section class="index-activities_25AUDsx">
        <div class="index-activityList_1wvwwUY">
          <div class="index-actRow_2f_uNNA">
            <span class="index-iconWrap_1xJuKaY"><span class="index-icon_1fBCxBk" style="background-color: rgb(112, 188, 70);"> 首 </span></span>
            <span class="index-desc_JLha7Vr">新用户下单立减17元</span>
          </div>
          <div class="index-actRow_2f_uNNA">
            <span class="index-iconWrap_1xJuKaY"><span class="index-icon_1fBCxBk" style="background-color: rgb(240, 115, 115);"> 减 </span></span>
            <span class="index-desc_JLha7Vr">满25减15，满49减17，满79减20</span>
          </div>

        </div>
        <div class="index-activityBtn_tMk-e1C">
          6个活动
          <svg class="">
            <use xlink:href="#activity-more.c46fec1"></use>
          </svg>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import router from '../router'
export default {
  name: 'list-item',
  filter: {
    cn_psf (tips) {
      return (tips === '免配送费' ? '免配送费' : `配送费${tips}￥`)
    }
  },
  data () {
    return {
    }
  },
  props: ['data'],
  methods: {
    gotoDetail (id) {
      router.push(`/Detail/${id}`)
    }
  }
}
</script>

<style scoped>

</style>

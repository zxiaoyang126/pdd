<template>
  <div class="hot">
    <!-- 1.轮播图 -->
    <div class="swiper-container" v-if="homeCarouselData.length > 0">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(ele, index) in homeCarouselData" :key="index">
          <img :src="ele.imgurl" alt="">
        </div>       
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>    

    <!-- 2.导航部分 -->
    <hot-nav></hot-nav>

    <!-- 3.广告部分 -->
    <div class="hot-ad">
      <img src="../images/hot_ad/home_ad.gif" alt="">      
    </div>

    <!-- 4.商品列表开始 -->
    <hot-shop-list />
  </div>
</template>

<script>
  import HotNav from './HotNav'
  import HotShopList from './HotShopList'
  import {mapState} from 'vuex'

  export default {
    data() {
      return {

      }
    },
    computed: {
      ...mapState(['homeCarouselData'])
    },
    created() {
      //获取轮播图数据
      this.$store.dispatch('reqHomeCarousel'); 
      
      //获取商品列表数据
      this.$store.dispatch('reqShopList')
    },
    watch: {
      homeCarouselData() {
        this.$nextTick(() => {
          new Swiper(".swiper-container", {
            loop: true, // 循环模式选项
            autoplay: true,
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination"
            }
          });
        });
      }
    },
    components: {
      HotNav,
      HotShopList
    }
  };
</script>

<style lang="stylus" scoped>
  .hot
    width 100%
    height 100%
    margin-bottom 50px
    background-color #f5f5f5
    .swiper-container
      width 100%
      .swiper-wrapper
        .swiper-slide
          img 
            width 100%
    .hot-ad
      width 100%      
      background #ffffff
      margin 8px 0px
      padding 5px
      box-sizing border-box
      img
        width 100%
</style>

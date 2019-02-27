<template>
  <div class="recommend-item">
    <img :src="shop.thumb_url" alt="" width="100%">
    <p class="item-title" v-text="shop.short_name"></p>
    <p class="item-tik"></p>
    <div class="item-buy-wrap">      
      <span class="item-prices">¥{{shop.price / 100}}</span>
      <span class="item-count">{{shop.sales_tip}}</span>
      <span class="item-buy" @click="addCart(shop)">添加购物车</span>
    </div>    
  </div>
</template>

<script>
export default {
  props: {
    shop: {      
      type: Object
    },
    addCart: {
      type: Function,
      default: () => {}
    }
  }
};
</script>

<style lang="stylus" scoped>

.recommend-item    
    width 49.5%
    height 250px
    background-color #ffffff
    padding-bottom 10px
    margin-bottom 10px
    .item-title
        font-size 14px
        line-height 30px
        height 30px
        overflow hidden                
        color #666666
        font-weight 500
        padding 0px 2px
        text-align center
    .item-tik
        font-size 16px
        color orange 
        font-weight 700
    .item-buy-wrap
        display flex
        align-items center
        padding 0px 2px
        .item-prices
            font-size 14px
            color red
            font-weight 700
            margin-right 5px
        .item-count
            flex 1
            font-size 12px
            color #aaaaaa
        .item-buy
            border 1px solid #ff4400
            border-radius 2px                    
            font-size 12px
            padding 5px 2px
            color #ff4400
</style>

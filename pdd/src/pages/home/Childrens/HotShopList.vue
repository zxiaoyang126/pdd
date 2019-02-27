<template>
  <div class="hot-shop-list-wrap">
    <div class="hot-shop-list-content" v-for="(shop, index) in shopListData" :key="index">
        <div class="shop-list-img">
            <img :src="shop.thumb_url" alt="">
        </div>

        <div class="shop-list-info">
            <p v-text="shop.short_name"></p>
        </div>

        <div class="shop-list-buy">
            <div class="prices">¥{{shop.normal_price / 100}} <span>{{shop.sales_tip}}</span></div>
            <div class="person">
                <img v-for="(ele, index) in shop.bubble" :key="index" :src="ele.avatar" alt="">                
            </div>
            <div class="buy">
                <a>去拼单></a>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    computed: {
        ...mapState(['shopListData'])
    }
};
</script>

<style lang="stylus" scoped>
    .hot-shop-list-wrap
        width 100%        
        .hot-shop-list-content
            padding 8px 0px
            box-sizing border-box
            background-color #ffffff
            margin-bottom 5px
            .shop-list-img
                width 100%
                img 
                    width 100%                   
            .shop-list-info            
                height 35px
                padding 5px
                p
                    font-size 14px
                    line-height 17px
            .shop-list-buy
                padding 0px 5px           
                display flex
                align-items center
                .prices
                    font-size 18px
                    font-weight 900
                    color red                    
                    span
                        font-size 12px
                        color #cccccc
                        font-weight 500
                .person                    
                    flex 1
                    text-align right
                    margin-right 5px
                    position relative
                    top 3px
                    img
                        width 25px
                        height 25px
                        border-radius 50%
                        &:nth-of-type(1)
                            margin-right -5px
                .buy                    
                    a
                        padding 8px 12px
                        background-color #ff4400;
                        font-size 14px
                        color #ffffff
                        border-radius 2px


</style>

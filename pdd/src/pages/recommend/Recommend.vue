<template>
    <div class="recommend-wrap">
        <div class="recommend-content">
            <shop-list v-for="(shop, index) in recommendData" :key="index" :shop="shop" :addCart="addCart" />           
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'
import ShopList from '../../components/ShopList'
import BScroll from 'better-scroll'
import { Indicator, Toast } from 'mint-ui'
import { addToCart } from './../../api/index.js'


export default {
    data() {
        return {
            page: 1,
            count: 10
        }
    },
    computed: {
        ...mapState(['recommendData', 'cartData'])
    },
    mounted() {
        Indicator.open('加载中...');
        //获取推荐页面的商品数据
        this.$store.dispatch('reqRecommend', {
            page: this.page, 
            count: this.count,
            callBack: function () {
                Indicator.close();
            }
        });
    },
    components: {
        ShopList
    },
    watch: {
        recommendData() {
            this.$nextTick(() => {
                this.page++;
                //初始化滚动实例
                this.initRecommendScroll()
            })
        }
    },   
    methods: {
        initRecommendScroll() {
            if(!this.recommendScroll) {
                //创建滚动实例
                this.recommendScroll = new BScroll('.recommend-wrap', {
                    scrollY: true,
                    probeType: 3
                })
            }

            //监听上拉与下拉
            this.recommendScroll.on('touchEnd', (pos) => {
                if(pos.y > 50) {
                    console.log('上拉刷新');
                }

                if(this.recommendScroll.maxScrollY > pos.y + 50) {
                    console.log('下拉加载');
                    this.$store.dispatch('reqRecommend', {page: this.page, count: this.count});
                }                
            })

            this.recommendScroll.on('scrollEnd', () => {                
                this.recommendScroll.refresh()
            })
        },
        addCart(shop) {

            // 注释代码需要连接数据库

            // var goodsId = parseInt(shop.goods_id);
            // var goodsName = shop.goods_name;
            // var thumbUrl = shop.thumb_url;
            // var goodsCount = 1;
            // var goodsPrice = parseInt(shop.price);              

            // var result = addToCart({
            //     goodsId,
            //     goodsName,
            //     goodsCount,
            //     thumbUrl,                
            //     goodsPrice
            // })

            // result.then(data => {
            //     Toast({
            //         message: data.message,
            //         position: 'center',
            //         duration: 1000
            //     })
            // })
            

            var cartDataObj = {
                goods_id: parseInt(shop.goods_id),
                goods_name: shop.goods_name,
                thumb_url: shop.thumb_url,
                goods_count: 1,
                goods_price: parseInt(shop.price),
                isSelected: false
            }   

            this.$store.commit('addCartData', cartDataObj)

            Toast({
                message: '添加成功',
                position: 'center',
                duration: 1000
            })

           
        }
    }    
}
</script>

<style lang="stylus" scoped>

.recommend-wrap
    width 100%
    height 100%
    overflow hidden
    background-color #f5f5f5    
    .recommend-content
        width 100%
        padding-bottom 50px
        display flex
        flex-wrap wrap
        justify-content space-between
</style>

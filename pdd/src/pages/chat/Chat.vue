<template>
    <div class="chat">
        <div class="cart-wrap">

            <div class="cart-item" v-for="(goods, index) in cartData" :key="index">
                
                <div class="col checkbox">
                    <input type="checkbox" v-model="goods.isSelected" @click.prevent="selectSingle(goods)">
                </div>
                <div class="col goods-pic">
                    <img :src="goods.thumb_url" alt="" width="80">
                </div>
                <div class="col goods-info-wrap">
                    <div class="goods-name">{{goods.goods_name}}</div>
                    <div class="goods-price">¥{{(goods.goods_price / 100).toFixed(2)}}</div>
                    <div class="goods-count">
                        <div class="goods-number">
                            <a href="" class="col subBtn" :class="{disabled: goods.goods_count == 1 ? true : false}" @click.prevent="subCount(goods)">-</a>
                            <input type="text" class="col count" :value="goods.goods_count">
                            <a href="" class="col addBtn" @click.prevent="addCount(goods)">+</a>
                        </div>
                        <div class="goods-delete">
                            <a href="" @click.prevent="deleteGoods(goods)"><img src="./images/timg.jpg" alt="" width="13"></a>
                        </div>
                    </div>
                </div>
            </div>
            

        </div>

        <div class="cart-pay">
            <label for="selectAll">                
                <input type="checkbox" id="selectAll" v-model="isselectedAll" @click.prevent="selectAll">全选
            </label>
            <span>合计：{{totalPrice}}元</span>
            <button class="cart-pay-btn">去结算</button>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { Toast } from 'mint-ui'


export default {
    data() {
        return {
            isselectedAll: false,
            totalPrice: 0,
            //cartData: []            
        }
    },
    
    mounted() {
        //this.$store.dispatch('resCartData');    
        
    },
    computed: {
        ...mapState({
            cartData: state => state.cartData
        })
    },
    methods: {
        // ...mapMutations({          
        //     storeSelectAll: 'selectAll',
        //     storeSelectSingle: 'selectSingle'
        // }),

        subCount(goods) {
            if(goods.goods_count == 1) {
                Toast('该商品不能再减少了哦')
                return;
            }
            goods.goods_count--;
            this.calcTotalPrice();
        },
        addCount(goods) {
            goods.goods_count++;
            this.calcTotalPrice();
        },
        //全选
        selectAll() {
            this.isselectedAll = !this.isselectedAll;
            //this.storeSelectAll(this.isselectedAll)

            this.cartData.forEach((value, index) => {
                value.isSelected = this.isselectedAll;
            });
            this.calcTotalPrice();
        },
        //单选
        selectSingle(goods) {
            goods.isSelected = !goods.isSelected;            
            this.isAllSelected();
            this.calcTotalPrice();
        },
        //判断是否是全选状态
        isAllSelected() {
            var flag = true;
            this.cartData.forEach((value, index) => {
                if(!value.isSelected) {
                    flag = false;
                }
            })
            this.isselectedAll = flag;
        },
        //计算总的价格
        calcTotalPrice() {
            var totalPrice = 0;
            this.cartData.forEach((value, index) => {
                if(value.isSelected) {
                    totalPrice += value.goods_price * value.goods_count / 100;
                }
            })
            this.totalPrice = totalPrice.toFixed(2);
        },
        //移除购物车
        deleteGoods(goods) {
            var index = this.cartData.indexOf(goods);
            this.cartData.splice(index, 1);
            localStorage.setItem('cartData', JSON.stringify( this.cartData ))
            this.calcTotalPrice()
        }      
    }
    
}
</script>

<style lang="stylus" scoped>
    .chat        
        width 100%       
        .cart-wrap
            width 100%
            .cart-item
                width 100%                
                background #ffffff
                border-bottom 1px solid #cccccc
                overflow hidden
                padding 10px 0px
                .col
                    float left
                .checkbox
                    margin-right 5px
                .goods-pic
                    border 1px solid #ccc
                .goods-info-wrap
                    width 68%                    
                    float left
                    margin-left 10px 
                    .goods-name
                        font-size 14px
                        color #333
                        line-height 16px
                        width 100%
                    .goods-price 
                        font-size 16px
                        color red
                        line-height 30px
                        height 30px                        
                    .goods-count                        
                        width 100%
                        overflow hidden
                        position relative                        
                        .goods-number
                            overflow hidden
                            .subBtn
                                border 1px solid #cccccc
                                border-right none                            
                                height 18px
                                width 15px
                                text-align center
                            .addBtn
                                border 1px solid #cccccc
                                border-left none 
                                height 18px
                                width 15px
                                text-align center
                            .count
                                border 1px solid #cccccc
                                height 16px
                                line-height 16px
                                width 30px
                                text-align center
                            .disabled
                                border-color #eeeeee
                                color #eeeeee
                        .goods-delete                           
                            position absolute
                            height 18px
                            line-height 18px
                            right 10px
                            top 0
            &::after
                content ""
                height 0px
                display block
                clear both
        .cart-pay
            width 100%
            height 45px
            line-height 45px            
            background #f5f5f5
            position fixed
            left 0px
            bottom 50px
            .cart-pay-btn
                position absolute
                right 0px
                top 0px
                display inline-block
                border none
                height 100%

               
                        

                

</style>



<template>
    <div class="me">
        <!-- v-if="$store.state.userInfo.user_id" --> 
        <div class="personal" v-if="$store.state.userInfo.user_id">

            <div class="info">
                <router-link tag="div" to="/userInfo" class="user-pic"></router-link>

                <div class="user-name">
                    <span>{{$store.state.userInfo.user_id}}</span>
                </div>

                <div class="user-other">
                    <i class="icon-transaction_fill" style="font-size: 18px;"></i>
                    <span>拼单返现</span>
                </div>
            </div>

            <div class="order">
                <div class="order-title">
                    <h4>我的订单</h4>
                    <span>查看全部 ></span>
                </div>
                <div class="middle-menu" style="margin: 0px">
                    <div class="middle-menu-item">
                        <i class="icon-connection"></i>
                        <span>待付款</span>
                    </div>
                    <div class="middle-menu-item">
                        <i class="icon-podcast"></i>
                        <span>待分享</span>
                    </div>
                    <div class="middle-menu-item">
                        <i class="icon-feed"></i>
                        <span>待发货</span>
                    </div>
                    <div class="middle-menu-item">
                        <i class="icon-mic"></i>
                        <span>待收货</span>
                    </div>
                    <div class="middle-menu-item">
                        <i class="icon-phone"></i>
                        <span>待评价</span>
                    </div>
                </div>
            </div>

            <div class="middle-menu">
                <div class="middle-menu-item">
                    <i class="icon-piaofang"></i>
                    <span>优惠券</span>
                </div>
                <div class="middle-menu-item">
                    <i class="icon-shangpin"></i>
                    <span>商品收藏</span>
                </div>
                <div class="middle-menu-item">
                    <i class="icon-dianpu"></i>
                    <span>店铺收藏</span>
                </div>
                <div class="middle-menu-item">
                    <i class="icon-browse"></i>
                    <span>历史记录</span>
                </div>
                <div class="middle-menu-item">
                    <i class="icon-transaction_fill"></i>
                    <span>退款售后</span>
                </div>
            </div>

            <div class="middle-menu">
                <div class="middle-menu-item">
                    <i class="icon-upload"></i>
                    <span>多多果园</span>
                </div>
                <div class="middle-menu-item">
                    <i class="icon-bubbles2"></i>
                    <span>天天红包</span>
                </div>
                <div class="middle-menu-item">
                    <i class="icon-enlarge"></i>
                    <span>砍价免费拿</span>
                </div>
                <div class="middle-menu-item">
                    <i class="icon-wrench"></i>
                    <span>多多旅行</span>
                </div>
                <div class="middle-menu-item">
                    <i class="icon-aid-kit"></i>
                    <span>收货地址</span>
                </div>

                <div class="middle-menu-item">
                    <i class="icon-pie-chart"></i>
                    <span>官方客服</span>
                </div>

                <div class="middle-menu-item">
                    <i class="icon-star-full"></i>
                    <span>我的评价</span>
                </div>

                <router-link tag="div" to="/setting" class="middle-menu-item">
                    <i class="icon-bubbles2"></i>
                    <span>设置</span>
                </router-link>
            </div>

            
        </div>
        <select-login v-else />
    </div>
</template>

<script>
import SelectLogin from './login/SelectLogin'

export default {
    data() {
        return {

        }
    },
    components: {
        SelectLogin
    }   
}
</script>

<style lang="stylus" scoped>
    .me
        width 100%
        height 100%
        background #f5f5f5
        .personal
            width 100%
            .info
                width 100%
                display flex
                background-color #ffffff               
                align-items center
                padding 10px 15px
                box-sizing border-box
                .user-pic
                    width 20%
                    padding-top 20%
                    height 0
                    border-radius 50%
                    background-image url('./login/images/me_icon.png')
                    background-size cover
                    margin-right 15px
                .user-name
                    font-size 22px
                    font-weight bolder
                    flex 1
                .user-other
                    border 1px solid #cccccc
                    font-size 12px
                    border-radius 15px
                    padding 0 5px
                    display flex
                    justify-content center 
                    align-items center
                
            .order 
                width 100%                
                .order-title
                    display flex
                    background #fff
                    height 40px
                    align-items center
                    padding 0px 10px
                    box-sizing border-box
                    h4
                        font-size 16px
                        color #333
                        flex 1
                    span
                        font-size 12px
                        color #999
            .middle-menu
                width 100%
                display flex
                padding 10px 0px
                background #ffffff
                margin 10px 0px
                flex-wrap wrap
                .middle-menu-item
                    width 20%                    
                    text-align center                    
                    display flex
                    flex-direction column
                    justify-content center                    
                    span 
                        font-size 12px
                        line-height 22px
                        height 22px
                    .icon-browse
                        font-size 40px
</style>

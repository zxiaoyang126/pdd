<template>
    <div class="tab">
        <div class="tab-item" :class="{active: $route.path.includes('/home')}" @click="navigatorTo('/home')">
            <span class="icon icon-home"></span>
            <span>首页</span>
        </div>

        <div class="tab-item" :class="{active: $route.path == '/recommend'}" @click="navigatorTo('/recommend')">
            <span class="icon icon-recommend"></span>
            <span>推荐</span>
        </div>

        <div class="tab-item" :class="{active: $route.path == '/search'}" @click="navigatorTo('/search')">
            <span class="icon icon-search"></span>
            <span>搜索</span>
        </div>

        <div class="tab-item" :class="{active: $route.path == '/chat'}" @click="navigatorTo('/chat')">
            <span class="icon icon-chat"></span>
            <span>购物车</span>
        </div>

        <div class="tab-item" :class="{active: $route.path == '/me'}" @click="navigatorTo('/me')">
            <span class="icon icon-me"></span>
            <span>我的</span>
        </div>
    </div>

</template>

<script>
export default {
    name: 'Tabbar',
    data() {
        return {

        }  
    },
    methods: {
        navigatorTo(path) {
            this.$router.replace(path);
        }
    }
  
}
</script>

<style lang="stylus" scoped>
    .tab
        background #ffffff
        height 50px
        width 100%
        display flex
        position fixed
        left 0
        bottom 0
        z-index 999        
        .tab-item
            flex auto
            display flex
            width 25%
            flex-direction column
            justify-content center
            align-items center
            font-size 12px
            color #666666           
            .icon
                width 23px
                height 23px
                background-size cover
                margin-bottom 5px
                &.icon-home                   
                    background-image url('../../static/img/icon_home.png')
                &.icon-recommend                   
                    background-image url('../../static/img/icon_intro.png')
                &.icon-search                   
                    background-image url('../../static/img/icon_search.png')
                &.icon-chat                   
                    background-image url('../../static/img/icon_chat.png')
                &.icon-me                   
                    background-image url('../../static/img/icon_mine.png')
            &.active
                color red
                .icon-home
                    background-image url('../../static/img/icon_home_selected.png')
                .icon-recommend
                    background-image url('../../static/img/icon_intro_selected.png')
                .icon-search
                    background-image url('../../static/img/icon_search_selected.png')
                .icon-chat
                    background-image url('../../static/img/icon_chat_selected.png')
                .icon-me
                    background-image url('../../static/img/icon_mine_selected.png')               
 
     

</style>

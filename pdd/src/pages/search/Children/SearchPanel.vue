<template>
    <div class="search-panel">
        <div class="panel-head">
            <div class="panel-head-wrap">
                <img src="../images/icon_search.png" alt="" width="18">
                <input type="text" placeholder="请输入关键字" ref="input">
            </div>
            <button @click="showPanel(false)">取消</button>
        </div>

        <div class="panel-body">
            <h4 class="panel-title"><img src="../images/hot.png" width="20">热门搜索</h4>
            <ul class="panel-keys">
                <li class="penel-item">瓜子小包装</li>
                <li class="penel-item">耳机线</li>
                <li class="penel-item">净水器家用</li>
                <li class="penel-item">vivox9手机壳</li>                
                <li class="penel-item">阿道夫洗发水</li>
            </ul>

        </div>
    </div>
</template>

<script>
export default {

    props: {
        showPanel: Function
    },
    mounted() {
        this.$refs.input.focus()
    }
    
}
</script>

<style lang="stylus" scoped>

    .search-panel
        width 100%
        height 100%
        background #ffffff
        position absolute
        left 0
        top 0
        .panel-head
            padding 20px
            background #ffffff
            display flex
            justify-content space-between
            align-items center
            border-bottom 1px solid #cccccc
            .panel-head-wrap
                display flex
                justify-content flex-start
                align-items center
                background #cccccc
                height 30px
                flex 1
                padding 0 10px
                border-radius 5px
                input 
                    margin-left 5px
                    outline none
                    border none
                    height 80%
                    width 80%
                    background transparent
            button 
                border 0px
                background transparent
                font-size 14px
                color #cccccc

        .panel-body            
            padding 25px 20px
            .panel-title
                font-size 14px
                color #666666
                margin-bottom 15px
                img                    
                    position relative
                    top 4px
            .panel-keys 
                display flex
                flex-wrap wrap
                li
                    background #eeeeee
                    font-size 12px
                    padding 10px 15px
                    border-radius 10px
                    margin 5px
                .panel-item
                    background #cccccc
                    
               
</style>


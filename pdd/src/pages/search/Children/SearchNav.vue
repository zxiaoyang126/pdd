<template>

    <div class="search-top-wrap">
        <a href="" class="search-top-content" @click.prevent="showPanel(true)">
            <img src="../images/icon_search.png" alt="" class="search-top-icon">
            <span class="search-top-keyword">世咕嘟里中中</span>
        </a>
    </div>
    
</template>

<script>
export default {
    methods: {
        alert(flag) {
            alert(flag)
        }
    },
    props: {
        showPanel: Function
    }
    
}
</script>


<style lang="stylus" scoped>
@import '../../../common/stylus/mixins.styl'
    .search-top-wrap
        width 100%
        height 60px        
        background-color #ffffff
        border-bottom-1px(#cccccc)
        display flex
        justify-content center
        align-items center
        .search-top-content
            background-color #eeeeee
            border-radius 5px
            width 80%
            height 60%
            display block
            display flex
            justify-content center
            align-items center
            .search-top-icon
                width 16px
                height 16px
            .search-top-keyword
                font-size 16px
                color #666666
                margin-left 5px

</style>

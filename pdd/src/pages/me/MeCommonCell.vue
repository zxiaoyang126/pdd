<template>
    <div class="cell-wrap" @click="callBack(title)">
        <i :class="icon" class="icon-pic"></i>
        <span class="cell-title">{{title}}</span>
        <span class="cell-arrow" v-show="isShowArrow">></span>
    </div>    
</template>

<script>
export default {
    data() {
        return {

        }
    },

    props: {
        icon: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        isShowArrow: {
            type: Boolean,
            default: true
        },
        callBack: {
            type: Function,
            default: (title) => {}
        }
    }


}
</script>

<style lang="stylus" scoped>

    .cell-wrap
        width 100%
        padding 0px 10px
        box-sizing border-box
        display flex
        justify-content center
        align-items center
        height 40px
        line-height 40px
        background #ffffff
        border-bottom 1px solid #f5f5f5
        .icon-pic 
            font-size 18px
            margin-right 5px
        .cell-title 
            font-size 14px
            color #333
            flex 1
        .cell-arrow
            color #666
            font-size 12px


</style>

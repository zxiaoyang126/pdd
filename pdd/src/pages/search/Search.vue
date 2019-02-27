<template>
    <div class="search-wrap">
        <!-- 头部搜索 -->
        <search-nav :showPanel="showPanel" />

        <!-- 搜索主体 -->
        <div class="search-body">                        
            <div class="search-menu" ref="searchMenu">
                <ul>
                    <li class="menu-item" v-for="(type, index) in searchData" :key="index" :class="{active: index === currentIndex}">
                        <a href="javascript: ;" @click="handleChoose(index)">{{type.name}}</a>
                    </li>                    
                </ul>
            </div>
            <div class="search-main" ref="searchMain">
                <ul class="search-main-wrap">
                    <li class="search-main-item" v-for="(type, index1) in searchData" :key="index1">
                        <div class="main-item-type">
                            <h4 class="item-type-title">{{type.name}}</h4>
                            <span class="item-type-more">查看更多></span>
                        </div>
                        <ul class="main-item-content">
                            <li class="main-item-list" v-for="(item, index2) in type.items" :key="index2">
                                <img :src="item.icon" alt="">
                                <span v-text="item.title"></span>
                            </li>                            
                        </ul>
                    </li>
                </ul>
            </div>
        </div>


        <!-- 搜索页面 -->
        <search-panel v-if="isShow" :showPanel="showPanel"/>
        
    </div>
</template>

<script>
import SearchNav from './Children/SearchNav'
import SearchPanel from './Children/SearchPanel'
import {mapState} from 'vuex'
import BScroll from 'better-scroll'

export default {
    data() {
        return {
            currentIndex: 0,
            rightScrollLiTops: [],
            leftScrollLi: [],
            rightScrollY: 0,
            isShow: false
        }
    },
    computed: {
        ...mapState(['searchData'])    
    },

    mounted() {
        this.$store.dispatch('resSearchList')        
    },
    methods: {
       handleChoose(index) {
           this.currentIndex = index;
           this.rightScrollY = this.rightScrollLiTops[index];           
           this.mainScroll.scrollTo(0, -this.rightScrollY, 300);
       },
       //初始化左右滚动条
       initBScroll() {
           this.menuScroll = new BScroll('.search-menu');
           this.mainScroll = new BScroll('.search-main', {
               probeType: 3
           });            
       },

       //初始化右侧滚动数据
       initRigthScrollData() {
            var liArr = this.$refs.searchMain.getElementsByClassName('search-main-item');
            var top = 0;
            var temp = [0];
            [].slice.call(liArr).forEach((ele, index) => {
                console.log(ele.offsetHeight)
                top += ele.offsetHeight;
                temp.push(top)
            })
            this.rightScrollLiTops = temp;
       },

       //初始化左侧滚动数据
       initLeftScrollData() {
           var liArr = this.$refs.searchMenu.getElementsByClassName('menu-item');
           this.leftScrollLi = [].slice.call(liArr);           
       },
       //监听右侧滚动事件
       listenRightScroll() {           
            let {rightScrollY, rightScrollLiTops} = this;
            this.mainScroll.on('scroll', (pos) => {  
                rightScrollY = Math.abs(pos.y);
                for(var i = 0; i < rightScrollLiTops.length; i++) {
                    if(rightScrollLiTops[i]-80 <= rightScrollY && rightScrollY < rightScrollLiTops[i + 1]-80) {
                        this.currentIndex = i;                         
                        this.menuScroll.scrollToElement(this.leftScrollLi[this.currentIndex], 300, 0, true)                     
                        return;
                    }
                }
            })
            
       },

       showPanel(flag) {
           this.isShow = flag
       }

    },
    components: {
        SearchNav,
        SearchPanel
    },
    watch: {
        searchData() {
            this.$nextTick(() => {
                //初始化左右滚动条
                this.initBScroll();

                //初始化右侧滚动数据
                this.initRigthScrollData();

                //初始化左侧滚动数据
                this.initLeftScrollData();

                //监听右侧滚动事件
                this.listenRightScroll();            
            })
        }
    }
    
}
</script>

<style lang="stylus" scoped>
    .search-wrap
        width 100%
        height 100%       
        background-color #f5f5f5    
        position relative
        .search-body
            width 100%            
            display flex
            position absolute
            overflow hidden
            left 0
            right 0
            top 60px
            bottom 50px
            .search-menu 
                width 80px
                flex 0 0 80px
                background #eeeeee
                .menu-item
                    text-align center 
                    line-height 60px
                    height 60px
                    font-size 16px
                    a
                        color #666666
                        width 100%
                        height 100%
                        display inline-block
                    &.active
                        background-color #ffffff
                        color red
                        position relative
                        &::before
                            content ''
                            position absolute
                            left 0
                            top 15px
                            width 3px
                            height 30px
                            background-color red
        .search-main
            flex 1
            background-color #ffffff
            overflow hidden            
            .search-main-wrap
                padding 0px 10px                             
                .search-main-item                    
                    padding 10px 0px
                    .main-item-type
                        display flex
                        justify-content space-between
                        height 35px
                        line-height 35px                        
                        .item-type-title
                            font-size 16px
                            color #333333
                        .item-type-more
                            font-size 12px
                            color #666666
                    .main-item-content
                        width 100%                        
                        display flex
                        flex-wrap wrap
                        .main-item-list
                            width 33.3%                           
                            margin-bottom 5px
                            display flex
                            flex-direction column
                            justify-content center
                            align-items center
                            img 
                                width 58px
                                height 58px
                            span 
                                font-size 12px
                                line-height 25px

                            



</style>

<template>
  <div class="hot-nav-wrap">
      <!-- 滚动区域 -->
      <div class="hot-nav-content">
          <ul class="nav-content-inner">
            <li href="" class="hot-nav-item">
                <img src="../images/nav/nav_icon01.png" alt="">
                <span>限时秒杀</span>
            </li>
            <li href="" class="hot-nav-item">
                <img src="../images/nav/nav_icon02.png" alt="">
                <span>限时秒杀</span>
            </li>
            <li href="" class="hot-nav-item">
                <img src="../images/nav/nav_icon03.png" alt="">
                <span>限时秒杀</span>
            </li>
            <li href="" class="hot-nav-item">
                <img src="../images/nav/nav_icon01.png" alt="">
                <span>限时秒杀</span>
            </li>
            <li href="" class="hot-nav-item">
                <img src="../images/nav/nav_icon02.png" alt="">
                <span>限时秒杀</span>
            </li>
            <li href="" class="hot-nav-item">
                <img src="../images/nav/nav_icon03.png" alt="">
                <span>限时秒杀</span>
            </li>
            <li href="" class="hot-nav-item">
                <img src="../images/nav/nav_icon01.png" alt="">
                <span>限时秒杀</span>
            </li>
            <li href="" class="hot-nav-item">
                <img src="../images/nav/nav_icon02.png" alt="">
                <span>限时秒杀</span>
            </li>
            <li href="" class="hot-nav-item">
                <img src="../images/nav/nav_icon03.png" alt="">
                <span>限时秒杀</span>
            </li>
            <li href="" class="hot-nav-item">
                <img src="../images/nav/nav_icon01.png" alt="">
                <span>限时秒杀</span>
            </li>
            <li href="" class="hot-nav-item">
                <img src="../images/nav/nav_icon02.png" alt="">
                <span>限时秒杀</span>
            </li>
            <li href="" class="hot-nav-item">
                <img src="../images/nav/nav_icon03.png" alt="">
                <span>限时秒杀</span>
            </li>
            <li href="" class="hot-nav-item">
                <img src="../images/nav/nav_icon01.png" alt="">
                <span>限时秒杀</span>
            </li>
            <li href="" class="hot-nav-item">
                <img src="../images/nav/nav_icon02.png" alt="">
                <span>限时秒杀</span>
            </li>
            <li href="" class="hot-nav-item">
                <img src="../images/nav/nav_icon03.png" alt="">
                <span>限时秒杀</span>
            </li>
            <li href="" class="hot-nav-item">
                <img src="../images/nav/nav_icon01.png" alt="">
                <span>限时秒杀</span>
            </li>    
          </ul>
      </div>

      <!-- 滚动条区域 -->
      <div class="scrollBar-wrap">
          <div class="scrollBar-inner" :style="scrollInnerStyle"></div>
      </div>      
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
      data() {
          return {
              screenW: window.innerWidth,
              scrollContentW: 720,
              scrollBarWrapW: 100,
              scrollBarInnerW: 0,
              scrollBarInnerL: 0,
              touchStartX: 0,
              touchEndX: 0
          }
      },
      computed: {
          scrollInnerStyle() {
              return {
                  width: this.scrollBarInnerW + 'px',
                  left: this.scrollBarInnerL + 'px',
              }
          },
          ...mapState({
              hotNavData: state => state.hotNavData
          })                 
      },
      mounted() {
          this.getScrollBarInnerW();
          this.bindEvent();
          this.$store.dispatch('reqHotNav');          
      },
      methods: {
          getScrollBarInnerW() {
              this.scrollBarInnerW = (this.scrollBarWrapW * this.screenW) / this.scrollContentW; 
          },
          bindEvent() {
              this.$el.addEventListener('touchstart', this.handleTouchStart, false);
              this.$el.addEventListener('touchmove', this.handleTouchMove, false);
              this.$el.addEventListener('touchend', this.handleTouchEnd, false);
          },
          handleTouchStart(event) {
              this.touchStartX = event.touches[0].pageX;             
          },
          handleTouchMove(event) {

              //计算滚动条滚动距离
              var touchEndX = event.touches[0].pageX;
              var touchMoveW = touchEndX - this.touchStartX;
              this.scrollBarInnerL = -(touchMoveW / this.scrollContentW * this.scrollBarWrapW) + this.touchEndX;
              
              //滚动条左边边界
              if(this.scrollBarInnerL <= 0) {
                  this.scrollBarInnerL = 0;
              }
              
              //滚动条右边边界
              if(this.scrollBarInnerL >= this.scrollBarWrapW - this.scrollBarInnerW) {
                  this.scrollBarInnerL = this.scrollBarWrapW - this.scrollBarInnerW;
              }
          },
          handleTouchEnd(event) {
              //将滚动条最后的偏移距离记录
              this.touchEndX = this.scrollBarInnerL;
          }
      }

  };
</script>

<style lang="stylus" scoped>
    .hot-nav-wrap 
        width 100%        
        background-color #ffffff        
        .scrollBar-wrap
            width 100px
            height 3px
            background-color #cccccc
            margin 0 auto
            position relative
            .scrollBar-inner
                position absolute
                height 100%                
                background-color red
                left 0               
                top 0            
        .hot-nav-content
            width 100%          
            overflow-x scroll
            height 180px            
            &::-webkit-scrollbar
                display none
            .nav-content-inner 
                width 720px
                height 180px
                display flex
                flex-wrap wrap 
                .hot-nav-item
                    display flex
                    flex-direction column
                    justify-content center
                    align-items center
                    width 90px
                    height 90px
                    font-size 12px
                    color #666666            
                    img
                        width 40%
                        margin-bottom 5px
        

</style>

<template>
    <div class="select-login-wrap">
        <div class="select-login-content">
            <img src="./images/lk_logo_sm.png" alt="" width="80%">
            <h4>选择登陆方式</h4>
            <router-link tag="button" to="/login">手机登陆</router-link>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>


<style lang="stylus" scoped>
    .select-login-wrap
        width 100%
        padding-top 100px        
        .select-login-content
            width 100%
            text-align center
            img 
                margin-bottom 40px                
            h4
                font-size 12px
                color #333 
                margin-bottom 20px                         
            button 
                width 80%
                height 38px
                background-color mediumpurple
                border none
                border-radius 5px
                font-size 20px
                color #fff               
                
               


</style>

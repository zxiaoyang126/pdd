<template>
    <div class="setting-wrap">
        <div>
            <me-common-cell title="免密支付设置" icon="icon-dianpu" />
            <me-common-cell title="免拼卡设置" icon="icon-piaofang" />
            <me-common-cell title="消息接收设置" icon="icon-shangpin" />
        </div>

        <div style="margin: 10px 0px">
            <me-common-cell title="常见问题" icon="icon-transaction_fill" />
            <me-common-cell title="意见反馈" icon="icon-podcast" />            
        </div>

        <div>
            <me-common-cell title="商家免费入驻" icon="icon-mic" />            
        </div>

        <div class="logout" @click="logoutHandler">
            退出登陆
        </div>
    </div>
    
</template>

<script>
import MeCommonCell from './MeCommonCell'
import { MessageBox } from 'mint-ui'
import { mapMutations } from 'vuex'

export default {
    data() {
        return {

        }
    },
    components: {
        MeCommonCell
    },
    methods: {
        ...mapMutations({            
            addUserInfo: 'addUserInfo'
        }),
        logoutHandler() {
            MessageBox.confirm('是否确定退出登陆').then(result => {
                if(result === 'confirm') {
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', 'http://127.0.0.1:3000/api/logout', true);                    
                    xhr.withCredentials = true;
                    xhr.send();
                    xhr.onreadystatechange = () => {
                        if(xhr.readyState == 4 && xhr.status == 200) {                            
                            this.addUserInfo({})
                            this.$router.back();
                        }
                    }
                }
            })
        }
    }
        
}
</script>


<style lang="stylus" scoped>
    .logout
        width 100%
        height 40px
        line-height 40px
        text-align center
        font-size 14px
        color #666
        background #ffffff
        margin-top 15px
</style>

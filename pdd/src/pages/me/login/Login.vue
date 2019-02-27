<template>
    <div class="login-wrap">

        <!-- 内容区域 --> 
        <div class="login-content">
            <!-- logo图标 -->
            <img class="logo" src="./images/lk_logo_sm.png" alt="" width="100%">

            <!-- 选择登陆方式 -->
            <p class="login-method">
                <span :class="{current: loginFlag}" @click="chooseLoginMethod(true)">短信登陆</span>
                <span :class="{current: !loginFlag}" @click="chooseLoginMethod(false)">密码登陆</span>
            </p>

            <!-- 手机号登陆 -->
            <div  v-if="loginFlag" class="phone-login">
                <span v-if="!time" @click="getCaptcha" :class="{captcha: isPhoneNumber}">获取验证码</span>
                <span v-else style="color: #333">已发送({{time}}s)</span>                
                <input type="text" placeholder="手机号" maxlength="11" v-model="phoneNumber">
                <input type="text" placeholder="验证码" maxlength="6" v-model="smsCaptcha">
            </div>

            <!-- 用户名密码登陆 -->
            <div v-else class="password-login" >
                <input type="text" placeholder="用户名" v-model="userName">
                <div class="pwd">
                    <img src="./images/hide_pwd.png" alt="" v-if="pwdMode" @click="hidePwd(false)">
                    <img src="./images/show_pwd.png" alt="" v-else @click="hidePwd(true)">
                    
                    <input type="password" v-model="pwd" v-if="pwdMode">
                    <input type="text" v-model="pwd" v-else>
                </div>
                <div class="captcha">
                    <img src="http://127.0.0.1:3000/api/getCaptcha" alt="" @click="changeCaptcha($event)">
                    <input type="text" placeholder="验证码" v-model="svgCaptcha">
                </div>
            </div>

            <!-- 温馨提示 -->
            <div class="tip" v-show="loginFlag">
                温馨提示：未注册撩课帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">服务协议与隐私政策</a>
            </div>

            <button class="confrim" @click="login">登陆</button>
            <button class="cancel" @click.prevent="back()">返回</button>
        </div>
    </div>
</template>

<script>
import {getPhoneCode, login} from './../../../api/index.js'
import { Toast } from 'mint-ui'
import { mapMutations } from 'vuex'
import axios from 'axios'

export default {
    data() {
        return {
            loginFlag: true, //true短信登陆 false密码登陆
            phoneNumber: '', //电话号码            
            time: 0,
            userName: '',
            pwd: '',
            pwdMode: true, //true隐藏密码 false显示密码
            smsCaptcha: '',
            svgCaptcha: ''
        }
    },
    methods: {
        ...mapMutations({
            addUserInfo: 'addUserInfo'
        }),
        chooseLoginMethod(flag) {
            this.loginFlag = flag;            
        },
        getCaptcha() {
            if(!this.isPhoneNumber) return;
            //倒计时60s
            this.countDown();

            //向后台发送请求6位数字验证码
            this.getPhoneCode()
        },
        countDown() {
            this.time = 60;
            var timer = setInterval(() => {
                this.time--;
                if(this.time == 0) {
                    clearInterval(timer);                    
                }
            }, 1000)
        },
        async getPhoneCode() {
            var result = await getPhoneCode({phoneNumber: this.phoneNumber});
            if(result.err_code == 0) {
                console.log(result.message)

                //获取验证码失败，提示信息
                Toast({message: result.message})
            } else {
                console.log(result)
                //获取验证码成功，提示信息
                Toast({message: '已成功发送'})
            }
        },

        login() {
            if(this.loginFlag) {
                //短信登陆
                this.smsLogin()
            } else {
                //密码登陆
                this.pwdLogin()
            } 
        },
        //短信登陆
        smsLogin() {
            if(!this.phoneNumber) {//检验手机号是否输入
                Toast({message: '请输入手机号'})
                return;
            }
            if(!this.smsCaptcha) {//检验验证码是否输入
                Toast({message: '请输入验证码'})
                return;
            }
            this.ajax('http://127.0.0.1:3000/api/login')           
  
            // var reuslt = login({phone: this.phoneNumber, code: this.smsCaptcha});
            // reuslt.then(data => {
            //     console.log(data)                
            //     this.addUserInfo(data.message);
            //     this.$router.back();
            // }).catch(err => {
            //     console.log(err)
            // })
        },
        //密码登陆
        pwdLogin() {
            if(!this.userName) {
                Toast({message: '请输入用户名'});
                return;
            };
            if(!this.pwd) {
                Toast({message: '请输入密码'});
                return;
            };
            if(!this.svgCaptcha) {
                Toast({message: '请输入验证码'});
                return;
            }
        },
        //显示隐藏密码
        hidePwd(flag) {
            this.pwdMode = flag;
        },
        back() {
            this.$router.back()
        },
        //刷新验证码
        changeCaptcha(ev) {           
            ev.srcElement.src = 'http://127.0.0.1:3000/api/getCaptcha?' + new Date().getTime();            
        },
        ajax(url) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xhr.withCredentials = true;
            xhr.send('phone=' + this.phoneNumber + '&code=' + this.smsCaptcha);
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4 && xhr.status == 200) {
                    console.log(xhr.responseText)
                    this.addUserInfo(JSON.parse(xhr.responseText).message)
                    this.$router.back();
                }
            }
        }
    },
    computed: {
        isPhoneNumber() {
            return /^1[3,4,5,7,8][0-9]{9}$/.test(this.phoneNumber)
        }
    }
    
}
</script>

<style lang="stylus" scoped>
    .login-wrap
        width 100%
        height 100%
        background #f5f5f5
        .login-content
            padding 30px 15%            
            text-align center
            .logo
                margin 10px 0px
            .login-method 
                padding 0px 20px               
                color #666
                font-size 0px
                margin-bottom 20px
                span
                    display inline-block
                    height 35px
                    line-height 35px
                    font-size 16px
                    &.current
                        border-bottom 2px solid mediumpurple
                        color mediumpurple
                        font-weight bolder
                    &:nth-child(1)
                        margin-right 10px
                    &:nth-child(2)
                        margin-left 10px
            .phone-login
                width 100%
                position relative
                span 
                    position absolute
                    right 5px
                    top 12px
                    font-size 12px
                    color #ccc
                    &.captcha
                        color mediumpurple                        
                input 
                    width 100%
                    height 40px
                    line-height 40px
                    margin-bottom 15px
                    text-indent 5px
                    font-size 14px
                    border 1px solid #ccc
                    box-sizing border-box
                    border-radius 5px
                    outline none 
                    &:focus
                        border 1px solid mediumpurple
            .password-login
                width 100%
                .pwd
                    width 100%
                    position relative
                    img 
                        width 8%
                        position absolute
                        right 5px
                        top 10px
                .captcha
                    width 100%
                    position relative
                    img 
                        height 30px
                        position absolute
                        right 0px
                        top 5px
                input 
                    width 100%
                    height 40px
                    line-height 40px
                    margin-bottom 15px
                    text-indent 5px
                    font-size 14px
                    border 1px solid #ccc
                    box-sizing border-box
                    border-radius 5px
                    outline none 
                    &:focus
                        border 1px solid mediumpurple
                
            .tip 
                text-align left 
                font-size 12px
                line-height 18px
                margin-bottom 20px
            .confrim
                width 100%
                border-radius 5px
                padding 10px 0px
                font-size 14px
                border none 
                background-color mediumpurple
                margin-bottom 15px
            .cancel
                width 100%
                border 1px solid mediumpurple
                box-sizing border-box
                background-color transparent
                border-radius 5px
                padding 10px 0px
                font-size 14px
                    
                
</style>

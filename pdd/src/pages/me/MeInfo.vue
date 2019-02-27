<template>
    <div class="user-info-warp">
        <h4 class="user-info-title">基本信息</h4>
        <ul class="user-info-content">
            <li class="user-info-item">
                <span>头像</span>
                <img src="./login/images/me_icon.png" alt="">
            </li>

            <li class="user-info-item">
                <span>昵称</span>
                <span @click="addName">{{user_name}}</span>
            </li>

            <li class="user-info-item">
                <span>性别</span>
                <span @click="sheetVisible = !sheetVisible">{{user_sex}}</span>
            </li>

            <li class="user-info-item">
                <span>常住地</span>
                <span @click="addAddress">{{user_address}}</span>
            </li>


            <li class="user-info-item">
                <span>生日</span>
                <span @click="chooseBirthday">{{user_birthday}}</span>
            </li>

            <li class="user-info-item">
                <span>个性签名</span>
                <span @click="addSign">{{user_sign}}</span>
            </li>
            
        </ul>

        <button @click.prevent="upDataInfo">提交修改</button>

        <!-- 性别选择 -->
        <mt-actionsheet
            :actions="actions"
            v-model="sheetVisible">
        </mt-actionsheet>

        <!-- 生日选择 --> 
        <mt-datetime-picker
            ref="picker"
            type="date"
            :startDate="startDate"
            :endDate="endDate"            
            @confirm="getDate">
        </mt-datetime-picker>
    </div>
</template>


<script>

import { MessageBox, Actionsheet, DatetimePicker, Toast } from 'mint-ui'
import { mapState, mapMutations } from 'vuex'
import { updataUserInfo } from './../../api/index.js'

export default {
    data() {
        return {            
            sheetVisible: false,
            actions: [
                {
                    name: '男', method: this.chooseSex
                },
                {
                    name: '女', method: this.chooseSex
                }
            ],

            startDate: new Date('1960-01-01'),
            endDate: new Date
        }
    },
    computed: {
        ...mapState({
            user_name: state => state.userInfo.user_name,
            user_sex: state => state.userInfo.user_sex,
            user_address: state => state.userInfo.user_address,
            user_birthday: state => state.userInfo.user_birthday,
            user_sign: state => state.userInfo.user_sign,
            user_id: state => state.userInfo.user_id

        })
    },
    methods: {
        ...mapMutations(['changeUserInfo']),
        addAddress() {
            MessageBox.prompt('请输入您的地址').then(({ value, action }) => {
                if(action === 'confirm') {                   
                    this.changeUserInfo({
                        type: 'user_address',
                        value: value
                    })
                }
            });
        },
        addSign() {
            MessageBox.prompt('请输入您的个性签名').then(({ value, action }) => {
                if(action === 'confirm') {
                    this.changeUserInfo({
                        type: 'user_sign',
                        value: value
                    })
                }
            });
        },
        addName() {
            MessageBox.prompt('请输入您的昵称').then(({ value, action }) => {
                if(action === 'confirm') {
                    this.changeUserInfo({
                        type: 'user_name',
                        value: value
                    })
                }
            });
        },
        chooseSex(result) {
            this.changeUserInfo({
                type: 'user_sex',
                value: result.name
            })
        },
        chooseBirthday() {
            this.$refs.picker.open()
        },
        getDate(value) {
            var user_birthday = `${value.getFullYear()}年 ${value.getMonth() + 1}月 ${value.getDate()}日`
            this.changeUserInfo({
                type: 'user_birthday',
                value: user_birthday
            })
        },
        upDataInfo() {
            updataUserInfo({
                userName: this.user_name,
                userSex: this.user_sex,
                userAddress: this.user_address,
                userBirthday: this.user_birthday,
                userSign: this.user_sign,
                userId: this.user_id
            }).then(result => {
                result && Toast(result)
            })
        }
    }
    
}
</script>


<style lang="stylus" scoped>

    .user-info-warp
        width 100%        
        button 
            width 90%
            background red
            margin 10px auto 
            display block
            border none 
            height 40px 
            line-height 40px
            border-radius 5px
            font-size 14px 
            color #ffffff
        .user-info-title
            line-height 50px
            height 50px
            text-indent 10px
            color #333
            font-size 16px
        .user-info-content
            width 100%
            background #ffffff
            .user-info-item
                border-bottom 1px solid #f5f5f5
                display flex
                padding 15px 10px
                justify-content center
                align-items center
                img 
                    border-radius 50%
                    width 15%                    
                span
                    font-size 14px
                    color #666
                    &:first-child
                        flex 1

</style>

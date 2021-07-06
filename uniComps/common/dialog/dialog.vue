<template>
    <uni-popup ref="dialogPop" type="center" @change="popUpChange">
        <view class="dialogcontainer">
            <view class="dialogheader" v-if="config.title != ''">{{config.title}}</view>
            <view class="dialogcontent" :style="{'text-align': config.textalign}">
                <view v-if="config.content != ''" class="modal-content" v-html="config.content"></view>
            </view>
            <view class="dialogfooter">
                <view v-if="config.isShowCancel" class="dialogbtn dialogfooter-cancel" :style="{ color: config.cancelColor }" @click="clickCancel">{{config.cancelText}}</view>
                <view v-if="config.isShowConfirm" class="dialogbtn dialogfooter-confirm" :style="{ color: config.confirmColor }" @click="clickConfirm">{{config.confirmText}}</view>
            </view>
        </view>
    </uni-popup>
</template>

<script>
    import {
        uniPopup
    } from '@dcloudio/uni-ui';
    export default {
        data() {
            return {
                config: {},
            }
        },
        methods: {
            // 取消方法
            clickCancel() {
                this.config.cancel()
                this.$refs.dialogPop.close();
            },
            // 确定方法
            clickConfirm() {
                this.config.confirm()
                this.$refs.dialogPop.close();
            },
            // 关闭弹窗
            closeDialog() {
                this.$refs.dialogPop.close()
            },
            openPopup() {
                this.$refs.dialogPop.open()
            },
            popUpChange(e) {
                this.$checkPopupDom(e, () => {
                    this.$refs.dialogPop.close();
                });
            },
        },
        components: {
            uniPopup
        }
    }
</script>

<style lang="stylus" scoped>
        .dialogcontainer
            flex-shrink 0
            width 330px
            border-radius 10px
            background-color #fff
            opacity 1
            transition opacity 200ms ease-in
        .dialogheader 
            position relative
            overflow auto
            text-overflow ellipsis
            white-space nowrap
            line-height 1.5
            color #303133
            font-weight bold
            font-size 18px
            text-align center
            height 40px
            display flex
            justify-content center
            align-items center
        .dialogcontent 
            position relative
            color #333
            box-sizing border-box
            // padding-bottom 25px
            min-height 110px
            display flex
            justify-content center
            align-items center
            border-bottom 1px solid #f0f0f0
            font-size 15px
            .modal-content 
                padding 0 25px 15px
                font-size 15px
                line-height 1.5em
                color #333
                width 100%
        .dialogfooter
            width 100%
            font-size 18px
            display flex
            .dialogbtn 
                flex 1
                height 60px
                display flex
                justify-content center
                align-items center
                &.dialogfooter-cancel 
                    border-right 1px solid #f0f0f0
        .dialogmask 
            display block
            position absolute
            z-index 1000
            top 0
            left 0
            right 0
            bottom 0
            width 100%
            height 100%
            background rgba(0, 0, 0, 0.5)
            transition opacity 200ms ease-in
</style>
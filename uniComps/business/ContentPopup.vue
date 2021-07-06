<template>
    <uni-popup ref="popup" type="center" :maskClick='false' :animation='true'>
        <view class="content">
            <img src="../images/icon_close.png" class="icon-close" @click="$refs.popup.close()" alt="" />
            <view class="title">{{title}}</view>
            <slot/>
        </view>
    </uni-popup>
</template>

<script>
    import {
        uniPopup
    } from '@dcloudio/uni-ui';
    export default {
        name: "content-popup",
        components: {
            uniPopup
        },
        props: {
            title: {
                type: String,
                default: ''
            }
        },
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style scoped lang="stylus">
    .content
        width 345px
        background-color #fff
        border-radius 10px
        position relative
        img
            width 34px
            height 34px
            position absolute
            bottom -60px
            left 50%
            transform translateX(-50%)
        .title
            padding-top 20px
            margin-bottom 18px
            text-align center
            font-size 17px
            color #333
            font-weight bold
</style>
<template>
    <view class="fixedBtn">
        <slot></slot>
        <view class="btn" :style="color" @click="$emit('next')">{{btnText}}</view>
    </view>
</template>

<script>
    export default {
        name: 'FixedBtn',
        props: {
            btnText: {
                type: String,
                default: ''
            },
            color: {
                type: Object,
                default: function() {
                    return {
                        background: 'linear-gradient(90deg,rgba(247,114,70,1) 0%,rgba(243,91,54,1) 100%)'
                    }
                }
            }
        }
    }
</script>

<style scoped lang="stylus">
    .fixedBtn
        width 100%
        height 49px
        background-color #fff
        position fixed
        left 0
        bottom 0
        display flex
        z-index 5
        border-top 1px solid #f0f0f0
        .btn
            height 100%
            flex 1
            display flex
            justify-content center
            align-items center
            font-size 15px
            color #fff
            background linear-gradient(90deg,rgba(247,114,70,1) 0%,rgba(243,91,54,1) 100%)
</style>
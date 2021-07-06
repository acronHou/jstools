<template>
    <uni-popup ref="actionSheet" type="bottom" @change="popUpChange">
        <scroll-view scroll-y="true" class="action-sheet uni-popup-fixed-bottom">
            <view @click="choosed(v)" class="list" v-for="(v, i) in config.dataList" :key="i">{{v.text}}</view>
        </scroll-view>
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
            choosed(val) {
                this.config.choiceFn(val)
                this.$refs.actionSheet.close();
            },
            popUpChange(e) {
                this.$checkPopupDom(e, () => {
                    this.$refs.actionSheet.close();
                });
            },
            openPopup() {
                this.$refs.actionSheet.open()
            },
        },
        components: {
            uniPopup
        }
    }
</script>
<style lang='stylus' scoped>
    .action-sheet
        width 100%
        max-height 375px
        background-color #fff
        overflow hidden
        .list
            width 100%
            height 58px
            border-bottom 1px solid #f0f0f0
            display flex
            justify-content center
            align-items center
            color #464646
            font-size 15px
</style>
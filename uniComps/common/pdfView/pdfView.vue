<template>
    <uni-popup ref="popup" type="center" @change="popUpChange">
        <view class="model">
            <scroll-view scroll-y="true" class="pdfSection">
                <pdf v-for="i in numPages" :key="i" :src="src" :page="i" id="pdf"></pdf>
            </scroll-view>
            <view class="line-s"></view>
            <view class="btn" @click="popupClose">关闭</view>
        </view>
    </uni-popup>
</template>
<script>
    import {uniPopup} from '@dcloudio/uni-ui';
    import pdf from 'vue-pdf';
    export default {
        data() {
            return {
                pdfViewUrl: '',
                numPages: null,
                src: ''
            }
        },
        components: {uniPopup, pdf},
        methods: {
            initPdf() {
                this.src = pdf.createLoadingTask(this.pdfViewUrl);
                this.src.promise.then(pdf => {
                    this.numPages = pdf.numPages;
                });
                this.$refs.popup.open();
            },
            popupClose() {
                this.$refs.popup.close();
                document.body.style.overflow = 'auto';
            },
            popUpChange(e) {
                this.$checkPopupDom(e, () => {
                    this.$refs.popup.close();
                });
            }
        }
    }
</script>
<style lang='stylus' scoped>
    //模态框
    .model
        background-color: #fff;
        width 340px
        margin 0 auto
        .pdfSection
            width 100%
            height 550px
            display flex
            flex-direction column
            overflow-y auto
            #pdf
                width 100%
                flex 1
        .line-s
            width 100%
            height 1px
            background-color #f0f0f0
        .btn
            width 100%
            height 49px
            font-size 18px
            color #f35b36
            display flex
            justify-content center
            align-items center
</style>
<template>
    <uni-popup ref="popup" type="bottom" @change="popChange">
        <view class="content uni-popup-fixed-bottom">
            <view class="action">
                <view class="cancel" @click="$refs.popup.close()">取消</view>
                <view class="choosed" @click="choosed">选择</view>
            </view>
            <picker-view class="mpvue-picker-view" :indicator-style="indicatorStyle" :value="val" @change="changeFn">
                <picker-view-column>
                    <view class="item" :style="indicatorStyle" v-for="(item,index) in yearData" :key="index">{{item}}年</view>
                </picker-view-column>
                <picker-view-column>
                    <view class="item" :style="indicatorStyle" v-for="(item,index) in monthData" :key="index">{{item}}月</view>
                </picker-view-column>
                <picker-view-column>
                    <view class="item" :style="indicatorStyle" v-for="(item,index) in dayData" :key="index">{{item}}日</view>
                </picker-view-column>
            </picker-view>
        </view>
    </uni-popup>
</template>

<script>
    import {
        uniPopup
    } from "@dcloudio/uni-ui"
    export default {
        components: {
            uniPopup
        },
        data() {
            return {
                indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px`,
                startData: {
                    year: 0,
                    month: 0,
                    day: 0,
                },
                endData: {
                    year: 0,
                    month: 0,
                    day: 0,
                },
                defaultData: {
                    year: 0,
                    month: 0,
                    day: 0,
                },
                yearData: [],
                monthData: [],
                dayData: [],
                val: [0, 0, 0],
                y: '',
                m: '',
                d: '',
                startTime:'',
                endTime:'',
                defaultTime:'',
                config:{},
            }
        },
        methods: {
            openPopup(){
                this.$refs.popup.open()
                this.startTime = this.config.startTime
                this.endTime = this.config.endTime
                this.defaultTime = this.config.defaultTime
            },
            popChange(e) {
                this.$checkPopupDom(e, () => {
                    this.$refs.popup.close();
                });
                if (e.show) {
                    let timer = setTimeout(() => {
                        this.yearData.length = 0;
                        this.monthData.length = 0;
                        this.dayData.length = 0;
                        this.getNumber(this.startTime, 'startData');
                        this.getNumber(this.endTime, 'endData');
                        this.getNumber(this.defaultTime || this.startTime, 'defaultData');
                        for (let i = this.startData.year; i <= this.endData.year; i++) {
                            this.yearData.push(i);
                        }
                        let monthLen, monthStart;
                        let dayLen, dayStart;
                        if ((this.defaultTime || this.startTime) == this.startTime) {
                            monthLen = 12;
                            monthStart = this.startData.month;
                            dayStart = this.startData.day;
                            dayLen = this.getDayLen(this.defaultData.year, this.defaultData.month);
                        } else if ((this.defaultTime || this.startTime) == this.endTime) {
                            monthStart = 1;
                            monthLen = this.endData.month;
                            dayStart = 1;
                            dayLen = this.endData.day;
                        } else if (this.defaultData.year === this.startData.year) {
                            monthLen = 12 - this.startData.month + 1;
                            monthStart = this.startData.month;
                            dayStart = 1;
                            dayLen = this.getDayLen(this.defaultData.year, this.defaultData.month);
                        } else if (this.defaultData.year === this.endData.year) {
                            monthLen = this.endData.month;
                            monthStart = 1;
                            dayStart = 1;
                            dayLen = this.getDayLen(this.defaultData.year, this.defaultData.month);
                        } else {
                            monthStart = 1;
                            monthLen = 12;
                            dayStart = 1;
                            dayLen = this.getDayLen(this.defaultData.year, this.defaultData.month);
                        }
                        for (let i = monthStart; i <= monthLen; i++) {
                            this.monthData.push(i);
                        }
                        for (let i = dayStart; i <= dayLen; i++) {
                            this.dayData.push(i);
                        }
                        this.$set(this.val, 0, this.yearData.indexOf(this.defaultData.year));
                        this.$set(this.val, 1, this.monthData.indexOf(this.defaultData.month));
                        this.$set(this.val, 2, this.dayData.indexOf(this.defaultData.day));
                        this.y = this.defaultData.year;
                        this.m = this.defaultData.month;
                        this.d = this.defaultData.day;
                        clearTimeout(timer);
                    }, 0);
                }
            },
            choosed() {
                let m = (+this.m) > 9 ? this.m : '0' + this.m;
                let d = (+this.d) > 9 ? this.d : '0' + this.d;
                let str = this.y + '-' + m + '-' + d;
                this.config.getBirthday(str);
                this.$refs.popup.close();
            },
            getNumber(date, type) {
                let arr = date.split('-');
                this[type].year = +arr[0];
                this[type].month = (+arr[1]) - 1 + 1;
                this[type].day = (+arr[2]) - 1 + 1;
            },
            getDayLen(y, m) {
                let longArr = [1, 3, 5, 7, 8, 10, 12];
                let normalArr = [4, 6, 9, 11];
                if (longArr.indexOf(m) != -1) {
                    return 31
                } else if (normalArr.indexOf(m) != -1) {
                    return 30
                } else if (m == 2) {
                    if ((y % 4 == 0 && y % 100 != 0) || (y % 400 == 0)) { //闰年
                        return 29
                    } else { //平年
                        return 28
                    }
                }
            },
            changeFn: function(e) {
                let yChange = false;
                let mChange = false;
                let dChange = false;
                const val = e.detail.value;
                let y = this.yearData[val[0]];
                let m = this.monthData[val[1]];
                let d = this.dayData[val[2]];
                if (this.y != y) yChange = true;
                if (this.m != m) mChange = true;
                if (this.d != d) dChange = true;
                this.y = y;
                this.m = m;
                this.d = d;
                y = +y;
                m = +m;
                d = +d;
                if (yChange) {
                    let monthLen, monthStart;
                    let dayLen, dayStart;
                    if (y == this.startData.year) {
                        monthLen = 12;
                        monthStart = this.startData.month;
                        this.monthData.length = 0;
                        for (let i = monthStart; i <= monthLen; i++) {
                            this.monthData.push(i);
                        }
                        let index = (this.monthData.indexOf(m) == -1) ? 0 : this.monthData.indexOf(m);
                        this.$set(this.val, 0, 0);
                        this.$set(this.val, 1, index);
                        if ((m == this.startData.month) || (this.monthData.indexOf(m) == -1)) {
                            dayLen = this.getDayLen(y, m);
                            dayStart = this.startData.day;
                            this.dayData.length = 0;
                            for (let i = dayStart; i <= dayLen; i++) {
                                this.dayData.push(i);
                            }
                            let index = (this.dayData.indexOf(d) == -1) ? 0 : this.dayData.indexOf(d);
                            this.$set(this.val, 2, index);
                        }
                    } else if (y == this.endData.year) {
                        monthLen = this.endData.month;
                        monthStart = 1;
                        this.monthData.length = 0;
                        for (let i = monthStart; i <= monthLen; i++) {
                            this.monthData.push(i);
                        }
                        let index = (this.monthData.indexOf(m) == -1) ? (this.monthData.length - 1) : this.monthData.indexOf(m);
                        this.$set(this.val, 0, this.yearData.indexOf(y));
                        this.$set(this.val, 1, index);
                        if ((m == this.endData.month) || (this.monthData.indexOf(m) == -1)) {
                            dayLen = this.endData.day;
                            dayStart = 1;
                            this.dayData.length = 0;
                            for (let i = dayStart; i <= dayLen; i++) {
                                this.dayData.push(i);
                            }
                            let index = (this.dayData.indexOf(d) == -1) ? (this.dayData.length - 1) : this.dayData.indexOf(d);
                            this.$set(this.val, 2, index);
                        }
                    } else {
                        this.$set(this.val, 0, this.yearData.indexOf(y));
                        if (this.monthData.length != 12) {
                            monthLen = 12;
                            monthStart = 1;
                            this.monthData.length = 0;
                            for (let i = monthStart; i <= monthLen; i++) {
                                this.monthData.push(i);
                            }
                            this.$set(this.val, [1], this.monthData.indexOf(m));
                        }
                        dayLen = this.getDayLen(y, m);
                        dayStart = 1;
                        this.dayData.length = 0;
                        for (let i = dayStart; i <= dayLen; i++) {
                            this.dayData.push(i);
                        }
                        this.$set(this.val, [2], this.dayData.indexOf(d));
                    }
                }
                if (mChange) {
                    this.$set(this.val, 1, this.monthData.indexOf(m));
                    let dayLen, dayStart;
                    if (y == this.startData.year && m == this.startData.month) {
                        dayLen = this.getDayLen(y, m);
                        dayStart = this.startData.day;
                        this.dayData.length = 0;
                        for (let i = dayStart; i <= dayLen; i++) {
                            this.dayData.push(i);
                        }
                        let index = (this.dayData.indexOf(d) == -1) ? 0 : this.dayData.indexOf(d);
                        this.$set(this.val, 2, index);
                    } else if (y == this.endData.year && m == this.endData.month) {
                        dayLen = this.endData.day;
                        dayStart = 1;
                        this.dayData.length = 0;
                        for (let i = dayStart; i <= dayLen; i++) {
                            this.dayData.push(i);
                        }
                        let index = (this.dayData.indexOf(d) == -1) ? (this.dayData.length - 1) : this.dayData.indexOf(d);
                        this.$set(this.val, 2, index);
                    } else {
                        dayLen = this.getDayLen(y, m);
                        dayStart = 1;
                        this.dayData.length = 0;
                        for (let i = dayStart; i <= dayLen; i++) {
                            this.dayData.push(i);
                        }
                        this.$set(this.val, [2], this.dayData.indexOf(d) !== -1 ? this.dayData.indexOf(d) : 0);
                    }
                }
                if (dChange) {
                    this.$set(this.val, [2], this.dayData.indexOf(d));
                }
                this.m = this.monthData[this.val[1]];
                this.d = this.dayData[this.val[2]];
            }
        }
    }
</script>
<style lang='stylus' scoped>
    .content
        width 100%
        height 300px
        display flex
        flex-direction column
        border-top 1px solid #f0f0f0
        background-color #fff
        .action
            width 100%
            height 15%
            display flex
            justify-content space-between
            align-items center
            border-bottom 1px solid #f0f0f0
            .cancel
                fon-size 15px
                color #333
                margin-left 15px
            .choosed
                fon-size 15px
                color #F35B36
                margin-right 15px
        .mpvue-picker-view
            width 100%
            height 85%
            background-color #ccc
            .item
                display flex
                justify-content center
                align-items center
                width 100%
                text-overflow ellipsis
                white-space nowrap
                font-size 14px
</style>
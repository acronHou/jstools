import Vue from 'vue';
import timePicker from "./timePicker.vue";

window.hasHK_TimePicker = true;
let timePickerDom = null;

export default {
    install: function(Vue) {
        Vue.prototype.hktimePicker = this.timePickerModal;
    },
    timePickerModal: function(props) {
        if ((!props) || Object.prototype.toString.call(props) !== '[object Object]') {
            throw 'hktimePicker参数错误'
        } else {
            if (!props.startTime) throw "startTime为必传项"
            if (!props.endTime) throw "endTime为必传项"
            if (props.startTime.match(/^(\d{4})(-)(\d{2})(-)(\d{2})$/) == null) throw "开始时间传入的格式为xxxx-xx-xx"
            if (props.endTime.match(/^(\d{4})(-)(\d{2})(-)(\d{2})$/) == null) throw "结束时间传入的格式为xxxx-xx-xx"
            if (props.defaultTime && props.defaultTime.match(/^(\d{4})(-)(\d{2})(-)(\d{2})$/) == null) throw "默认时间传入的格式为xxxx-xx-xx"
            if (props.getBirthday && typeof(props.getBirthday) !== 'function') throw "传入的getBirthday回调函数必须是函数"
        }
        if (!timePickerDom) {
            let timePickerConstructor = Vue.extend(timePicker);
            timePickerDom = new timePickerConstructor({
                el: document.createElement('div')
            });
        }
        if (window.hasHK_TimePicker) {
            window.hasHK_TimePicker = false;
            document.body.appendChild(timePickerDom.$el);
        }
        let config = {
            startTime : props.startTime?props.startTime:'',
            endTime : props.endTime?props.endTime:'',
            defaultTime : props.defaultTime?props.defaultTime:'',
            getBirthday : props.getBirthday?props.getBirthday:function(val){}
        }
        timePickerDom.config = config;
        timePickerDom.openPopup();
    }
}
import Vue from 'vue';
import birthdayPicker from "./BirthdayPicker";

let birthdayPickerConstructor = Vue.extend(birthdayPicker);
window.birthdayPicker = true//一个页面只能有一个弹窗

var birthdayPickerDom = null;
export default {
    install: function (Vue) {
        Vue.prototype.hkBirthdayPicker = this.birthdayPickerModal;
    },
    birthdayPickerModal: (props) => {
        if (!birthdayPickerDom) {
            birthdayPickerDom = new birthdayPickerConstructor({
                el: document.createElement('div') //将组件挂载到新创建的div上
            })
        }
        if (window.birthdayPicker) {
            window.birthdayPicker = false
            document.body.appendChild(birthdayPickerDom.$el); //把组件的dom添加到body里
        }
        birthdayPickerDom.config = props?props:config
        birthdayPickerDom.openPopup()
    },
}
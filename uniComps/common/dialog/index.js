import Vue from 'vue';
import dialog from './dialog';

window.hasHK_Dialog = true;
let dialogDom = null;

export default {
    install: function(Vue) {
        Vue.prototype.hkdialog = this.dialogModal;
    },
    dialogModal: function(props) {
        if ((!props) || Object.prototype.toString.call(props) !== '[object Object]') {
            throw 'hkdialog参数错误'
        } else {
            if (props.content && typeof (props.content) !== 'string') throw "content格式错误，应为string类型"
            if (props.title && typeof (props.title) !== 'string') throw "title格式错误，应为string类型"
            if (props.textalign && typeof (props.textalign) !== 'string') throw "textalign格式错误，应为string类型"
            if (props.cancelText && typeof (props.cancelText) !== 'string') throw "cancelText格式错误，应为string类型"
            if (props.cancelColor && typeof (props.cancelColor) !== 'string') throw "cancelColor格式错误，应为string类型"
            if (props.confirmText && typeof (props.confirmText) !== 'string') throw "confirmText格式错误，应为string类型"
            if (props.confirmColor && typeof (props.confirmColor) !== 'string') throw "confirmColor格式错误，应为string类型"
            if (props.isShowCancel && typeof (props.isShowCancel) !== 'boolean') throw "isShowCancel格式错误，应为布尔类型"
            if (props.isShowConfirm && typeof (props.isShowConfirm) !== 'boolean') throw "isShowConfirm格式错误，应为布尔类型"
            if (props.autoClosed && typeof (props.autoClosed) !== 'boolean') throw "autoClosed格式错误，应为布尔类型"
            if (props.cancel && typeof (props.cancel) !== 'function') throw "传入的cancel回调函数必须是函数"
            if (props.confirm && typeof (props.confirm) !== 'function') throw "传入的confirm回调函数必须是函数"
        }
        if (!dialogDom) {
            let dialogConstructor = Vue.extend(dialog);
            dialogDom = new dialogConstructor({
                el: document.createElement('div')
            });
        }
        if (window.hasHK_Dialog) {
            window.hasHK_Dialog = false;
            document.body.appendChild(dialogDom.$el);
        }
        let config = {
            title: props.title ? props.title : '',
            content: props.content ? props.content : '',
            textalign: props.textalign ? props.textalign : 'center',
            cancelText: props.cancelText ? props.cancelText : '取消',
            cancelColor: props.cancelColor ? props.cancelColor : '',
            confirmText: props.confirmText ? props.confirmText : '确认',
            confirmColor: props.confirmColor ? props.confirmColor : '',
            isShowCancel: (props.isShowCancel !== undefined && props.isShowCancel !== '') ? props.isShowCancel : true,
            isShowConfirm: (props.isShowConfirm !== undefined && props.isShowConfirm !== '') ? props.isShowConfirm : true,
            autoClosed: (props.autoClosed !== undefined && props.autoClosed !== '') ? props.autoClosed : true,
            cancel: props.cancel ? props.cancel : function() {},
            confirm: props.confirm ? props.confirm : function() {}
        }
        dialogDom.config = config;
        dialogDom.openPopup();
    }
}
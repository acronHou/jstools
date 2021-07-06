import Vue from 'vue';
import actionSheet from './actionSheet';

window.hasHK_ActionSheet = true;
let actionSheetDom = null;

export default {
    install: function(Vue) {
        Vue.prototype.hkActionSheet = this.actionSheetModal;
    },
    actionSheetModal: function(props) {
        let config = {
            dataList: [],
            choiceFn: function(res) {}
        };
        if ((!props) || Object.prototype.toString.call(props) !== '[object Object]') {
            throw 'hkactionsheet参数错误'
        } else {
            if (props.dataList) {
                if (Array.isArray(props.dataList)) {
                    config.dataList = props.dataList;
                } else {
                    throw 'hkactionsheet数据不是一个数组'
                }
            }
            if (props.choiceFn) {
                if (typeof props.choiceFn === 'function') {
                    config.choiceFn = props.choiceFn;
                } else {
                    throw 'hkactionsheet回调不是一个函数'
                }
            }
        }
        if (!actionSheetDom) {
            let actionSheetConstructor = Vue.extend(actionSheet);
            actionSheetDom = new actionSheetConstructor({
                el: document.createElement('div')
            });
        }
        if (window.hasHK_ActionSheet) {
            window.hasHK_ActionSheet = false;
            document.body.appendChild(actionSheetDom.$el);
        }
        actionSheetDom.config = config;
        actionSheetDom.openPopup();
    }
}
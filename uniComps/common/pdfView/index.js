import Vue from 'vue';
import pdfView from "./pdfView";

window.has_HKPdfView = true;
let pdfViewDom = null;

export default {
    install: function (Vue) {
        Vue.prototype.hkPdfView = this.pdfViewModal;
    },
    pdfViewModal: function (props) {
        if ((!props) || Object.prototype.toString.call(props) !== '[object Object]') {
            throw 'hkpdfView参数错误'
        } else {
            if (!props.url) throw "url不能为空"
            if (typeof (props.url) !== 'string') throw "url格式错误，应为string类型"
            if (props.url instanceof File) throw "url格式错误，应为string类型"
        }
        if (!pdfViewDom) {
            let pdfViewConstructor = Vue.extend(pdfView);
            pdfViewDom = new pdfViewConstructor({
                el: document.createElement('div')
            });
        }
        if (window.has_HKPdfView) {
            window.has_HKPdfView = false;
            document.body.appendChild(pdfViewDom.$el);
        }
        pdfViewDom.pdfViewUrl = props.url;
        pdfViewDom.initPdf();
    }
}
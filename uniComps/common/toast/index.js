import Vue from 'vue';

export default {
    install: function (Vue) {
        Vue.prototype.hktoast = this.toastModal;
    },
    toastModal: (props) => {
        let config = {
            str: '',
            duration: 2500,
            success: function(){}
        }
        if(typeof(props)==='string'){
            config.str = props?props:''
        }else if(typeof(props)==='object'){
            config = props?props:config
        }
        setTimeout(() => {
            uni.showToast({
                title: config.str,
                icon: 'none',
                duration: config.duration,
                success: config.success
            });
        }, 10)
    },
}  
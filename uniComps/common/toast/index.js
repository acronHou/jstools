var toast = {
    install: function(Vue) {
        Vue.prototype.hktoast = this.toastModal;
    },
    toastModal: function(props) {
        var config = {
            str: '',
            duration: 2500,
            success: function() {}
        };
        if (!props) {
            config.str = props === '' ? props : String(props);
            console.warn('hktoast入参异常');
        } else {
            if (typeof props === 'string') {
                config.str = props;
            } else {
                if (Object.prototype.toString.call(props) === '[object Object]') {
                    config.str = props.str && (typeof props.str === 'string') ? props.str : config.str;
                    config.duration = props.duration && (typeof props.duration === 'number') ? props.duration : config.duration;
                    config.success = props.success && (typeof props.success === 'function') ? props.success : config.success;
                } else {
                    config.str = String(props);
                    console.warn('hktoast入参异常');
                }
            }
        }
        setTimeout(function() {
            uni.showToast({
                title: config.str,
                icon: 'none',
                duration: config.duration,
                success: config.success
            });
        }, 10);
    }
}

module.exports = toast
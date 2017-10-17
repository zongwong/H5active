// 弹框
var modal = function (){

    function Alert(cfg){
        var defaultcfg = {};
        this.cfg = $.extend({},defaultcfg,cfg);
        this.el = $(this.cfg.el)
        this.close = $(this.cfg.closeClass);
        this.btnBox = $(this.cfg.btnBoxClass);
    }

    Alert.prototype = {
        init:function(){
            this.el.hide();
            this.btn_event();
            this.close_event(this.cfg.endClose);
            return this;
        },
        show:function(cb){
            this.el.show();
            cb && cb();
        },
        hide:function(cb){
            this.el.hide();
            cb && cb();
        },
        btn_event:function(){
            var that = this;
            var items = this.btnBox.children();
            items.each(function(index,item){
                var eventcfg = that.cfg.btnEvent[index];
                for(var key in eventcfg){
                    $(this).on(key,eventcfg[key])
                }
            })
            
        },
        close_event:function(cb){
            var that = this;
            this.close.on('click',function(){
                that.hide();
                cb && cb();
            })
        }
    }

    var init = function(cfg){
        return new Alert(cfg).init();
    }

    return {init:init};
}();
// 滚动
var scrollList = function (){

    function ScrollList(cfg){
        var defaultcfg = {};
        this.cfg = $.extend({},defaultcfg,cfg);
        this.wrap = $(this.cfg.wrap)
        this.powrap = $(this.cfg.powrap);
        this.item = $(this.cfg.item);
        this.timer = null;
    }

    ScrollList.prototype = {
        init:function(){
            this.run();
            this.event();
            return this;
        },
        run:function(){
            var that = this;
            var length = this.powrap.children().length;
            if (length<3) {
                return false;
            }
            var itemHeight = this.item.outerHeight();
            var i = 0;
            this.timer = setInterval(function(){


    // that.powrap[0].style['transform'] = 'translate3d(0,-'+(itemHeight+2)+'px,0)';
    // that.powrap[0].style['transition'] = 'all 1s';

                that.powrap.animate({
                    top:-itemHeight
                },'ease',function(){
                    that.powrap.css({
                        top:0
                    })
                    var clone = that.item.first().clone();
                    that.item.first().remove();
                    that.powrap.append(clone);
                    that.item = $(that.cfg.item);
                })
                
            },that.cfg.timeout)
        },
        event:function(){
            var that = this;
            this.wrap.on('touchstart',function(){
                that.clear();
            })
            this.wrap.on('touchend',function(){
                that.run();
            })
        },
        clear:function(){
            clearInterval(this.timer);
        }

    }

    var init = function(cfg){
        return new ScrollList(cfg).init();
    }

    return {init:init};
}();
//user
var game = {
    start:function(){

    },
    check:function(){

    },
    getResult:function(url,callback){
        $.ajax({
            url:url,
            method:'post',
            data:{},
            success:function(res){
                callback(res);
                
            },
            error:function(){

            }
        })
    },
    //次数减一
    reCount:function(el){
        var now = parseInt($(el).text());
        now -=1;
        now = now<0?0:now;
        $(el).text(now);
    }

}
//微信
wx.config({
    debug: true,
    timestamp: '', 
    nonceStr: '', 
    signature: '',
    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] 
});
wx.ready(function(){
    wx.onMenuShareTimeline({
        title: '', // 分享标题
        link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: '', // 分享图标
        success: function () { 
            
        },
        cancel: function () { 
            
        }
    });
    wx.onMenuShareAppMessage({
        title: '', // 分享标题
        desc: '', // 分享描述
        link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: '', // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () { 
            
        },
        cancel: function () { 
            
        }
    });
});
wx.error(function(res){
  
});
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
            this.close_event();
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
        close_event:function(){
            var that = this;
            this.close.on('click',function(){
                that.hide();
            })
        }
    }

    var init = function(cfg){
        return new Alert(cfg).init();
    }

    return {init:init};


}();

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

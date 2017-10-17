(function() {
    var $,
        ele,
        container,
        canvas,
        num,
        prizes,
        btn,
        deg = 0,
        fnGetPrize,
        fnGotBack,
        optsPrize;
    var cssPrefix,
        eventPrefix,
        vendors = {
            '': '',
            Webkit: 'webkit',
            Moz: '',
            O: 'o',
            ms: 'ms'
        },
        testEle = document.createElement('p'),
        cssSupport = {};
    // 嗅探特性
    Object.keys(vendors).some(function(vendor) {
        if (testEle.style[vendor + (vendor ? 'T' : 't') + 'ransitionProperty'] !== undefined) {
            cssPrefix = vendor ? '-' + vendor.toLowerCase() + '-' : '';
            eventPrefix = vendors[vendor];
            return true;
        }
    });

    function normalizeEvent(name) {
        return eventPrefix ? eventPrefix + name : name.toLowerCase();
    }

    function normalizeCss(name) {
        name = name.toLowerCase();
        return cssPrefix ? cssPrefix + name : name;
    }

    cssSupport = {
        cssPrefix: cssPrefix,
        transform: normalizeCss('Transform'),
        transitionEnd: normalizeEvent('TransitionEnd')
    }

    var transform = cssSupport.transform;
    var transitionEnd = cssSupport.transitionEnd;


    function init(opts) {
        fnGetPrize = opts.getPrize;
        fnGotBack = opts.gotBack;
        opts.config(function(data) {
            prizes = opts.prizes = data;
            num = prizes.length;
            draw(opts);
        });
        events();
    }

    $ = function(id) {
        return document.getElementById(id);
    };

    /**
     * [绘制转盘]
     * @param  {String} id
     * @param  {Number} 奖品份数
     */
    function draw(opts) {
        opts = opts || {};
        if (!opts.id || num >>> 0 === 0) return;

        var id = opts.id,
            rotateDeg = 360 / num / 2 + 90, // 扇形回转角度
            ctx,
            prizeItems = document.createElement('ul'), // 奖项容器
            turnNum = 1 / num, // 文字旋转 turn 值
            html = []; // 奖项

        ele = $(id);
        canvas = ele.querySelector('.gb-turntable-canvas');
        canvas.style.display = 'none';
        container = ele.querySelector('.gb-turntable-container');
        btn = ele.querySelector('.gb-turntable-btn');
        var canvasWidth = jQuery('#turntable').width();

        canvas.setAttribute('width', canvasWidth);
        canvas.setAttribute('height', canvasWidth);


        if (!canvas.getContext) {
            showMsg('抱歉！浏览器不支持。');
            return;
        }
        // 获取绘图上下文
        ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < num; i++) {
            ctx.save();
            ctx.beginPath();
            ctx.translate(canvas.width / 2, canvas.width / 2);
            ctx.moveTo(0, 0);
            ctx.rotate((360 / num * i - rotateDeg) * Math.PI / 180);
            ctx.arc(0, 0, canvas.width / 2, 0, 2 * Math.PI / num, false);
            if (i % 2 == 0) {
                ctx.fillStyle = '#FF8584';
            } else {
                ctx.fillStyle = '#FED078';
            }
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#ff0036';
            ctx.stroke();
            ctx.restore();
            // 奖项列表
            html.push('<li class="gb-turntable-item"> <span style="' + transform + ': rotate(' + i * turnNum + 'turn)">' + opts.prizes[i] + '</span> </li>');
            if ((i + 1) === num) {
                prizeItems.className = 'gb-turntalbe-list';
                prizeItems.innerHTML = html.join('');
            }
        }
        container.appendChild(prizeItems);
        canvas.style.display = 'block';
    }

    function showMsg(msg) {
        alert(msg);
    }

    function runRotate(deg) {

        container.style[transform] = 'rotate(' + deg + 'deg)';

    }

    /**
     * 抽奖事件
     * @return {[type]} [description]
     */
    function events() {
        bind(btn, 'click', function() {
            addClass(btn, 'disabled');
            fnGetPrize(function(data) {
                optsPrize = {
                    prizeId: data[0],
                    chances: data[1]
                }
                deg = deg || 0;
                deg = deg + (360 - deg % 360) + (360 * 10 - data[0] * (360 / num))
                runRotate(deg);
            });
            // 中奖提示
            bind(container, transitionEnd, eGot);
        });
    }

    function eGot() {
        if (optsPrize.chances) removeClass(btn, 'disabled');
        fnGotBack(prizes[optsPrize.prizeId]);
    }

    function bind(ele, event, fn) {
        if (typeof addEventListener === 'function') {
            ele.addEventListener(event, fn, false);
        } else if (ele.attachEvent) {
            ele.attachEvent('on' + event, fn);
        }
    }

    function hasClass(ele, cls) {
        if (!ele || !cls) return false;
        if (ele.classList) {
            return ele.classList.contains(cls);
        } else {
            return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        }
    }

    // addClass
    function addClass(ele, cls) {
        if (ele.classList) {
            ele.classList.add(cls);
        } else {
            if (!hasClass(ele, cls)) ele.className += '' + cls;
        }
    }

    // removeClass
    function removeClass(ele, cls) {
        if (ele.classList) {
            ele.classList.remove(cls);
        } else {
            ele.className = ele.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    var gbTurntable = {
        init: function(opts) {
            return init(opts);
        },
        destory: function() {
            return destory()
        }
    }
    window.gbTurntable === undefined && (window.gbTurntable = gbTurntable);
    if (typeof define == 'function' && define.amd) {
        define('GB-canvas-turntable', [], function() {
            return gbTurntable;
        });
    }

}());
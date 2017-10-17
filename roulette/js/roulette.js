window.onload = function() {
    var result = modal.init({
        el: '#alert',
        closeClass: '.modal-close',
        btnBoxClass: '.modal-btn',
        btnEvent: [{
            'click': function() {
                alert(1)
            }
        }, {
            'click': function() {
                alert(2)
            }
        }]
    })
    var ruleBox = modal.init({
        el: '#rule',
        closeClass: '.modal-close',
    })
    // 我的奖品
    $('.my_reward').click(function() {
        $('.userreward').show();
    })

    //规则
    $('.gift ').click(function() {
        ruleBox.show();
    })
    //转盘
    drawTurnTable();

    function drawTurnTable() {
        gbTurntable.init({
            id: 'turntable',
            config: function(callback) {
                // 获取奖品信息
                callback && callback(['1元红包32', '2元红包11', '3元红包2', '4元红包', '5元红包1', '6元红包']);
            },
            getPrize: function(callback) {
                // 获取中奖信息
                var num = 0,
                    chances = 1;
                callback && callback([num, chances]);
            },
            gotBack: function(data) {
                result.show();
            }
        });
    }
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    window.addEventListener(resizeEvt, function() {
        drawTurnTable();
    }, false);
    window.addEventListener('orientationchange', function(event) {
        drawTurnTable();
    }, false)
    //中奖名单
    var rewardList = scrollList.init({
        wrap: '.record_list-wrap',
        powrap: '.record_list',
        item: '.record_item',
        timeout: '3000'
    })


    // draw()
    // function draw() {
    //     var prizes =['1元红包32','2元红包11','3元红包2','4元红包','5元红包1','6元红包'];
    //     var html=[];
    //     var num = 6;
    //     var rotateDeg = 360 / num / 2 + 90;
    //     var prizeItems = document.createElement('ul');
    //     var turnNum = 1 / num;
    //     var canvas = document.querySelector('.gb-turntable-canvas');
    //     canvas.style.display = 'none';
    //     var container = $('.gb-turntable-container');
    //     var canvasWidth = jQuery('#turntable').width();

    //     canvas.setAttribute('width', canvasWidth);
    //     canvas.setAttribute('height', canvasWidth);


    //     ctx = canvas.getContext('2d');
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);

    //     for (var i = 0; i < num; i++) {
    //         ctx.save();
    //         ctx.beginPath();
    //         ctx.translate(canvas.width / 2, canvas.width / 2);
    //         ctx.moveTo(0, 0);
    //         ctx.rotate((360 / num * i - rotateDeg) * Math.PI / 180);
    //         ctx.arc(0, 0, canvas.width / 2, 0, 2 * Math.PI / num, false);
    //         if (i % 2 == 0) {
    //             ctx.fillStyle = '#FF8584';
    //         } else {
    //             ctx.fillStyle = '#FED078';
    //         }
    //         ctx.fill();
    //         ctx.lineWidth = 2;
    //         ctx.strokeStyle = '#ff0036';
    //         ctx.stroke();
    //         ctx.restore();
    //         // 奖项列表
    //         html.push('<li class="gb-turntable-item"> <span style="transform: rotate(' + i * turnNum + 'turn)">' + prizes[i] + '</span> </li>');
    //         if ((i + 1) === num) {
    //             prizeItems.className = 'gb-turntalbe-list';
    //             container.append(prizeItems);
    //             prizeItems.innerHTML = html.join('');
    //         }
    //     }
    //     canvas.style.display = 'block';
    // }


}
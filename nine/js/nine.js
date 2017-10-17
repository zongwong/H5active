var result = modal.init({
    el: '#alert',
    closeClass: '.modal-close',
    btnBoxClass: '.modal-btn',
    btnEvent: [{
        'click': function() {
            result.hide();
        }
    }, {
        'click': function() {
            result.hide();
            $('.userreward').show();
        }
    }],
})
var ruleBox = modal.init({
    el: '#rule',
    closeClass: '.modal-close',
})
var lottery = {
    index: -1, //当前转动到哪个位置，起点位置-1
    count: 8, //总共有多少个位置
    timer: 0,
    speed: 20, //初始转动速度
    times: 0, //转动次数
    cycle: 50, //转动基本次数：即至少需要转动多少次再进入抽奖环节
    prize: 0, //中奖位置 0至7
    isRun: false,
    init: function(id) {
        if ($("#" + id).find(".lottery-unit").length > 0) {
            $lottery = $("#" + id);
            $units = $lottery.find(".lottery-unit");
            this.obj = $lottery;
            this.count = $units.length;
            $lottery.find(".lottery-unit-" + this.index).addClass("active");
            lottery.run();
        };
    },
    roll: function() {
        var index = this.index;
        var count = this.count;
        var lottery = this.obj;
        $(lottery).find(".lottery-unit-" + index).removeClass("active");
        index += 1;
        if (index > count - 1) {
            index = 0;
        };
        $(lottery).find(".lottery-unit-" + index).addClass("active");
        this.index = index;
        return false;
    },
    stop: function(index) {
        this.prize = index;
        return false;
    },
    run: function() {
        lottery.times += 1;
        lottery.roll();
        if (lottery.times > lottery.cycle + 10 && lottery.prize == lottery.index) {
            clearTimeout(lottery.timer);
            lottery.prize = -1;
            lottery.times = 0;
            lottery.end && lottery.end();

        } else {

            if (lottery.times < lottery.cycle) { //加速
                lottery.speed -= 10;
            } else if (lottery.times == lottery.cycle) { //抽奖
                
            } else { //减速

                if (lottery.times > lottery.cycle + 10 && ((lottery.prize == 0 && lottery.index == 7) || lottery.prize == lottery.index + 1)) {
                    lottery.speed += 110;
                } else {
                    lottery.speed += 20;
                }
            }

            if (lottery.speed < 40) {
                lottery.speed = 40;
            };
            lottery.timer = setTimeout(lottery.run, lottery.speed);
        }
        return false;
    }
};

$(".game_start").click(function() {
    game.getResult('https://www.easy-mock.com/mock/59e5b90705db1179c65de6fc/game/reward',function(res){
        if (res.code == 200) {
            lottery.prize = res.data.index;
            $('.congratulation').text('恭喜你获得'+res.data.reward);
            $('.reward_name').text(res.data.text);
        }


    })
    // check
    if (lottery.isRun) {
        return false;
    } else {
        lottery.speed = 100;
        lottery.init('lottery');
        lottery.isRun = true;
        return false;
    }
});
lottery.end = function() {
    lottery.isRun = false;
    result.show();
    game.reCount('#chanceTime');
}
// 我的奖品
$('.my_reward').click(function() {
    $('.nine').addClass('filter-blur')
    $('.userreward').show(0).css({
        top:0,
    });
})
$('.slideup-btn').click(function() {
    $('.nine').removeClass('filter-blur')
    $('.userreward').css({
        top:'-100%'
    })
})
//规则
$('.gift ').click(function() {
    ruleBox.show();
})
//中奖名单
var rewardList = scrollList.init({
    wrap: '.record_list-wrap',
    powrap: '.record_list',
    item: '.record_item',
    timeout: '3000'
})
var result = modal.init({
    el:'#alert',
    closeClass:'.modal-close',
    btnBoxClass:'.modal-btn',
    btnEvent:[
    {
        'click':function(){
            alert(1)
        }
    },{
        'click':function(){
            alert(2)
        }
    }]
})
var ruleBox = modal.init({
    el:'#rule',
    closeClass:'.modal-close',
})
var lottery = {
    index: -1, //当前转动到哪个位置，起点位置
    count: 0, //总共有多少个位置
    timer: 0, //setTimeout的ID，用clearTimeout清除
    speed: 20, //初始转动速度
    times: 0, //转动次数
    cycle: 50, //转动基本次数：即至少需要转动多少次再进入抽奖环节
    prize: 2, //中奖位置
    init: function(id) {
        if ($("#" + id).find(".lottery-unit").length > 0) {
            $lottery = $("#" + id);
            $units = $lottery.find(".lottery-unit");
            this.obj = $lottery;
            this.count = $units.length;
            $lottery.find(".lottery-unit-" + this.index).addClass("active");
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
    }
};

function roll() {
    lottery.times += 1;
    lottery.roll(); //转动过程调用的是lottery的roll方法，这里是第一次调用初始化
    if (lottery.times > lottery.cycle + 10 && lottery.prize == lottery.index) {
        clearTimeout(lottery.timer);
        lottery.prize = -1;
        lottery.times = 0;
        click = false;
        result.show();
    } else {

        if (lottery.times < lottery.cycle) { //加速
            lottery.speed -= 10;
        } else if (lottery.times == lottery.cycle) { //抽奖
            var index = Math.random() * (lottery.count) | 0; //中奖物品通过一个随机数生成
            index = 7;
            lottery.prize = index;
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
        console.log(lottery.times + '^^^^^^' + lottery.speed + '^^^^^^^' + lottery.prize);
        lottery.timer = setTimeout(roll, lottery.speed); //循环调用
    }
    return false;
}

var click = false;


lottery.init('lottery');
$(".game_start").click(function() {
    if (click) { //click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
        return false;
    } else {
        lottery.speed = 100;
        roll(); //转圈过程不响应click事件，会将click置为false
        click = true; //一次抽奖完成后，设置click为true，可继续抽奖
        return false;
    }
});

// 我的奖品
$('.my_reward').click(function(){
    $('.userreward').show();
})

//规则
$('.gift ').click(function(){
    ruleBox.show();
})

//中奖名单
var rewardList = scrollList.init({
    wrap:'.record_list-wrap',
    powrap:'.record_list',
    item:'.record_item',
    timeout:'3000'
})
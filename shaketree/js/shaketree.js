var result = modal.init({
    el:'#alert',
    closeClass:'.modal-close',
    btnBoxClass:'.modal-btn',
    btnEvent:[
    {
        'click':function(){
            $('.active-page').removeClass('show');
        }
    },{
        'click':function(){
            $('.active-page').removeClass('show');
        }
    }]
})
var ruleBox = modal.init({
    el:'#rule',
    closeClass:'.modal-close',
})
// 我的奖品
$('.my_reward').click(function(){
    $('.userreward').show();
})

//规则
$('.rule-btn').click(function(){
    ruleBox.show();
})
$('#start-btn').click(function(){
    $('.active-page').addClass('show');
    init();
})

// var oBtn=document.getElementById('btn1');

// oBtn.onclick=function(){
//     var coin=new Coin();    
// }
//摇一摇事件
var SHAKE_THRESHOLD = 400;
var last_update = 0;
var index=0;
var x = y = z = last_x = last_y = last_z = 0;
var w_curTime=0;
function init() {
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', deviceMotionHandler, false);
    } else {
        alert('not support mobile event');
    }
}
function deviceMotionHandler(eventData) {
    var acceleration = eventData.accelerationIncludingGravity;
    var curTime = new Date().getTime();
    if ((curTime - last_update) > 100) { //两次摇的时间间隔
        var diffTime = curTime - last_update;
        last_update = curTime;
        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;
        var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
        var delta=Math.abs(x + y + z - last_x - last_y - last_z);
        if (speed > SHAKE_THRESHOLD) { 
            if((curTime-w_curTime)>2000){   
                w_curTime!=0 && new Coin({density:Math.round(delta)});
                w_curTime=curTime;
                window.removeEventListener('devicemotion', deviceMotionHandler, false);
                result.show();
            } 
        }
        last_x = x;
        last_y = y;
        last_z = z;
    }
}
//中奖名单
var rewardList = scrollList.init({
    wrap:'.record_list-wrap',
    powrap:'.record_list',
    item:'.record_item',
    timeout:'3000'
})
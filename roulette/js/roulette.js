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


// 我的奖品
$('.my_reward').click(function(){
    $('.userreward').show();
})

//规则
$('.gift ').click(function(){
    ruleBox.show();
})
//转盘
gbTurntable.init({
    id: 'turntable',
    config: function(callback){
        // 获取奖品信息
        callback && callback(['1元红包32','2元红包11','3元红包2','4元红包','5元红包1','6元红包']);    
    },
    getPrize: function(callback) {
        // 获取中奖信息
        // var num = Math.random() * 6 >>> 0,   //奖品ID
        //     chances = num;  // 可抽奖次数
            var num =0,
            chances =1;
            callback && callback([num, chances]);   
    },
    gotBack: function(data) {
        result.show('恭喜抽中' + data);
    }
}); 

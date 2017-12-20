var tpl = template($('#template').html());

var $earningsWp = $('#earnings-wp');

var $principle = $('#principle');
var $rate1 = $('#rate1');
var $rate2 = $('#rate2');
var $rate3 = $('#rate3');
var $rate4 = $('#rate4');

function render(data) {
    $earningsWp.html(tpl(data));
}

function calcInterest(principle, rate, time) {
    return Math.floor(principle * Math.pow(1 + rate, time)) - principle;
}
function calc() {
    var principle = parseInt($principle.val(), 10);
    var rate1 = Number($rate1.val());
    var rate2 = Number($rate2.val());
    var rate3 = Number($rate3.val());
    var rate4 = Number($rate4.val());

    localStorage.setItem('yanhaijing.com/mywallet/principle', principle);
    localStorage.setItem('yanhaijing.com/mywallet/rate1', rate1);
    localStorage.setItem('yanhaijing.com/mywallet/rate2', rate2);
    localStorage.setItem('yanhaijing.com/mywallet/rate3', rate3);
    localStorage.setItem('yanhaijing.com/mywallet/rate4', rate4);

    return {
        calcInterest: calcInterest,
        principle: principle,
        avgRate: (rate1 * 40 / 100) + (rate2 * 30 / 100) + (rate3 * 20 / 100) + (rate4 * 10 / 100),
        items: [
            {
                percent: 40,
                rate: rate1
            },
            {
                percent: 30,
                rate: rate2
            },
            {
                percent: 20,
                rate: rate3
            },
            {
                percent: 10,
                rate: rate4
            }
        ]
    }
}

function onChange() {
    render(calc());
}

function init() {
    // 绑定事件
    $principle.on('change', onChange);
    $rate1.on('change', onChange);
    $rate2.on('change', onChange);
    $rate3.on('change', onChange);
    $rate4.on('change', onChange);

    var principle = localStorage.getItem('yanhaijing.com/mywallet/principle');
    var rate1 = localStorage.getItem('yanhaijing.com/mywallet/rate1');
    var rate2 = localStorage.getItem('yanhaijing.com/mywallet/rate2');
    var rate3 = localStorage.getItem('yanhaijing.com/mywallet/rate3');
    var rate4 = localStorage.getItem('yanhaijing.com/mywallet/rate4');

    principle && $('#principle').val(principle);
    rate1 && $('#rate1').val(rate1);
    rate2 && $('#rate2').val(rate2);
    rate3 && $('#rate3').val(rate3);
    rate4 && $('#rate4').val(rate4);

    // 初始化计算
    render(calc());
}

init();

var tpl = template($('#template').html());

var $interestWp = $('#interest-wp');

function render(data) {
    $interestWp.html(tpl(data));
}

function calc(principle, rate, count, days) {
    rate = rate / 100;

    var money = principle / count;

    var temp = principle;
    var list = [];
    var totalInterest = 0;

    while(temp > money) {
        totalInterest = totalInterest + temp * rate;

        list.push({
            money: money,
            interest: temp * rate,
        });

        temp = temp - money;
    }

    return {
        principle,
        totalInterest,
        rate,
        count,
        days,
        list,
    };
}

function init() {
    $('#submit').on('click', function (e) {
        e.preventDefault();

        var principle = +$('#principle').val();
        var rate = +$('#rate').val();
        var count = +$('#count').val();
        var days = +$('#days').val();

        render(calc(principle, rate, count, days));
    })
}

init();

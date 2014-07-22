myApp.controller('lostCtrl', function($scope) {
    var t1 = new Date(2015, 04, 08, 16, 23, 42, 0);
    var t2 = new Date();
    var dif = t1.getTime() - t2.getTime();
    
    var Seconds_from_T1_to_T2 = dif / 1000;
    var Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);
    
    var clock = $('.clock').FlipClock(Seconds_Between_Dates, {
        countdown: true,
        clockFace: 'DailyCounter'
    }); 
});
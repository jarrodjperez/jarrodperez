myApp.service('anchorSmoothScroll', function(){
    this.scrollTo = function(eID) {
        // This scrolling function 
        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
        
        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
        
        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }
        
        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    };
});

myApp.controller('mainCtrl', function($scope, $location, anchorSmoothScroll) {

	$scope.skillTree = [
		{'name': 'frontend', 'value': 85, 'skills': [
			{'skill': 'markup', 'value': 85, 'subSkills' : [
                {'subSkill': 'html', 'value': 96},
                {'subSkill': 'svg', 'value': 83},
                {'subSkill': 'jade', 'value': 78}
            ]},
			{'skill': 'css', 'value': 90, 'subSkills' : [
                {'subSkill': 'css3', 'value': 92},
                {'subSkill': 'sass', 'value': 90},
                {'subSkill': 'less', 'value': 88},
                {'subSkill': 'stylus', 'value': 91}
            ]},
			{'skill': 'javascript', 'value': 80, 'subSkills' : [
                {'subSkill': 'angular', 'value': 82},
                {'subSkill': 'jquery', 'value': 88},
                {'subSkill': 'd3', 'value': 80}
            ]}
		]},
		{'name': 'backend', 'value': 75, 'skills': [
			{'skill': 'languages', 'value': 76, 'subSkills' : [
                {'subSkill': 'nodejs', 'value': 80},
                {'subSkill': 'php', 'value': 78},
                {'subSkill': 'ruby', 'value': 72}
            ]},
			{'skill': 'database', 'value': 65, 'subSkills' : [
                {'subSkill': 'mongo', 'value': 72},
                {'subSkill': 'sql', 'value': 60},
                {'subSkill': 'redis', 'value': 64}
            ]},
			{'skill': 'misc', 'value': 72, 'subSkills' : [
                {'subSkill': 'git', 'value': 86},
                {'subSkill': 'svn', 'value': 82},
                {'subSkill': 'linux', 'value': 80}
            ]}
		]}
	];

	$scope.goTo = function(section) {
        // $location.hash(section);
        anchorSmoothScroll.scrollTo(section);
    };

	$scope.getValue = function () {
		return document.body.scrollTop / (document.body.scrollHeight - document.body.clientHeight) *100;
	};

	$(document).on('scroll', function () {
		$scope.$digest();
	});
});
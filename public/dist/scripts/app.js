// create the module and name it
var myApp = angular.module('myApp', ['ngAnimate']);

myApp.config(function($locationProvider) {
	$locationProvider.html5Mode(true);
});
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
myApp.directive('inViewport', function() {
	return {
		restrict: 'A',
		link: function(scope, elem, attrs) {
			var animation = attrs.animation || '';
			var viewport = $(window);

			var setVisible = function (e) {
	            var viewportTop = viewport.scrollTop(),
	                viewportBottom = viewport.scrollTop() + viewport.height();
	            
                var element = $(elem),
                    top = element.offset().top,
                    bottom = top + element.height(),
                    topOnScreen = top >= viewportTop && top <= viewportBottom,
                    bottomOnScreen = bottom >= viewportTop && bottom <= viewportBottom,
                    elemVisible = topOnScreen; //|| bottomOnScreen;
                
                    if(elemVisible) {
                		element.addClass('animated ' + animation);
                	}
	        };

	        viewport.scroll(setVisible);
	        setVisible();
		}
	}
});
myApp.directive('piechart', function($interval) {
	return {
		restrict: 'E',
		scope: {
			value: '='
		},
		templateUrl: '/directives/piechart/piechart.html',
		link: function(scope, elem, attrs) {
			scope.size = Number(attrs.size);
			scope.label = attrs.label;
			scope.icon = attrs.icon;
			scope.animate = attrs.animate != undefined ? true : false;
			scope.duration = Number(attrs.duration) || 1000;

			var currentValue = scope.animate ? 0 : null;

			scope.pieStyle = function () {
				return {
					height: scope.size + 'px',
					width: scope.size + 'px'
				}
			};

			var runAnimate = function () {

				var deltaT = 1000 / 60;
				var slices = scope.duration / deltaT;
				var deltaValue = scope.value / slices;

				var interval = $interval(function(){	
					if(currentValue < scope.value) {				
						currentValue += deltaValue;
					}else {
						$interval.cancel(interval);
					}
				}, deltaT);	
			};

			if(scope.animate) {
				runAnimate();
			}
			

			scope.setStyle = function(clip, transform) {
				var styleObj = {};
				
				if(clip === 1){
					styleObj.clip = 'rect(0,'+ scope.size/2 + 'px,'+ scope.size +'px, 0)';
				} else {
					styleObj.clip = 'rect(0,'+ scope.size + 'px,'+ scope.size +'px,' +scope.size/2 + 'px)';
				}

				var value = Math.min(100, Math.max(currentValue || scope.value, 0));

				if(transform) {
					if(transform === 1) {
						var value = value > 50 ? 50 : value;
						var degree = 360 * (value / 100);
						
						styleObj.transform = 'rotate(' + degree + 'deg)';
					} else {
						var totalDegrees = 360 * value / 100;
						var leftOverDegree = totalDegrees - 180;

						styleObj.transform = 'rotate(' + leftOverDegree + 'deg)';
					}
				}
				
				return styleObj;
			};
		}
	}
});
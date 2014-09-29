// create the module and name it
var myApp = angular.module('myApp', ['ngAnimate']);

myApp.config(function($locationProvider) {
	$locationProvider.html5Mode(true);
});
myApp.controller('mainCtrl', function($scope) {

});
myApp.directive('piechart', function($window) {
	return {
		restrict: 'E',
		scope: {},
		templateUrl: '/views/templates/piechart.html',
		link: function(scope, elem, attrs) {
			scope.size = Number(attrs.size);
			scope.value = attrs.value;
			scope.label = attrs.label;

			scope.pieStyle = function () {
				return {
					height: scope.size + 'px',
					width: scope.size + 'px'
				}
			};

			scope.sliceStyle = function () {
				return {
					clip: 'rect('+0+'px,'+ scope.size +'px,' + scope.size + 'px,' + scope.size/2 + 'px)'
				}
			};

			scope.innerStyle = function () {
				var degree = 360 - (360 * (scope.value / 100));

				return {
					'-webkit-transform': 'rotate(' + degree + 'deg)',
					'transform': 'rotate(' + degree + 'deg)',
					'clip': 'rect('+0+'px,'+ scope.size/2 +'px,' + scope.size + 'px,'+0+'px)'
				}
			};
		}
	}
});
// create the module and name it
var myApp = angular.module('myApp', ['ngAnimate']);

myApp.config(function($locationProvider) {
	$locationProvider.html5Mode(true);
});
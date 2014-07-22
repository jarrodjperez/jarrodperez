// create the module and name it
var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate']);

// configure our routes
myApp.config(function($routeProvider) {
    $routeProvider

		// route for the home page
		.when('/', {
			templateUrl : 'views/home.html',
			controller  : 'mainCtrl',
			caseInsensitiveMatch: true
		})

		// route for the about page
		.when('/about', {
			templateUrl : 'views/about.html',
			controller  : 'aboutCtrl',
			caseInsensitiveMatch: true
		}) 

		// route for the contact page
		.when('/contact', {
			templateUrl : 'views/contact.html',
			controller  : 'contactCtrl',
			caseInsensitiveMatch: true
		})
});
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
		
		//route for some Lost tv show fun
		.when('/lost', {
		   templateUrl: 'views/lost.html',
		   controller: 'lostCtrl',
		   caseInsensitiveMatch: true
		});
});
myApp.controller('aboutCtrl', function($scope) {
	$scope.message = 'About me!';
});
myApp.controller('contactCtrl', function($scope) {
	$scope.message = 'Contact me!';
});
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
myApp.controller('mainCtrl', function($scope) {
    $scope.links = ["about", "contact"];
    $scope.footerLinks = [
        {name: "linkedin", icon: "fa-linkedin", url: "https://www.linkedin.com/in/jarrodperez"},
        {name: "github", icon: "fa-github", url: "https://github.com/cytoplankton"},
        {name: "facebook", icon: "fa-facebook", url: "https://www.facebook.com/perez.jarrod"},
        {name: "twitter", icon: "fa-twitter", url: "javascript:void(0);"}
    ];
    $scope.message = "I'm a front end developer currently living in southern California.";
    $scope.education = [
        {
            school: 'Full Sail University',
            years: '2006-2008',
            degree: 'B.S. in Computer Science',
            major: 'Digital Arts and Design',
            location: 'Winter Park, FL',
            description: 'Studied digital art and desgin under industry professionals 2 years. In that time, my classes consisted of color theory, the entire Adobe Creative Suite, Flash/ActionScript, typography, HTML/CSS, videography and motion graphics.'
        }    
    ];
    $scope.jobs = [
        {
            company: 'Gaikai, Playstation Now', 
            years: '2012-present',
            title: 'Front End Web Developer',
            location: 'Newport Beach, CA',
            comments: [
                "Helped design and develop the company's internal dashboard that monitored our cloud networks health and statistics.",
                "Developed a client side charting library used in the dashboard using d3, rickshaw.js and angular js.",
                "Developed many widgets and common components that lived in the dashboard using angular js.",
                "Wrote client side tests for the dashboard, widgets and components using jasmine and karma as the test runner."
            ]
        },
        {
            company: 'Markit on Demand', 
            years: '2008-2012',
            title: 'Senior Web Developer',
            location: 'Boulder, CO',
            comments: [
                "Worked closely with both designers and engineers during the development process",
                "Wrote reusable C# libraries in order to help expedite development across all teams",
                "Responsible for any and all maintenance issues including high priority bug fixes.",
                "Lead developer for Financial Times (markets.ft.com, funds.ft.com and lexicon.ft.com), which averages 77 million page visits per month"
            ]
        }
    ];
    
    $scope.allSkills = [
        {name: 'programming', icon: 'fa-keyboard-o', skills: ["javascript", "angularjs", "jquery", "d3", "canvas", "nodejs", "php", "c#", "ruby", "actionscript"]},
        {name: 'markup', icon: 'fa-file-code-o', skills: ["html", "jade", "css", "less", "sass/scss", "stylus", "svg"]},
        {name: 'technical', icon: 'fa-laptop', skills: ["git", "svn", "grunt", "gulp", "karma", "jasmine"]}
    ];

    $scope.select= function(link) {
        $scope.selected = link; 
    };

    $scope.linkClass = function(link) {
        return link === $scope.selected ? 'active' : undefined;
    };
});
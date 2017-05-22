var app = angular.module('App', ['ui.router', 'AuthCtrls', 'PetCtrls', 'ui.bootstrap']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    '$httpProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $urlRouterProvider.otherwise('/404');
        $httpProvider.interceptors.push('AuthInterceptor');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/views/home.html',
                controller: 'HomeCtrl'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'app/views/userSignup.html',
                controller: 'SignupCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'app/views/userLogin.html',
                controller: 'LoginCtrl'
            })
            .state('profile', {
                url: '/profile',
                templateUrl: 'app/views/profile.html',
                controller: 'ProfileCtrl'
            })
            .state('search', {
                url: '/search',
                templateUrl: 'app/views/search.html',
                controller: 'SearchCtrl'
            })
            .state('petShow', {
                url: '/petShow',
                templateUrl: 'app/views/petShow.html',
                controller: 'PetShowCtrl'
            })
            .state('compare', {
                url: '/compare',
                templateUrl: 'app/views/compare.html',
                controller: 'CompareCtrl'
            })
            .state('404', {
                url: '/404',
                templateUrl: 'app/views/404.html'
            });

        $locationProvider.html5Mode(true);
    }
]);

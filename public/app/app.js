var app = angular.module('BBQApp', ['ui.router', 'ui.bootstrap', 'MainCtrls']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/404');
        // $httpProvider.interceptors.push('AuthInterceptor');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'views/home.html'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/userLogin.html',
                controller: 'LoginCtrl'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'views/userSignup.html',
                controller: 'SignupCtrl'
            })
            .state('profile', {
                url: '/profile/:id',
                templateUrl: 'views/profile.html',
                controller: 'ProfileCtrl'
            })
            .state('404', {
                url: '/404',
                templateUrl: 'views/404.html'

            });

        $locationProvider.html5Mode(true);
    }
])
// .config(['$httpProvider', function($httpProvider) {
//     $httpProvider.interceptors.push('AuthInterceptor');
// }]);


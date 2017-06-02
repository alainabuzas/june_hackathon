var app = angular.module('BBQApp', ['ui.router', 'ui.bootstrap', 'MainCtrls']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/404');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/views/home.html'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'app/views/userLogin.html',
                controller: 'LoginCtrl'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'app/views/userSignup.html',
                controller: 'SignupCtrl'
            })
            .state('profile', {
                url: 'profile',
                templateUrl: 'app/views/profile.html',
                controller: 'ProfileCtrl'
            });
        $locationProvider.html5Mode(true);
    }
])

.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
}]);

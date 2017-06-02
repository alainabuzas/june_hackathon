var app = angular.module('BBQApp', ['ui.router', 'ui.bootstrap']);

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/404');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'views/home.html'
            })
            // .state('login', {
            //     url: '/login',
            //     templateUrl: 'views/userLogin.html'/*,
            //     controller: 'LoginCtrl'*/
            // })
            // .state('signup', {
            //     url: '/signup',
            //     templateUrl: 'views/userSignup.html'/*,
            //     controller: 'SignupCtrl'*/
            // })
            // .state('profile', {
            //     url: 'profile',
            //     templateUrl: 'views/profile.html'/*,
            //     controller: 'ProfileCtrl'*/
            // });

        $locationProvider.html5Mode(true);
    }
])

.config(['$httpProvider', function($httpProvider) {
    //$httpProvider.interceptors.push('AuthInterceptor');
}]);

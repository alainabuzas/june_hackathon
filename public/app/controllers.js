angular.module('MainCtrls', ['MainServices'])
    .controller('NavCtrl', ['$scope', '$http', 'Auth', 'Alerts', '$state', function($scope, $http, Auth, Alerts, $state) {
        $scope.Auth = Auth;
        $scope.status = {
            isopen: false
        };

        $scope.logout = function() {
            Alerts.add('danger', 'You logged out');
            Auth.removeToken();
            $state.go('home');
        };

        $scope.toggled = function(open) {};

        $scope.toggleDropdown = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status.isopen = !$scope.status.isopen;
        };
    }])
    .controller('AlertsCtrl', ['$scope', '$http', 'Alerts', function($scope, $http, Alerts) {
        $scope.Alerts = Alerts;
    }])
    .controller('SignupCtrl', ['$scope', '$http', '$location', 'Auth', 'Alerts', function($scope, $http, $location, Auth, Alerts) {
        $scope.user = {
            name: '',
            email: '',
            password: '',
            phone: ''
        };
        $scope.userSignup = function() {
            console.log($scope.user)
            $http.post('/api/users', $scope.user).then(function success(res) {
                    $location.path('/');
                },
                function error(res) {
                    Alerts.add('danger', 'Error. See console');
                    console.log(res);
                });
            $http.post('/api/auth', $scope.user).then(function success(res) {
                Auth.saveToken(res.data);
                Alerts.add('success', 'Signed up & Logged in!');
                console.log('Token:', res.data);
                $location.path('/profile');
            }, function error(res) {
                Alerts.add('danger', 'Incorrect email/password');
                console.log(res);
            });
        }
    }])
    .controller('LoginCtrl', ['$scope', '$http', '$location', 'Auth', 'Alerts', function($scope, $http, $location, Auth, Alerts) {
        $scope.user = {
            email: '',
            password: ''
        };
        $scope.userLogin = function() {
            $http.post('/api/auth', $scope.user).then(function success(res) {
                Auth.saveToken(res.data);
                Alerts.add('success', 'Logged in!');
                console.log('Token:', res.data);
                $location.path('/');
            }, function error(res) {
                Alerts.add('danger', 'Incorrect email/password');
                console.log(res);
            });
        }
    }])
    .controller('ProfileCtrl', ['$scope', '$http', 'Auth', 'Alerts', '$state', function($scope, $http, Auth, Alerts, $state) {
        if (!Auth.isLoggedIn()) {
            $state.go('home');
        }
        var user = Auth.currentUser();

        $scope.edit = {};
        $scope.token = {};

        $http.get('/api/users/' + user.id).then(function(results) {
            $scope.user = results.data;
            // petExistsOnProfile is the toggle for displaying either the pet image
            // or prompt to add one, it will follow after $scope.user is updated
            $scope.petExistsOnProfile = Auth.checkForPetOnProfile($scope.user);
        }).catch(function(err) {
            console.log(err);
        });
    }])

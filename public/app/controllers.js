angular.module('MainCtrls', ['MainServices'])
	.controller('SignupCtrl', ['$scope', '$http', '$location', 'Auth', 'Alerts', function($scope, $http, $location, Auth, Alerts) {
        $scope.user = {
            name: '',
            email: '',
            password: '',
            phoneNumber: ''
        };
        $scope.userSignup = function() {
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
                $location.path('/');
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

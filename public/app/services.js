angular.module('MainServices', ['ngResource'])
    .factory('Event', ['$resource', function($resource) {
        return $resource('/api/events/:id');
    }])
    .factory('Guest', ['$resource', function($resource) {
        return $resource('/api/guests/:id');
    }])
    .factory('User', ['$resource', function($resource) {
        return $resource('/api/users/:id');
    }])
    .factory('Item', ['$resource', function($resource) {
        return $resource('/api/items/:id');
    }])


.factory('Auth', ['$window', function($window) {
    return {
        saveToken: function(token) {
            $window.localStorage['secretitems-token'] = token;
        },
        getToken: function() {
            return $window.localStorage['secretitems-token'];
        },
        removeToken: function() {
            $window.localStorage.removeItem('secretitems-token');
        },
        isLoggedIn: function() {
            var token = this.getToken();
            return token ? true : false;
        },
        currentUser: function() {
            if (this.isLoggedIn()) {
                var token = this.getToken();
                try {
                    var payload = JSON.parse($window.atob(token.split('.')[1]));
                    return payload;
                } catch (err) {
                    return false;
                }
            }
        }
    }
}])

.factory('Alerts', [function() {
    var alerts = [];

    return {
        clear: function() {
            alerts = [];
        },
        add: function(type, msg) {
            alerts.push({ type: type, msg: msg });
        },
        get: function() {
            return alerts;
        },
        remove: function(idx) {
            alerts.splice(idx, 1);
        }
    }
}]);

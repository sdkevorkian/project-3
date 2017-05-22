angular.module('Ctrls', ['AuthServices'])
    .controller('HomeCtrl', ['$scope', 'Auth', function($scope, Auth) {
        // console.log(Auth.currentUser());

    }])
    .controller('NavCtrl', ['$scope', 'Auth', 'Alerts', function($scope, Auth, Alerts) {
        $scope.Auth = Auth;
        $scope.logout = function() {
            Alerts.add('sucess', 'You\'ve now logged out');
            Auth.removeToken();
        };
    }])
    .controller('AlertsCtrl', ['$scope', 'Alerts', function($scope, Alerts) {
        $scope.Alerts = Alerts;
    }])
    .controller('SignupCtrl', ['$scope', '$http', '$location', 'Auth', 'Alerts', function($scope, $http, $location, Auth, Alerts) {
        $scope.user = {
            email: '',
            password: ''
        };
        $scope.userSignup = function() {
            $http.post('/api/users', $scope.user).then(function success(res) {

                Alerts.add('success', 'Account created!');
                $http.post('/api/auth', $scope.user).then(function success(res) {

                    Alerts.add('success', 'You are now logged in');
                    Auth.saveToken(res.data.token);
                    $location.path('/');
                }, function error(res) {

                    Alerts.add('danger', 'something went wrong, please try again');
                    console.log(res);
                    $location.path('/signup');
                });
            }, function error(res) {

                Alerts.add('danger', 'This email may already exist, please try again');
                console.log(res);
            });
        };
    }])
    .controller('LoginCtrl', ['$scope', '$http', '$location', 'Auth', 'Alerts',
        function($scope, $http, $location, Auth, Alerts) {
            $scope.user = {
                email: '',
                password: ''
            };
            $scope.userLogin = function() {
                $http.post('/api/auth', $scope.user).then(function success(res) {
                    Auth.saveToken(res.data.token);
                    Alerts.add('success', 'You are now logged in!');
                    $location.path('/');
                }, function error(res) {
                    Alerts.add('danger', 'Something went wrong, maybe a wrong password or username?');
                    console.log(res);
                });
            };
        }
    ]);

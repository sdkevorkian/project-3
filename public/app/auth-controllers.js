angular.module('AuthCtrls', ['AuthFactories'])
    .controller('NavCtrl', ['$scope', 'Auth', 'Alerts', '$state', function($scope, Auth, Alerts, $state) {
        $scope.Auth = Auth;
        $scope.status = {
            isopen: false
        };

        $scope.logout = function() {
            Alerts.add('danger', 'You\'ve now logged out');
            Auth.removeToken();
            $state.go('home');
        };

        $scope.toggled = function(open) {
            console.log('Dropdown is now: ', open);
        };

        $scope.toggleDropdown = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status.isopen = !$scope.status.isopen;
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

                Alerts.add('danger', 'Account created!');
                $http.post('/api/auth', $scope.user).then(function success(res) {

                    Alerts.add('danger', 'You are now logged in');
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
    .controller('LoginCtrl', ['$scope', '$http', '$location', 'Auth', 'Alerts', function($scope, $http, $location, Auth, Alerts) {
        $scope.user = {
            email: '',
            password: ''
        };

        $scope.userLogin = function() {
            $http.post('/api/auth', $scope.user).then(function success(res) {
                Auth.saveToken(res.data.token);
                Alerts.add('danger', 'You are now logged in!');
                $location.path('/');
            }, function error(res) {
                Alerts.add('danger', 'Something went wrong, maybe a wrong password or username?');
                console.log(res);
            });
        };
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

        $scope.removeFavorite = function(petId) {
            $http.put('/api/users/favorites', { userId: user.id, petId: petId }).then(function(result) {
                $scope.user = result.data;
                $scope.petExistsOnProfile = Auth.checkForPetOnProfile($scope.user);
                Alerts.add('danger', 'Favorite Removed');
            }).catch(function(err) {
                console.log(err);
            });
        };

        $scope.userEdit = function() {
            $http.put('/api/users', { userId: user.id, update: $scope.edit }).then(function(result) {
                $scope.user = result.data;
                $scope.petExistsOnProfile = Auth.checkForPetOnProfile($scope.user);
                Alerts.add('danger', 'Profile Updated');
                Auth.removeToken();
                $http({
                    method: 'POST',
                    url: '/api/auth',
                    data: { 'email': result.data.email, 'password': $scope.token.password }
                }).then(function(result) {
                    Auth.saveToken(result.data.token);
                });
            }).catch(function(err) {
                console.log(err);
            });
            $scope.bool = false;
        };

        $scope.editBtn = function(bool) {
            $scope.bool = bool;
        };

        $scope.compareToOwnPet = function() {
            // check if a pet is present to compare to, then stores the url
            // and takes the url to that controller
            if ($scope.user.usersPetImg) {
                localStorage.petUrl = $scope.user.usersPetImg;
                $state.go('compare');
            } else {
                Alerts.add('danger', "You don't have a pet to compare to!");
            }
        };
    }]);

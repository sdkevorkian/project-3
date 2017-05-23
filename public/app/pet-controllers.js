angular.module('PetCtrls', [])
    .controller('SearchCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.getBreeds = function(animal) {
            $http.post('/api/pets/breeds', animal).then(function(data) {
                $scope.breeds = data;
            }).catch(function(err) {
                console.log(err);
            });
            return $scope.breeds;
        }

    }])
    .controller('PetShowCtrl', ['$scope', function($scope) {

    }])
    .controller('CompareCtrl', ['$scope', '$http', function($scope, $http) {
        $http.post('/api/compare', { test: 'test' }).then(function(data) {
            $scope.data = data;
        }).catch(function(err) {
            console.log(err);
        });
    }]);

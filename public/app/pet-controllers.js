angular.module('PetCtrls', [])
    .controller('SearchCtrl', ['$scope', function($scope) {
        var animalChosen = false;
        if ($scope.animal) {
            animalChosen = true;
        }

    }])
    .controller('PetShowCtrl', ['$scope', function($scope) {

    }])
    .controller('CompareCtrl', ['$scope', '$http', function($scope, $http) {

        $http.post('/api/compare', { test: 'test', }).then(function(result) {
            $scope.matchPercent = result.data.matchPercent;
        }).catch(function(err) {
            console.log(err);
        });
    }]);

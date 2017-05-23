angular.module('PetCtrls', [])
    .controller('SearchCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.getBreeds = function() {
            $http.post('/api/pets/breeds', { animal: $scope.pet.animal }).then(function(results) {
                $scope.breeds = results.data;
                console.log($scope.breeds);
                return $scope.breeds;
            }).catch(function(err) {
                console.log(err);
            });
        }
    }])
    .controller('PetShowCtrl', ['$scope', function($scope) {

    }])
    .controller('CompareCtrl', ['$scope', '$http', 'Auth', function($scope, $http, Auth) {
        var user = Auth.currentUser();
        $http.post('/api/compare', { userUrl: user.profileImg, }).then(function(result) {
            $scope.matchPercent = result.data.matchPercent;
        }).catch(function(err) {
            console.log(err);
        });
    }]);

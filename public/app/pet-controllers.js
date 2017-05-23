angular.module('PetCtrls', [])
    .controller('SearchCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.getBreeds = function() {
            $http.post('/api/pets/breeds', { animal: $scope.pet.animal }).then(function(results) {
                $scope.breeds = results.data;
            }).catch(function(err) {
                console.log(err);
            });
        };
    }])
    .controller('PetShowCtrl', ['$scope', '$http','$stateParams', function($scope,$http, $stateParams) {
        $http.get('/api/pets/' + $stateParams.id).then(function(result){
            $scope.pet =result.data.petfinder.pet;
            localStorage.petUrl=result.data.petfinder.pet.media.photos.photo[2].$t;
        });
    }])
    .controller('CompareCtrl', ['$scope', '$http', 'Auth', function($scope, $http, Auth) {
        var user = Auth.currentUser();
        $http.post('/api/compare', { userUrl: user.profileImg, petUrl: localStorage.petUrl }).then(function(result) {
            $scope.matchPercent = result.data.matchPercent;
        }).catch(function(err) {
            console.log(err);
        });
    }]);

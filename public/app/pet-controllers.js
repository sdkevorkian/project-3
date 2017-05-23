angular.module('PetCtrls', ['PetFactories'])
    .controller('SearchCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.getBreeds = function() {
            $http.post('/api/pets/breeds', { animal: $scope.pet.animal }).then(function(results) {
                $scope.breeds = results.data;
            }).catch(function(err) {
                console.log(err);
            });
        };
        $scope.petSearch = function() {
            $http.post('/api/pets', { searchBody: $scope.pet }).then(function(results) {
                $scope.pets = results.data;
            }).catch(function(err) {
                console.log(err);
            });
        };
    }])
    .controller('PetShowCtrl', ['$scope', '$http','$stateParams', function($scope,$http, $stateParams) {
        $http.get('/api/pets/' + $stateParams.id).then(function(result){
            $scope.pet =result.data;
            //save to local storage for retrieval on compare page
            localStorage.petName = $scope.pet.name.$t;
            localStorage.petUrl=result.data.media.photos.photo[2].$t;
            $scope.petId = $stateParams.id;
            localStorage.petId = $scope.petId;
        });
    }])
    .controller('CompareCtrl', ['$scope', '$http', 'Auth', 'Compare', function($scope, $http, Auth, Compare) {
        var user = Auth.currentUser();
        console.log(user);
        // gets image urls for display
        $scope.profileImg = user.profileImg;
        $scope.petImg = localStorage.petUrl;
        $scope.petId = localStorage.petId;

        $scope.matchPercent = Compare.compareTwo(user.profileImg, localStorage.petUrl).then(function(result){
            $scope.matchPercent = result.data.matchPercent;
            console.log(result);
        }).catch(function(err){
            console.log(err);
        });

    }]);

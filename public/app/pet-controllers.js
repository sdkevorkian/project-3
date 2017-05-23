angular.module('PetCtrls', ['PetFactories'])
    .controller('HomeCtrl', ['$scope', function($scope) {
        $scope.people = ['../img/home-test/sk.jpg', '../img/home-test/ab.jpg', '../img/home-test/at.jpg'];
        $scope.pets = ['../img/home-test/zoe.png', '../img/home-test/zero.png', '../img/home-test/hobbes.png'];
        var userToTest;
        var petToTest;

        $scope.userChosen = function(person) {
            userToTest = $scope.people[person];
            console.log(userToTest);
        };
        $scope.petChosen = function(pet) {
            petToTest = $scope.pets[pet];
            console.log(petToTest);
        };


    }])
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
    .controller('PetShowCtrl', ['$scope', '$http', '$stateParams', 'Favorite', function($scope, $http, $stateParams, Favorite) {
        $http.get('/api/pets/' + $stateParams.id).then(function(result) {
            $scope.pet = result.data;
            //save to local storage for retrieval on compare page
            localStorage.petName = $scope.pet.name.$t;
            localStorage.petUrl = result.data.media.photos.photo[2].$t;
            $scope.petId = $stateParams.id;
            localStorage.petId = $scope.petId;
        });
    }])
    .controller('CompareCtrl', ['$scope', '$http', 'Auth', 'Compare', 'Favorite', function($scope, $http, Auth, Compare, Favorite) {
        var user = Auth.currentUser();
        console.log(user);
        // gets image urls for display
        $scope.profileImg = user.profileImg;
        $scope.petImg = localStorage.petUrl;
        $scope.petId = localStorage.petId;

        $scope.matchPercent = Compare.compareTwo(user.profileImg, localStorage.petUrl).then(function(result) {
            $scope.matchPercent = result.data.matchPercent;
            console.log(result);
        }).catch(function(err) {
            console.log(err);
        });
        $scope.addFavorite = function() {
            Favorite.add(user.id, )
        };
    }]);

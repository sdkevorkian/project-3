angular.module('PetCtrls', ['PetFactories'])
    .controller('HomeCtrl', ['$scope', 'Compare', function($scope, Compare) {
        $scope.people = [{
            imgSrc: '../img/home-test/sk.jpg',
            compareSrc: '../public/img/home-test/sk.jpg'
        }, {
            imgSrc: '../img/home-test/ab.png',
            compareSrc: '../public/img/home-test/ab.png'
        }, {
            imgSrc: '../img/home-test/at.jpg',
            compareSrc: '../public/img/home-test/at.jpg'
        }];
        $scope.pets = ['../img/home-test/zoe.png', '../img/home-test/zero.png', '../img/home-test/hobbes.png'];
        var userToTest;
        var petToTest;

        $scope.userChosen = function(person) {
            userToTest = $scope.people[person];
            console.log(userToTest);
            if (petToTest) {
                Compare.compareDemo(userToTest.compareSrc, petToTest.compareSrc).then(function(result) {
                    console.log(result);
                }).catch(function(err) {
                    console.log(err);
                });
            }
        };
        $scope.petChosen = function(pet) {
            petToTest = $scope.pets[pet];
            console.log(petToTest);
            if (userToTest) {
                Compare.compareDemo(userToTest.compareSrc, petToTest.compareSrc).then(function(result) {
                    console.log(result);
                }).catch(function(err) {
                    console.log(err);
                });
            }
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

.controller('PetShowCtrl', ['$scope', '$http', '$stateParams', 'Auth', 'Favorite', function($scope, $http, $stateParams, Auth, Favorite) {
        var user = Auth.currentUser();
        var pet = {
            id: localStorage.petId,
            name: localStorage.petName,
            petImg: localStorage.petUrl
        };

        $http.get('/api/pets/' + $stateParams.id).then(function(result) {
            $scope.pet = result.data;
            //save to local storage for retrieval on compare page
            localStorage.petName = $scope.pet.name.$t;
            localStorage.petUrl = result.data.media.photos.photo[2].$t;
            $scope.petId = $stateParams.id;
            localStorage.petId = $scope.petId;
        });

        $scope.addFavorite = function() {
            Favorite.add(user.id, pet);
        };
    }])
    .controller('CompareCtrl', ['$scope', '$http', 'Auth', 'Compare', 'Favorite', function($scope, $http, Auth, Compare, Favorite) {
        var user = Auth.currentUser();
        var pet = {
            id: localStorage.petId,
            name: localStorage.petName,
            petImg: localStorage.petUrl
        };

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
            Favorite.add(user.id, pet);
        };
    }]);

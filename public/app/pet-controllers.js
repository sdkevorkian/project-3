angular.module('PetCtrls', ['PetFactories'])
    .controller('HomeCtrl', ['$scope', 'Compare', function($scope, Compare) {
        $scope.people = [{
            imgSrc: '../img/home-test/sk.png',
            compareSrc: './public/img/home-test/sk.png',
            name: 'Sara'
        }, {
            imgSrc: '../img/home-test/ab.png',
            compareSrc: './public/img/home-test/ab.png',
            name: 'Alaina'
        }, {
            imgSrc: '../img/home-test/at.jpg',
            compareSrc: './public/img/home-test/at.jpg',
            name: 'Andrew'
        }];
        $scope.pets = [{
            imgSrc: '../img/home-test/zoe.png',
            compareSrc: './public/img/home-test/zoe.png',
            name: 'Zoe'
        }, {
            imgSrc: '../img/home-test/zero.png',
            compareSrc: './public/img/home-test/zero.png',
            name: 'Zero'
        }, {
            imgSrc: '../img/home-test/hobbes.png',
            compareSrc: './public/img/home-test/hobbes.png',
            name: 'Hobbes'
        }, {
            imgSrc: '../img/home-test/mickey.png',
            compareSrc: './public/img/home-test/mickey.png',
            name: 'Mickey'
        }];
        var personToTest;
        var petToTest;

        $scope.userChosen = function(person) {
            personToTest = $scope.people[person];
            console.log(personToTest);

        };
        $scope.petChosen = function(pet) {
            petToTest = $scope.pets[pet];
            console.log(petToTest);

        };

        $scope.compareDemo = function() {
            Compare.compareDemo(personToTest.compareSrc, petToTest.compareSrc).then(function(result) {
                $scope.matchResults = Compare.percentToRanking(result.data.matchPercent);
                console.log(result.data.matchPercent);
            }).catch(function(err) {
                console.log(err);
            });
            $scope.matchDone = true;
        };

    }])
    .controller('SearchCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.$watch('pet.animal', function() {
            $http.post('/api/pets/breeds', { animal: $scope.pet.animal }).then(function(results) {
                $scope.breeds = results.data;
            }).catch(function(err) {
                console.log(err);
            });
        });

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

        $http.get('/api/pets/' + $stateParams.id).then(function(result) {
            $scope.pet = result.data;
            //save to local storage for retrieval on compare page
            localStorage.petName = $scope.pet.name.$t;
            localStorage.petUrl = result.data.media.photos.photo[2].$t;
            $scope.petId = $stateParams.id;
            localStorage.petId = $scope.petId;
        });
        var pet = {
            id: $stateParams.id,
            name: localStorage.petName,
            petImg: localStorage.petUrl
        };

        $scope.addFavorite = function() {
            Favorite.add(user.id, pet);
        };
    }])
    .controller('CompareCtrl', ['$scope', '$http', 'Auth', 'Compare', 'Favorite', function($scope, $http, Auth, Compare, Favorite) {
        var user = Auth.currentUser();
        // NOTE: because of how we are using local storage, this page will only work from the petShow page.....
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
            $scope.matchResults = Compare.percentToRanking(result.data.matchPercent);
            console.log(result);
        }).catch(function(err) {
            console.log(err);
        });

        $scope.addFavorite = function() {
            Favorite.add(user.id, pet);
        };
    }]);

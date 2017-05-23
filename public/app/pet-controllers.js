angular.module('PetCtrls', [])
    .controller('SearchCtrl', ['$scope', function($scope) {
        // function getBreeds(animal) {

        // }

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

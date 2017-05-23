angular.module('PetFactories', [])
    .factory('Compare', ['$http', function($http){
        return {
          compareTwo: function(user, pet){
              $http.post('/api/compare', { userUrl: user, petUrl: pet }).then(function(result) {
                return result.data.matchPercent;
            }).catch(function(err) {
                console.log(err);
            });
          }
        };
    }])
    .factory('Favorite', ['$http', function($http) {
        return {
          add: function(userId, pet) {
            $http.post('/api/users/favorites', { userId: userId, pet: pet }).then(function(result) {
                console.log(result);
            }).catch(function(err) {
                console.log(err);
            });
          }
        }
    }]);

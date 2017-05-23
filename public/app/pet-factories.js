angular.module('PetFactories', [])
    .factory('Compare', ['$http', function($http){
        return {
          compareTwo: function(user, pet){
              return $http.post('/api/compare', { userUrl: user, petUrl: pet });
            }
        }
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

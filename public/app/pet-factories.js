angular.module('PetFactories', ['AuthFactories'])
    .factory('Compare', ['$http', function($http){
        return {
          compareTwo: function(user, pet){
              return $http.post('/api/compare', { userUrl: user, petUrl: pet });
            }
        }
    }])
    .factory('Favorite', ['$http', 'Alerts', function($http, Alerts) {
        return {
          add: function(userId, pet) {
            $http.post('/api/users/favorites', { userId: userId, pet: pet }).then(function(result) {
                Alerts.add('success', 'Favorite Added')
            }).catch(function(err) {
                console.log(err);
            });
          }
        }
    }]);

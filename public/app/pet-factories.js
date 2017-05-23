angular.module('PetFactories', [])
    .factory('Compare', ['$http', function($http){
        return {
          compareTwo: function(user, pet){
              return $http.post('/api/compare', { userUrl: user, petUrl: pet });
            }
        };
    }]);

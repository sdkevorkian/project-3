angular.module('PetFactories', ['AuthFactories'])
    .factory('Compare', ['$http', function($http) {
        return {
            compareTwo: function(user, pet) {
                return $http.post('/api/compare', { userUrl: user, petUrl: pet });
                // may want to clean up and add then/catch here, only return matchPercent. will deal with later in week SK
            },
            compareDemo: function(person, pet) {
                return $http.post('/api/compare/demo', { person: person, pet: pet });
                // may want to clean up and add then/catch here, only return matchPercent. will deal with later in week SK
            },
            percentToRanking: function(percent) {
                var matchRank = '';
                if (percent > 20) {
                    matchRank = 'best';
                } else if (percent > 10) {
                    matchRank = 'good';
                } else {
                    matchRank = 'ok';
                }
                return matchRank;
            }
        };
    }])
    .factory('Favorite', ['$http', 'Alerts', function($http, Alerts) {
        return {
            add: function(userId, pet) {
                $http.post('/api/users/favorites', { userId: userId, pet: pet }).then(function(result) {
                    Alerts.add('success', 'Favorite Added');
                }).catch(function(err) {
                    console.log(err);
                });
            }
        };
    }]);

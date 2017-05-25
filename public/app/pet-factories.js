angular.module('PetFactories', ['AuthFactories'])
    .factory('Compare', ['$http', function($http) {
        return {
            compareTwo: function(user, pet) {
                return $http.post('/api/compare', { userUrl: user, petUrl: pet });
            },
            compareDemo: function(person, pet) {
                return $http.post('/api/compare/demo', { person: person, pet: pet });
            },
            percentToRanking: function(percent) {
                var matchRank = '';
                percent = percent * 100;
                if (percent > 20) {
                    matchRank = 'You two are over an 80% match!';
                } else if (percent > 10) {
                    matchRank = 'You two are over a 50% match!';
                } else {
                    matchRank = 'Your match is less than 50%...';
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

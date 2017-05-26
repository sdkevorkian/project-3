angular.module('PetFactories', ['AuthFactories'])
    .factory('Compare', ['$http', function($http) {
        return {
            compareTwo: function(user, pet, userId) {
                return $http.post('/api/compare', { userUrl: user, petUrl: pet, userId: userId });
            },
            compareDemo: function(person, pet) {
                return $http.post('/api/compare/demo', { person: person, pet: pet });
            },
            percentToRanking: function(percent) {
                var matchRank = '';
                percent = (100 - (percent * 100)).toFixed(0);
                console.log(percent);
                if (percent > 95) {
                    matchRank = `Wow! A ${percent}% match! A great candidate for adoption.`;
                } else if (percent > 85) {
                    matchRank = `You may have found your new best friend, with a ${percent}% match!`;
                } else if (percent > 75) {
                    matchRank = `Nice! A ${percent}% match!`;
                } else {
                    matchRank = `A ${percent}% match. Not bad!`;
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

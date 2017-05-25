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
                    matchRank = `Your match is ${percent}%!! You should adopt this pet right now!`;
                } else if (percent > 85) {
                    matchRank = `You two are a great match, ${percent}%!`;
                } else if (percent > 75) {
                    matchRank = `You two are looking pretty good as a ${percent}% match!`;
                } else {
                    matchRank = `Your match could be better...Only ${percent}%`;
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

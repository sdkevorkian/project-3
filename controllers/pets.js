var express = require('express');
var request = require('request');
var router = express.Router();
var key = process.env.API_KEY;

router.route('/random')
  .get(function(req, res) {
      request(url + 'pet.getRandom' + key + '&format=json', function(err, res, body) {
          if (err) return ('something went wrong', err);
          // request returns random petId.  need a 2nd request to get actual info on pet
      });
  });

router.route('/')
  .post(function(req, res) {
      request({
        uri: 'http://api.petfinder.com/pet.find',
        method: 'GET',
        qs: {
          key: key,
          animal: req.body.animal,
          breed: req.body.breed,
          size: req.body.size,
          sex: req.body.sex,
          location: req.body.location,
          format: 'json'
        }
      }, function(error, response, body) {
          if (error) console.log('error', error);
          res.send(JSON.parse(body));
      });
  });

router.route('/breeds')
  .post(function(req, res) {
      request({
        uri: 'http://api.petfinder.com/breed.list',
        method: 'GET',
        qs: {
          key: key,
          animal: req.body.animal,
          format: 'json'
        }
      }, function(error, response, body) {
          if (error) console.log('error', error);
          res.send(JSON.parse(body));
      });
  })


module.exports = router;

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
          location: req.body.location,
          format: 'json'
        }
      }, function(error, responce, body) {
          if (error) console.log('somethign went wrong', error);
          console.log(body);
      });
  });


module.exports = router;

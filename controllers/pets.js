var express = require('express');
var request = require('request');
var router = express.Router();
var url = 'http://api.petfinder.com/';
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
      request(url + 'pet.find' + key + req.body + '&format=json', function(err, res, body) {
          if (err) return ('somethign went wrong', err);
          console.log(body);
      });
  });


module.exports = router;

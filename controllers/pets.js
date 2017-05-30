var express = require('express');
var request = require('request');
var router = express.Router();
var key = process.env.API_KEY;

router.route('/')
    // route to return a list of aniamls, based on user search terms
    .post(function(req, res) {
        request({
            uri: 'https://api.petfinder.com/pet.find',
            method: 'GET',
            qs: {
                key: key,
                animal: req.body.searchBody.animal,
                breed: req.body.searchBody.breed,
                size: req.body.searchBody.size,
                sex: req.body.searchBody.sex,
                location: req.body.searchBody.location,
                format: 'json'
            }
        }, function(error, response, body) {
            if (error) console.log('something went wrong', error);
            res.send(JSON.parse(body).petfinder.pets.pet);
        });
    });

router.route('/random')
    // route to get info of a random animal
    .get(function(req, res) {
        // API call to get the ID of a random animal
        request({
            uri: 'https://api.petfinder.com/pet.getRandom',
            method: 'GET',
            qs: {
                key: key,
                format: 'json'
            }
        }, function(error, response, body) {
            if (error) console.log('error', error);
            var data = JSON.parse(body);
            var id = data.petfinder.petIds.id.$t;

            // API call to get the data of an animal, based on the random ID generated above
            request({
                uri: 'https://api.petfinder.com/pet.get',
                method: 'GET',
                qs: {
                    key: key,
                    id: id,
                    format: 'json'
                }
            }, function(error, response, body) {
                if (error) console.log('error', error);
                res.send(JSON.parse(body).petfinder.pet);
            });
        });
    });

router.route('/breeds')
    .post(function(req, res) {
        request({
            uri: 'https://api.petfinder.com/breed.list',
            method: 'GET',
            qs: {
                key: key,
                animal: req.body.animal,
                format: 'json'
            }
        }, function(error, response, body) {
            if (error) console.log('error', error);
            res.send(JSON.parse(body).petfinder.breeds.breed);
        });
    });

router.route('/:id')
    // route to get data on 1 animal, based on it's ID
    .get(function(req, res) {
        request({
            uri: 'https://api.petfinder.com/pet.get',
            method: 'GET',
            qs: {
                key: key,
                id: req.params.id,
                format: 'json'
            }
        }, function(error, response, body) {
            if (error) console.log('error', error);
            res.send(JSON.parse(body).petfinder.pet);
        });
    });

module.exports = router;

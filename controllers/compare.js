var express = require('express');
var gm = require('gm').subClass({ imageMagick: true });
var fs = require('fs');
var request = require('request');
var router = express();

router.post('/', function(req, res) {
    var user = 'user.jpg';
    var pet = 'pet.jpg'; // save as userId with some concatenation
    var userUrl = req.body.userUrl;
    var petUrl = req.body.petUrl;
    // do parallel async for both downloads and both gms. In the callback, then proceed.
    download(userUrl, user, function(err, data) {
        if (err) console.log(err);
        else console.log(data);
        download(petUrl, pet, function(err, data) {
            if (err) console.log(err);
            else console.log(data);

            gm(user).resize(200, 200, '!').noProfile().write(user, function(err) {
                if (!err) console.log('user resized');
                gm(pet).resize(200, 200, '!').noProfile().write(pet, function(err) {
                    if (!err) console.log('pet resized');

                    gm().compare(user, pet, 1.0, function(err, isEqual, equality) {
                        console.log(err);
                        console.log(isEqual);
                        console.log(equality);
                        deleteAfterUse(user);
                        deleteAfterUse(pet);
                        res.send({ matchPercent: equality });
                    });
                });
            });
        });
    });
});

router.post('/demo', function(req, res) {
    var person = req.body.person;
    var pet = req.body.pet;
    console.log(person, pet);
    gm(person).resize(200, 200, '!').noProfile().write(person, function(err) {
        if (!err) console.log('person resized');
        gm(pet).resize(200, 200, '!').noProfile().write(pet, function(err) {
            if (!err) console.log('pet resized');

            gm().compare(person, pet, 1.0, function(err, isEqual, equality) {
                console.log(err);
                console.log(isEqual);
                console.log(equality);
                res.send({ matchPercent: 'got to route', result: equality, err: err });
            });
        });
    });
});

// helper functions
function download(uri, filename, callback) {
    request.head(uri, function(err, res, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
}

function deleteAfterUse(pic) {
    fs.unlink(pic, function() {
        console.log('pic deleted');
    });
}



module.exports = router;

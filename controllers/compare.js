var express = require('express');
var gm = require('gm').subClass({ imageMagick: true });
var fs = require('fs');
var request = require('request');
var router = express();

router.get('/api/compare', function(req, res) {
    var user = 'user.jpg';
    var pet = 'pet.jpg';
    var userUrl = 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/8/000/279/3a6/3922032.jpg';
    var petUrl = 'https://www.petinsurance.com/images/VSSimages/consumer/v5/cat-insurance.jpg';

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
                        res.send('your match is ' + equality);
                    });
                });

            });
        });
    });
});

// helper functions
var download = function(uri, filename, callback) {
    request.head(uri, function(err, res, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

var deleteAfterUse = function(pic) {
    fs.unlink(pic, function() {
        console.log('pic deleted');
    });
};



module.exports = router;

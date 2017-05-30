var express = require('express');
var gm = require('gm').subClass({ imageMagick: true });
var fs = require('fs');
var request = require('request');
var async = require('async');
var router = express();

router.post('/', function(req, res) {
    // we declare where we want our temporary file saved
    // and add the userId so multiple users can be on at once
    var user = 'user' + req.body.userId + '.jpg';
    var pet = 'pet' + req.body.userId + '.jpg';
    var userUrl = req.body.userUrl;
    var petUrl = req.body.petUrl;

    async.waterfall([
        // first two images are downloaded from provided URLs
        function(callback) {
            download(userUrl, user, function(err, data) {
                if (err) console.log(err);
                callback(null);
            });
        },
        function(callback) {
            download(petUrl, pet, function(err, data) {
                if (err) console.log(err);
                callback(null);
            });
        },
        // then the images are resized so comparison can be performed
        function(callback) {
            gm(user).resize(200, 200, '!').noProfile().write(user, function(err) {
                if (!err) console.log('user resized');
                callback(null);
            });
        },
        function(callback) {
            gm(pet).resize(200, 200, '!').noProfile().write(pet, function(err) {
                if (!err) console.log('pet resized');
                callback(null);
            });
        },
        // we compare the two images and send back the equality %
        // then, since we only needed the imgs temporarily we delete them
        function(callback) {
            gm().compare(user, pet, 1.0, function(err, isEqual, equality) {
                console.log(err);
                deleteAfterUse(user);
                deleteAfterUse(pet);
                callback(null, equality);
            });
        }
    ], function(err, result) {
        if (err) console.log(err);
        console.log('done');
        res.send({ matchPercent: result });
    });
});

//  the demo doesn't require downloading and resizing
// so we have a different route for ease
router.post('/demo', function(req, res) {
    var person = req.body.person;
    var pet = req.body.pet;
    console.log(person, pet);

    gm().compare(person, pet, 1.0, function(err, isEqual, equality) {
        console.log(err);
        console.log(isEqual);
        console.log(equality);
        res.send({ matchPercent: equality });
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

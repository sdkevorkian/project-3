var express = require('express');
var gm = require('gm').subClass({ imageMagick: true });
var fs = require('fs');
var request = require('request');
var router = express();

router.post('/', function(req, res) {
    // we declare where we want our temporary file saved
    // and add the userId so multiple users can be on at once
    var user = 'user' + req.body.userId + '.jpg';
    var pet = 'pet' + req.body.userId + '.jpg';
    var userUrl = req.body.userUrl;
    var petUrl = req.body.petUrl;

    // first two images are downloaded from provided URLs
    download(userUrl, user, function(err, data) {
        if (err) console.log(err);
        else console.log(data);
        download(petUrl, pet, function(err, data) {
            if (err) console.log(err);
            else console.log(data);

            // then the images are resized so comparison can be performed
            gm(user).resize(200, 200, '!').noProfile().write(user, function(err) {
                if (!err) console.log('user resized');
                gm(pet).resize(200, 200, '!').noProfile().write(pet, function(err) {
                    if (!err) console.log('pet resized');

                    // we compare the two images and send back the equality %
                    // then, since we only needed the imgs temporarily we delete them
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

    //  the demo doesn't require downloading and resizing
    // so we have a different route for ease
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

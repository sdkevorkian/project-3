var express = require('express');
var User = require('../models/user');
var router = express.Router();

router.route('/')
    .post(function(req, res) {
        // Find the user by email.  Error if already exists, otherwise create user
        User.findOne({ email: req.body.email }, function(err, user) {
            if (user) return res.status(400).send({ message: 'Email already exists' });

            User.create(req.body, function(err, user) {
                if (err) return res.status(500).send(err);

                return res.send(user);
            });
        });
    })
    .put(function(req, res) {
        console.log(req.body.update);
        User.findByIdAndUpdate(req.body.userId, req.body.update, { new: true }, function(err, result) {
            if (err) return res.status(500).send(err);

            return res.send(result);
        });
    });

router.route('/favorites')
    .post(function(req, res) {
        User.findByIdAndUpdate(req.body.userId, { $push: { favorites: req.body.pet }}, function(err) {
            if (err) return res.status(500).send(err);

            return res.send('Favorite Added');
        });
    })
    .put(function(req, res) {
        User.findByIdAndUpdate(req.body.userId, { $pull: { favorites: { id: req.body.petId }}}, { new: true }, function(err, result) {
            if (err) return res.status(500).send(err);

            return res.send(result);
        });
    });

// Find a single user, by ID.  Used for profile page.  Should we search by email instead?
router.get('/:id', function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if (err) return res.status(500).send(err);

        return res.send(user);
    });
});

module.exports = router;

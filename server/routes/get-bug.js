var express = require('express');
var router = require('express').Router();
var projectId = 'insect-collector';
var Vision = require('@google-cloud/vision');
var User = require('../models/user');
var Insect = require('../models/insect');

router.get('/', function (req, res) {
    // var userEmail = req.decodedToken.email;
    // console.log(userEmail);
    //if null insert user
    // Instantiates a client
    var visionClient = Vision({
        projectId: projectId
    });

    var fileName = './public/assets/daddylonglegs.jpg';
    //fileName = how to pass on imageurl -> not a GET request (or query string data)

    // Performs label detection on the image file
    visionClient.detectLabels(fileName)
        .then(function (results) {
            var labels = results[0];

            console.log('Labels:');
            labels.forEach(function (label) { console.log(label); });
            res.send(results);
        });
});

router.get('/all', function (req, res) {
    Insect.find({}, function (err, insects) {
        if (err) {
            console.log('Error COMPLETING getInsect query task', err);
            res.sendStatus(500);
        } else {
            console.log(insects);
            res.send(insects);
        }
    });
});


module.exports = router;
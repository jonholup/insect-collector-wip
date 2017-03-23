var express = require('express');
var router = require('express').Router();

var projectId = 'insect-collector';
var Vision = require('@google-cloud/vision');



router.get('/', function (req, res) {
    // Instantiates a client
    var visionClient = Vision({
        projectId: projectId
    });

    var fileName = './public/assets/daddylonglegs.jpg';

    // Performs label detection on the image file
    visionClient.detectLabels(fileName)
        .then(function (results) {
            var labels = results[0];

            console.log('Labels:');
            labels.forEach(function (label) { console.log(label); });
            res.send(results);
        });
});

module.exports = router;
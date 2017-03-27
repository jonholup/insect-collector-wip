var express = require('express');
var router = require('express').Router();
var multer = require('multer');
var upload = multer({ dest: 'uploads/' }).single('photo');
var projectId = 'insect-collector';
var Vision = require('@google-cloud/vision');
var User = require('../models/user');
var Insect = require('../models/insect');
var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, '/uploads');
  },
  filename: function (request, file, callback) {
    console.log(file);
    callback(null, file.originalname);
  }
});



router.post('/uploads', function(request, response) {
    console.log(upload);
    
  upload(request, response, function(err) {
  if(err) {
    console.log('Error Occured');
    return;
  }
  console.log(request.file);
  response.end('Your File Uploaded');
  console.log('Photo Uploaded');
  });
});

router.post('/', function (req, res) {
    console.log(req.decodedToken);    
    // var userEmail = req.decodedToken.email;
    // console.log(userEmail);
    //if null insert user
    // Instantiates a client
    console.log('post req.body:', req.body);
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
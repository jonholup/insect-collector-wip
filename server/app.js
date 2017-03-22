// unchanged from 'nodeFire'

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var decoder = require('./modules/decoder');
var mongoConnection = require('./modules/mongo-connection');
var routes = require('./routes/public');
var privateData = require('./routes/private-data');
var Vision = require('@google-cloud/vision');

var portDecision = process.env.PORT || 5000;

app.get('/', function(req, res){
  res.sendFile(path.resolve('./public/views/index.html'));
});

app.use(express.static('public'));
app.use(bodyParser.json());

mongoConnection.connect();

// Decodes the token in the request header and attaches the decoded token to req.decodedToken on the request.
app.use(decoder.token);

/* Whatever you do below this is protected by your authentication. */

// This is the route for your secretData. The request gets here after it has been authenticated.
app.use("/privateData", privateData);

app.listen(portDecision, function(){
  console.log("Listening on port: ", portDecision);
});

// Imports the Google Cloud client library
var Vision = require('@google-cloud/vision');

// Your Google Cloud Platform project ID
var projectId = 'insect-collector';

// Instantiates a client
var visionClient = Vision({
  projectId: projectId
});

// The name of the image file to annotate
var fileName = '../public/assets/daddylonglegs.jpg';

// Performs label detection on the image file
visionClient.detectLabels(fileName)
  .then(function(results) {
    var labels = results[0];

    console.log('Labels:');
    labels.forEach(function(label) { console.log(label); });
  });

var gcloud = require('google-cloud')({
  keyFilename: './insect-collector-ecc676f01d78.json',
  projectId: 'insect-collector'
});

var vision = gcloud.vision();
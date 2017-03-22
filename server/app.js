var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var decoder = require('./modules/decoder');
var mongoConnection = require('./modules/mongo-connection');
var routes = require('./routes/public');
var getBug = require('./routes/get-bug.js');
var Vision = require('@google-cloud/vision');

var portDecision = process.env.PORT || 5000;

app.get('/', function(req, res){
  res.sendFile(path.resolve('./public/views/index.html'));
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/getBug', getBug);

mongoConnection.connect();

// Decodes the token in the request header and attaches the decoded token to req.decodedToken on the request.
// app.use(decoder.token);

/* Whatever you do below this is protected by your authentication. */

// This is the route for your secretData. The request gets here after it has been authenticated.


app.listen(portDecision, function(){
  console.log("Listening on port: ", portDecision);
});

// Imports the Google Cloud client library
var Vision = require('@google-cloud/vision');


// The name of the image file to annotate

var gcloud = require('google-cloud')({
  keyFilename: './server/insect-collector-ecc676f01d78.json',
  projectId: 'insect-collector'
});

var vision = gcloud.vision();
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var decoder = require('./modules/decoder');
var mongoConnection = require('./modules/mongo-connection');
var routes = require('./routes/public');
var getBug = require('./routes/get-bug.js');
var Vision = require('@google-cloud/vision');
var gcloud = require('google-cloud')({
  keyFilename: './server/insect-collector-76b09bf1fbc3.json',
  projectId: 'insect-collector'
});
var vision = gcloud.vision();

var portDecision = process.env.PORT || 5000;

app.get('/', function(req, res){
  res.sendFile(path.resolve('./public/views/index.html'));
});

app.use(express.static('public'));
app.use(bodyParser.json());


mongoConnection.connect();

// Decodes the token in the request header and attaches the decoded token to req.decodedToken on the request.
// app.use(decoder.token);
app.use('/getBug', getBug);

/* Whatever you do below this is protected by your authentication. */

app.listen(portDecision, function(){
  console.log("Listening on port: ", portDecision);
});

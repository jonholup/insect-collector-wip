var mongoose = require('mongoose');
var connectionString = require('./database-config');

mongoose.set('debug', true);

var connectToMongoDatabase = function() {
  mongoose.connect(connectionString);

  mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ', connectionString);
  });

  mongoose.connection.on('error', function (err) {
    console.log('Mongoose failed to connect because error: ', err);
  });
};

module.exports = { connect: connectToMongoDatabase };


// from walkthrough
// var mongoURI = "mongodb://localhost:27017/mean-multer-ngf"; // replace with your mongodb url

// var MongoDB = mongoose.connect(mongoURI).connection;
// MongoDB.on('error', function (err) {
//   if (err) {
//     console.log('mongodb connection error', err);
//   } else {
//     console.log('mongodb connection successful');
//   }
// });

// MongoDB.once('open', function () {
//   console.log('mongodb connection open');
// });
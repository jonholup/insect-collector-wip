// unchanged from 'nodeFire'

var express = require('express');
var router = express.Router();

router.get("/", function (req, res) {
  var userEmail = req.decodedToken.email;
  // Check the user's level of permision based on their email
  User.findOne({ email: userEmail }, function (err, user) {
    if (err) {
      console.log('Error COMPLETING clearanceLevel query task', err);
      res.sendStatus(500);
    } else {
      console.log(user);
      if (user === null) {
        // If the user is not in the database, return a forbidden error status
        console.log('No user found with that email. Have you added this person to the database? Email: ', req.decodedToken.email);
        res.sendStatus(403);
      } else {
        // return all of the results where a specific user has permission
        res.send(user);
      }
    }
  });
});

module.exports = router;

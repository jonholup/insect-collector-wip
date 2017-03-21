// unchanged from 'nodeFire'

var express = require('express');
var router = express.Router();

router.get("/", function(req, res){
  var userEmail = req.decodedToken.email;
  // Check the user's level of permision based on their email
  User.findOne({ email: userEmail }, function (err, user) {
    if (err) {
      console.log('Error COMPLETING clearanceLevel query task', err);
      res.sendStatus(500);
    } else {
      console.log(user);
      if(user === null) {
        // If the user is not in the database, return a forbidden error status
        console.log('No user found with that email. Have you added this person to the database? Email: ', req.decodedToken.email);
        res.sendStatus(403);
      } else {
        // Based on the clearance level of the individual, give them access to different information
        Secret.find({ secrecyLevel: { $lte: user.clearanceLevel } }, function (err, secrets){
          if (err) {
            console.log('Error COMPLETING secrecyLevel query task', err);
            res.sendStatus(500);
          } else {
            // return all of the results where a specific user has permission
            res.send(secrets);
          }
        });
      }
    }
  });
});
// var User = require('../models/user');
// var Secret = require('../models/secret');

// router.get("/", function(req, res){
//   var userEmail = req.decodedToken.email;
//   // Check the user's level of permision based on their email
//   User.findOne({ email: userEmail }, function (err, user) {
//     if (err) {
//       console.log('Error COMPLETING clearanceLevel query task', err);
//       res.sendStatus(500);
//     } else {
//       console.log(user);
//       if(user === null) {
//         // If the user is not in the database, return a forbidden error status
//         console.log('No user found with that email. Have you added this person to the database? Email: ', req.decodedToken.email);
//         res.sendStatus(403);
//       } else {
//         // Based on the clearance level of the individual, give them access to different information
//         Secret.find({ secrecyLevel: { $lte: user.clearanceLevel } }, function (err, secrets){
//           if (err) {
//             console.log('Error COMPLETING secrecyLevel query task', err);
//             res.sendStatus(500);
//           } else {
//             // return all of the results where a specific user has permission
//             res.send(secrets);
//           }
//         });
//       }
//     }
//   });
// });

// router.get("/userClearanceLevel", function(req, res){
//   var userEmail = req.decodedToken.email;
//   // Check the user's level of permision based on their email
//   User.findOne({ email: userEmail }, function (err, user) {
//     if (err) {
//       console.log('Error COMPLETING clearanceLevel query task', err);
//       res.sendStatus(500);
//     } else {
//       console.log(user);
//       if(user === null) {
//         // If the user is not in the database, return a forbidden error status
//         console.log('No user found with that email. Have you added this person to the database? Email: ', req.decodedToken.email);
//         res.sendStatus(403);
//       } else {
//         res.send({userClearanceLevel: user.clearanceLevel});
//       }
//     }
//   });
// });

// router.post("/", function(req, res){
//   var userEmail = req.decodedToken.email;

//   var newSecretObject = req.body;

//   // Check the user's level of permision based on their email
//   User.findOne({ email: userEmail }, function (err, user) {
//     if (err) {
//       console.log('Error COMPLETING clearanceLevel query task', err);
//       res.sendStatus(500);
//     } else {
//       console.log(user);
//       if(user === null) {
//         // If the user is not in the database, return a forbidden error status
//         console.log('No user found with that email. Have you added this person to the database? Email: ', req.decodedToken.email);
//         res.sendStatus(403);
//       } else {
//         // Based on the clearanceLevel of the user, only allow new secrets with secrecyLevel or or below that
//         if (user.clearanceLevel >= newSecretObject.secrecyLevel) {
//           console.log('', newSecretObject);
//           var mongoosifiedNewSecret = new Secret(newSecretObject); // converts our plain old object and gives it mongoose methods like .save

//           mongoosifiedNewSecret.save(function(err, result) {
//             if(err) {
//               console.log('Error adding new secret to database:', err);
//               res.sendStatus(500);
//             } else {
//               res.sendStatus(201);
//             }
//           });
//         } else {
//           res.status(403).send('User is not allowed to add secrets above their level');
//         }
//       }
//     }
//   });
// });

module.exports = router;

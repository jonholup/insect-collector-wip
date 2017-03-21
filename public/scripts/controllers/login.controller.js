myApp.controller('LogInController', function(){
  console.log('Log In Controller was loaded');
  var self = this;
  self.listOfPeople = ['Phil', 'Tom', 'Jeremy', 'Celina', 'Kris'];
});



myApp.controller("LogInController", function($firebaseAuth, $http) {
  var auth = $firebaseAuth();
  var self = this;

  // This code runs whenever the user logs in
  self.logIn = function(){
    auth.$signInWithPopup("google").then(function(firebaseUser) {
      console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
    }).catch(function(error) {
      console.log("Authentication failed: ", error);
    });
  };
  });
  // This code runs whenever the user changes authentication states
  // e.g. whevenever the user logs in or logs out
  // this is where we put most of our logic so that we don't duplicate
  // the same things in the login and the logout code
  // auth.$onAuthStateChanged(getAllSecretsAtCorrectLevel);
  auth.$onAuthStateChanged(function(firebaseUser) {
    // if the user is logged in, firebaseUser will be some object (truthy),
    // if the user is not logged in, firebaseUser is null (falsey)
    // the first ! flips it and makes it just true or false
    // self.userIsLoggedIn = !!firebaseUser;

    // Check directly if firebaseUser is null
    self.userIsLoggedIn = firebaseUser !== null;
  });

  // get request
  // auth.$onAuthStateChanged(function(firebaseUser) {

  //   if (firebaseUser) {
  //     // make request for clearance level
  //     // This is where we make our call to our server
  //     firebaseUser.getToken().then(function(idToken){
  //       $http({
  //         method: 'GET',
  //         url: '/privateData/userClearanceLevel',
  //         headers: {
  //           id_token: idToken
  //         }
  //       }).then(function(response){
  //         var userClearanceLevel = response.data.userClearanceLevel;
  //         self.secrecyLevelOptions = [];
  //         for (var i = 1; i <= userClearanceLevel; i++) {
  //           self.secrecyLevelOptions.push(i);
  //         }
  //       });
  //     });
  //   } else {
  //     self.secrecyLevelOptions = [];
  //   }

  // });

  function getAllSecretsAtCorrectLevel(firebaseUser){
    // firebaseUser will be null if not logged in
    if(firebaseUser) {
      // This is where we make our call to our server
      firebaseUser.getToken().then(function(idToken){
        $http({
          method: 'GET',
          url: '/privateData',
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          self.secretData = response.data;
        });
      });
    } else {
      console.log('Not logged in or not authorized.');
      self.secretData = [];
    }

  }

  self.addNewSecret = function(newSecretObject) {
    var firebaseUser = auth.$getAuth(); // quick way after user is logged in to get current firebase user

    // firebaseUser will be null if not logged in
    if(firebaseUser) {
      // This is where we make our call to our server
      firebaseUser.getToken().then(function(idToken){
        $http({
          method: 'POST',
          url: '/privateData',
          data: newSecretObject,
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          getAllSecretsAtCorrectLevel(firebaseUser);
        });
      });
    } else {
      console.log('Can not post to database when not logged in.');
    }
  };

  // This code runs when the user logs out
  self.logOut = function(){
    auth.$signOut().then(function(){
      console.log('Logging the user out!');
    });
  };


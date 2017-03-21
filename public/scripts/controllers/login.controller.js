myApp.controller("LogInController", ['InsectFactory', '$firebaseAuth', '$http', function (InsectFactory, $firebaseAuth, $http) {
    console.log('LogInController was loaded');
    var auth = $firebaseAuth();
    var self = this;

self.logIn = function(){
    console.log('login function here');
    auth.$signInWithPopup("google").then(function(firebaseUser) {
      console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
    }).catch(function(error) {
      console.log("Authentication failed: ", error);
    });
  };

    // This code runs when the user logs out
function logOut(){
    auth.$signOut().then(function(){
      console.log('Logging the user out!');
    });
  }
// This code runs whenever the user changes authentication states
// e.g. whevenever the user logs in or logs out
// this is where we put most of our logic so that we don't duplicate
// the same things in the login and the logout code
// auth.$onAuthStateChanged(getAllSecretsAtCorrectLevel);
auth.$onAuthStateChanged(function (firebaseUser) {
    // if the user is logged in, firebaseUser will be some object (truthy),
    // if the user is not logged in, firebaseUser is null (falsey)
    // the first ! flips it and makes it just true or false
    // self.userIsLoggedIn = !!firebaseUser;

    // Check directly if firebaseUser is null
    self.userIsLoggedIn = firebaseUser !== null;
});
}]);

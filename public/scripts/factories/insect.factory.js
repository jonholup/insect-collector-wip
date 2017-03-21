myApp.factory('InsectFactory', ['$http', function($http) {

  var specimen = { list: [] };


  function getBugs() {
    $http({
      method: 'GET',
      url: '/bugs'
    }).then(function(response) {
      console.log('response from factory: ', response);
      console.log('response.data from factory: ', response.data);
      specimen.list = response.data;
    });
  }

  function addBug(newBug) {
    $http({
      method: 'POST',
      url: '/bugs',
      data: newBug
    }).then(function(response){
      console.log(response);
      getBugs();
    });
  }

  function deleteBug(bugId){
    $http({
      method: 'DELETE',
      url: '/bugs/' + bugId
    }).then(function(response) {
      getBugs();
    });
  }

  function updateEntry(bug) {
    $http({
      method: 'PUT',
      url: '/bugs/' + bug._id,
      data: bug
    }).then(function(response) {
      getBugs();
    });
  }

  function logIn() {
      auth.$signInWithPopup("google").then(function (firebaseUser) {
          console.log("Firebase Authenticated as: ", firebaseUser.user.displayName);
      }).catch(function (error) {
          console.log("Authentication failed: ", error);
      });
  }

    // This code runs when the user logs out
function logOut(){
    auth.$signOut().then(function(){
      console.log('Logging the user out!');
    });
  }


  // this is the public API, if it's not in here, your controller won't see it
  return {
    specimen: specimen,
    getBugs: getBugs,
    addBug: addBug,
    deleteBug: deleteBug,
    logIn: logIn,
    logOut: logOut,
    updateEntry: updateEntry
  };
}]);
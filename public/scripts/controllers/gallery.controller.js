myApp.controller("GalleryController", ['InsectFactory', '$http', '$firebaseAuth', function (InsectFactory, $http, $firebaseAuth) {
    console.log('GalleryController was loaded');
    var self = this;
    var auth = $firebaseAuth();
    self.getBugs();

    self.getInfo = function() {
        InsectFactory.getInfo();
        self.specimen = InsectFactory.specimen.list;
    };

    


// run route to get images from db
    // auth.$onAuthStateChanged(function (firebaseUser) {
    //    if (firebaseUser) {
    //   // make request for clearance level
    //   // This is where we make our call to our server
    //   firebaseUser.getToken().then(function(idToken){
    //     $http({
    //       method: 'GET',
    //       url: '/getBug',
    //       headers: {
    //         id_token: idToken
    //       }
    //     }).then(function(response){
    //       var userClearanceLevel = response.data.userClearanceLevel;
    //       self.secrecyLevelOptions = [];
    //       for (var i = 1; i <= userClearanceLevel; i++) {
    //         self.secrecyLevelOptions.push(i);
    //       }
    //     });
    //   });
    // } else {
    //   self.secrecyLevelOptions = [];
    // }

  }]);



  // [START vision_quickstart]
// Imports the Google Cloud client library
myApp.controller("UploadController", ['InsectFactory', '$http', function (InsectFactory, $http) {
    console.log('UploadController was loaded');
    var self = this;
    var newBug = {};
    self.submit = function () {
      console.log('newBug:',newBug);
      
    };
}]);


myApp.controller("GalleryController", ['InsectFactory', '$http', function (InsectFactory, $http) {
    console.log('GalleryController was loaded');
    var self = this;
    self.getInfo = function() {
        InsectFactory.getInfo();
        self.specimen = InsectFactory.specimen;
    };


}]);


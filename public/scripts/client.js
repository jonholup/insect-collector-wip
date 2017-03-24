var myApp = angular.module('InsectApp', ['firebase', 'ngRoute', 'ui.bootstrap']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    // .when('/login', {
    //   templateUrl: '/views/templates/login.html',
    //   controller: 'LogInController',
    //   controllerAs: 'lic'
    // })
    .when('/upload', {
      templateUrl: '/views/templates/upload.html',
      controller: 'UploadController',
      controllerAs: 'uc'
    })
    .when('/gallery', {
      templateUrl: '/views/templates/gallery.html',
      controller: 'GalleryController',
      controllerAs: 'gc'
    })
    .otherwise({
      redirectTo: 'gallery'
    });
}]);

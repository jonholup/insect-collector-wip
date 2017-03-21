var myApp = angular.module('InsectApp', ['firebase', 'ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    // .when('/login', {
    //   templateUrl: '/views/templates/login.html',
    //   controller: 'LogInController',
    //   controllerAs: 'lic'
    // })
    // .when('/home', {
    //   templateUrl: '/views/templates/upload.html',
    //   controller: 'HomeController',
    //   controllerAs: 'hc'
    // })
    .when('/gallery', {
      templateUrl: '/views/templates/gallery.html',
      controller: 'GalleryController',
      controllerAs: 'gc'
    })
    .otherwise({
      redirectTo: 'gallery'
    });
}]);

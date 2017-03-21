var myApp = angular.module('InsectApp', ['firebase', 'ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/#/login', {
      templateUrl: '/views/login.html',
      controller: 'LogInController',
      controllerAs: 'lic'
    })
    .when('/home', {
      templateUrl: '/views/todoList.html',
      controller: 'HomeController',
      controllerAs: 'hc'
    })
    .when('/gallery', {
      templateUrl: '/views/gallery.html',
      controller: 'GalleryController',
      controllerAs: 'gc'
    })
    .otherwise({
      redirectTo: 'login'
    });
}]);

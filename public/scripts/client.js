var myApp = angular.module('InsectApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '/views/home.html',
      controller: 'HomeController',
      controllerAs: 'hc'
    })
    .when('/todoList', {
      templateUrl: '/views/todoList.html',
      controller: 'TaskController',
      controllerAs: 'tc'
    })
    .when('/about', {
      templateUrl: '/views/about.html',
      controller: 'AboutController',
      controllerAs: 'ac'
    })
    .otherwise({
      redirectTo: 'home'
    })
}]);

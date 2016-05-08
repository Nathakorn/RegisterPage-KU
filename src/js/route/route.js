angular.module('regisKuApp')
.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /home
  $urlRouterProvider.otherwise("/login");
  //
  // Now set up the states
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "src/view/home.tmpl"
    })
    .state('login', {
      url: "/login",
      templateUrl: "src/view/login.tmpl"
    })
    .state('userprofile', {
      url: "/userprofile",
      templateUrl: "src/view/userProfile.tmpl"
    })
    .state('register', {
      url: "/register",
      templateUrl: "src/view/register.tmpl"
    })
    .state('report', {
      url: "/report",
      templateUrl: "src/view/report.tmpl"
    })
});

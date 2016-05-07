angular.module('regisKuApp')
.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /home
  $urlRouterProvider.otherwise("/home");
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
      url: "/{ID:string}/userprofile/",
      templateUrl: "src/view/userProfile.tmpl"
    })
    .state('changepage', {
      url: "/changepage",
      templateUrl: "src/view/changepage.tmpl"
    })
});

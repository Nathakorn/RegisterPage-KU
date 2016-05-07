angular.module('regisKuApp', ['ui.router'])
  .controller('loginController', ['$scope', '$http', '$stateParams',
    function ($scope, $http, $stateParams) {
      $scope.login = function () {
        console.log("1");
        $location.path("/home");      
      }
  }]);
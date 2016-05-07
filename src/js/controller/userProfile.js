angular.module('regisKuApp', ['ui.router'])
  .controller('userProfileController', ['$scope', '$http', '$stateParams',
    function ($scope, $http, $stateParams) {
    //Mock up database
    //Insert
    
    /*
    $http.post('http://52.37.98.127:3000/v1/5610545668?pin=1029', {
          "5610545001": {
              "name": "",
              "courses": ["123458", "1234567"]
          },
          "5610545002": {
              "name": "",
              "courses": ["123458", "1234567"]
          },
          "5610545003": {
              "name": "",
              "courses": ["123458", "1234567"]
          },
          "5610545004": {
              "name": "",
              "courses": ["123458", "1234567"]
          },
          "5610545005": {
              "name": "",
              "courses": ["123458", "1234567"]
          },

        })
        .success(function (data) {
          console.log(JSON.stringify(data));
          console.log(data);
        })
        .error(function (data) {
          console.log(data);
          $state.go("404");
        });
  
    //delete
    $http.delete('http://52.37.98.127:3000/v1/5610545668/5555555558?pin=1029')
    $http.delete('http://52.37.98.127:3000/v1/5610545668/5555555556?pin=1029')
    */   
    //Get profile
    $scope.userProfile;
    $scope.ID = $stateParams.ID;
    console.log($stateParams.ID);
    $http.get('http://52.37.98.127:3000/v1/5610545668/' + $scope.ID + '?pin=1029')
        .success(function (data){
          console.log(data);
          $scope.userProfile = data;
        })
        .error(function (data) {
          console.log(data);
          $state.go("404");
        });
    //reserve
    $scope.getUserProfile = function () {
      
    };

}]);

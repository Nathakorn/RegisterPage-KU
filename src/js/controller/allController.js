var app = angular.module('regisKuApp', [
  'ui.router','mgcrea.ngStrap'
  ])
  app.controller('userProfileController', ['$scope', '$http', '$stateParams', '$window',
    function ($scope, $http, $stateParams, $window) {
      document.getElementById("mainNav").style.visibility = "show";
      //Mock up database
      //Insert
      /*
      $http.post('http://52.37.98.127:3000/v1/5610545668?pin=1029', {
            "5610545668": {
                //basic
                "ID": "5610545668",
                "firstName": "Nathakorn",
                "surName": "Sukumsirichart",
                "gender": "male",
                "thaiID": "1234567890123",
                "nationality": "Thai",

                "faculty": "Engineering",
                "majorField": "Software & Knowledge Engineering (E17)",
                "programType": "International Program (Special Program)",
                "campus": "Bangkhen",
                "e-mail": "nathakorn.s@ku.th",
                "status": "Currently studying",
                //university
                "dateRegis": "11/01/2016",
                "timeRegis": "09:30-10:30",
                "amount": "60700 Baht",
                "paymentDate": "07/01/2016",
                "eligibility": "Eligible",

                "totalCredit": 0,

                "selectSubjects": {
                    
                }
                
              }
        });
      */
      //delete
      //$http.delete('http://52.37.98.127:3000/v1/5610545668/subjects?pin=1029')
      //$http.delete('http://52.37.98.127:3000/v1/5610545668/5555555556?pin=1029')
        
      //Get profile
      $http.get('http://52.37.98.127:3000/v1/5610545668/5610545668?pin=1029')
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
//home
app.controller('TodoListController', ['$scope', 
    function ($scope) {
     
}]);

//login
app.controller('loginController', ['$scope', '$http', '$stateParams', '$location',
    function ($scope, $http, $stateParams, $location) {
      //document.getElementById("mainNav").style.visibility = "hidden";
      $scope.login = function () {
        console.log($scope.ID);
        //startTime();
        $location.path("/userprofile");

      }
  }]);

//register
app.controller('registerController', ['$scope', '$http', '$stateParams', '$location',
    function ($scope, $http, $stateParams, $location) {
      //$scope.selectedSubject = "";
      $scope.typeAheadCourse = [];
      $scope.sec = "";
      $scope.enrollCourse = {};
      $scope.totalCredit;
      $scope.sumCredit;
      $scope.alert = {
        "title": "Holy guacamole!",
        "content": "Best check yo self, you're not looking too good.",
        "type": "info"
      };
     $http.get('http://52.37.98.127:3000/v1/5610545668/5610545668?pin=1029')
      .success(function (data){
        console.log("total credit = " + data.totalCredit);
        $scope.totalCredit = data.totalCredit;  
      })
      

      $http.get('http://52.37.98.127:3000/v1/5610545668/5610545668?pin=1029')
          .success(function (data){
            $scope.enrollCourse = data.selectSubjects;
           
      });
      


      $http.get('https://whsatku.github.io/skecourses/combined.json')
          .success(function (data){
            angular.forEach(data, function (subject) {
              $scope.typeAheadCourse.push(subject.id);
            })
            $scope.courses = data;
      })
      $scope.panels = [];
      $scope.types = { data: "aaaa"};
      $scope.credit = "";
      $scope.dropSubject = function(subID){
        console.log(subID);
        angular.forEach($scope.enrollCourse, function (subject) {
              if(subject.subID == subID){
                  delete $scope.enrollCourse[subID];
                  console.log($scope.enrollCourse);
                  $scope.totalCredit -= subject.credit;
              }
        })
        var oldJson = {};
              $http.get('http://52.37.98.127:3000/v1/5610545668/5610545668?pin=1029')
              .success(function (data){
              oldJson = data;
              console.log(oldJson.firstName);
              oldJson.selectSubjects = $scope.enrollCourse;
              oldJson.totalCredit = $scope.totalCredit;
              console.log(oldJson);
              var tmp = {};
              tmp[oldJson.ID] = oldJson;
              console.log(tmp)
              $http.post('http://52.37.98.127:3000/v1/5610545668?pin=1029', tmp);
          });

      }
      $scope.submit = function(selectedSubject){
          if(selectedSubject != ""){
          
          //console.log($scope.sec);
          /*
          var onlySubID = $scope.selectedSubject.substr(0,8);
          var onlySubName = $scope.selectedSubject.substr(11,$scope.selectedSubject.length);
          console.log(onlySubID);
          console.log(onlySubName);
          */
          
            angular.forEach($scope.courses, function (eachSubject) {
            if (selectedSubject == eachSubject.id){
                var onlySubName = eachSubject.name.en;
                console.log(onlySubName);
                if($scope.totalCredit + eachSubject.credit.lecture <= 22){
                  if(eachSubject.credit.lecture != null){
                    $scope.totalCredit += eachSubject.credit.lecture;
                  }
                  var selectedSubjectsAL = {};
                    selectedSubjectsAL[selectedSubject] = {
                            "subID": selectedSubject, 
                            "subName": eachSubject.name.en,
                            "section": $scope.sec,
                            "type": $scope.credit,
                            "credit": eachSubject.credit.lecture
                   };
                  Object.assign($scope.enrollCourse,selectedSubjectsAL);
                  var oldJson = {};
                  $http.get('http://52.37.98.127:3000/v1/5610545668/5610545668?pin=1029')
                  .success(function (data){
                    oldJson = data;
                    console.log(oldJson.firstName);
                    Object.assign(oldJson.selectSubjects,selectedSubjectsAL);
                    oldJson.totalCredit = $scope.totalCredit;
                    console.log(oldJson);
                    var tmp = {};
                    tmp[oldJson.ID] = oldJson;
                    console.log(tmp)
                    $http.post('http://52.37.98.127:3000/v1/5610545668?pin=1029', tmp);
                  });
                }else{
                    // more than 22 unit
                    $scope.sumCredit = $scope.totalCredit + eachSubject.credit.lecture;
                }
          }

          })
         }
      }
      
      
      
      $scope.course;
      $http.get('http://52.37.98.127:3000/v1/5610545668/5610545668?pin=1029')
          .success(function (data){
            console.log(data);
            $scope.course = data.courses;
          })
          .error(function (data) {
            console.log(data);
            $state.go("404");
          });

      $scope.login = function () {
       

      }
  }]);

//report 
app.controller('reportController', ['$scope', '$http', '$stateParams', '$location',
    function ($scope, $http, $stateParams, $location) {
      $scope.totalCredit;
      $scope.translateJson = {};
      $http.get('http://52.37.98.127:3000/v1/5610545668/5610545668?pin=1029')
          .success(function (data){
            $scope.totalCredit = data.totalCredit;
            $scope.enrollCourse = data.selectSubjects;
            console.log($scope.enrollCourse);
      });

      $scope.getJson = function () {
        $http.get('http://52.37.98.127:3000/v1/5610545668/5610545668?pin=1029')
          .success(function (data){
            //console.log(data);
            $scope.translateJson = data;
            $scope.translateJson = JSON.stringify($scope.translateJson, undefined, 2);
          })
      }
  }]);

app.filter('objFilter', function($filter){
  return function(input, query){
    if(!query) return input;
      var result = [];

      angular.forEach(input, function(v,k){
          result.push(v);          
      });

      var refined = $filter('filter')(result,query);

      return refined;
  };
});
// 

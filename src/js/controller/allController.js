var app = angular.module('regisKuApp', [
  'ui.router','mgcrea.ngStrap'
  ])
  app.controller('userProfileController', ['$scope', '$http', '$stateParams',
    function ($scope, $http, $stateParams) {
      document.getElementById("mainNav").style.visibility = "show";
      //Mock up database
      //Insert
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

                "courses": ["01000001", "01000002"]
            }
        });
      
      $http.post('http://52.37.98.127:3000/v1/5610545668?pin=1029', {
            "subjects": {
                  "01000001":{
                         "subID": "01000001", 
                         "subName": "name1"
                  },
                  "01000002":{
                         "subID": "01000002", 
                         "subName": "name2"
                  },
                  "01000003":{
                         "subID": "01000003", 
                         "subName": "name3"
                  }
            }
      });
         
    
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
      document.getElementById("mainNav").style.visibility = "show";
      var todoList = this;
      $scope.testScope = 'korn';

      $scope.todos = [
        {text: 'learn angular', done: true},
        {text: 'build an angular app', done: false}]

      $scope.addTodo = function () {
        todoList.todos.push({text: todoList.todoText, done: false})
        todoList.todoText = ''
      }

      $scope.remaining = function () {
        var count = 0
        angular.forEach(todoList.todos, function (todo) {
          count += todo.done ? 0 : 1
        })
        return count
      }

      $scope.archive = function () {
        var oldTodos = todoList.todos
        todoList.todos = []
        angular.forEach(oldTodos, function (todo) {
          if (!todo.done) todoList.todos.push(todo)
        })
    }
}]);

//login
app.controller('loginController', ['$scope', '$http', '$stateParams', '$location',
    function ($scope, $http, $stateParams, $location) {
      //document.getElementById("mainNav").style.visibility = "hidden";
      $scope.login = function () {
        console.log($scope.ID);
        $location.path("/userprofile");

      }
  }]);

//register
app.controller('registerController', ['$scope', '$http', '$stateParams', '$location',
    function ($scope, $http, $stateParams, $location) {
      $scope.states = [];
      $http.get('http://52.37.98.127:3000/v1/5610545668/subjects?pin=1029')
          .success(function (data){
            /* 
              var fullname = "";
              int i;
              for (i = 0; i < 2; i++) { 
                fullname += data[i];
              }
            */
            angular.forEach(data, function(subject){
              console.log(subject.subID + subject.subName);
              $scope.states.push(subject.subID +" "+ subject.subName);  
            });
      
          })
          
      
      $scope.selectedState = "";
      //$scope.states = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Dakota","North Carolina","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];
      
      
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
      $scope.hello = "wakaka2";
      $scope.login = function () {
        

      }
  }]);

// 

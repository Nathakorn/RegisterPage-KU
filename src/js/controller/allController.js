var app = angular.module('regisKuApp', ['ui.router']);
  app.controller('userProfileController', ['$scope', '$http', '$stateParams',
    function ($scope, $http, $stateParams) {
    //Mock up database
    //Insert
    $http.post('http://52.37.98.127:3000/v1/5610545668?pin=1029', {
          "5610545668": {
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
              "status": "Currently studying"
          }
      });
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
      $scope.ID = "";
      $scope.login = function () {
        console.log($scope.ID);
        $location.path("/home");      
      }
  }]);
angular.module('todoApp', ['ui.router'])
  .controller('TodoListController', ['$scope', 
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

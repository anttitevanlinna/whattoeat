
var foods = angular.module('foods', ['facebook','ngRoute','ngAnimate'])
var fbProvider;

foods.config(
  ['FacebookProvider','$routeProvider','$httpProvider', 
    function(FacebookProvider, $routeProvider, $http) {

      fbProvider = FacebookProvider;

      $routeProvider.when('/food', {
                templateUrl : 'food.html',
                controller  : 'foodController'
            });
      $routeProvider.when('/why', {
                templateUrl : 'why.html',
                controller  : 'mainController'
            });
      $routeProvider.when('/code', {
                templateUrl : 'code.html',
                controller  : 'mainController'
            });
      $routeProvider.otherwise( {
                templateUrl : 'yesno.html',
                controller  : 'foodController'
            });
   }])

foods.run(["$http", function($http) {
  $http.get('/api/fbconfig/').success(function(data) {
    console.log('initing FB with '+data);
    fbProvider.init(data);
  }).error(function(data) {
    console.log('Error: ' + data);
  });
}]);

function foodController($scope, $http, Facebook) {

}

function mainController($scope, $http, Facebook) {

  $http.get('/api/randomfood').success(function(data) {
    $scope.currentfood = data;
  }).error(function(data) {
    console.log('Error: ' + data);
  });

  $scope.formData = {};

  $scope.login = function () {
    ga('send', 'event', 'foods', 'login');

    Facebook.login(function(response) {
      $scope.api();            
      console.log(response.status);
    });
  };
  
  $scope.api = function () {
    Facebook.api('/me', function(response) {
      console.log(response);
      $scope.user = response;
    });
  };
  
  $scope.$watch(function() {
    return Facebook.isReady();
  }, function(newVal) {
    if (newVal) {
        Facebook.getLoginStatus(function(response){
          if (response.status === 'connected') {
            var uid = response.authResponse.userID;
            $scope.accessToken = response.authResponse.accessToken;
            $scope.api();            
          } else if (response.status === 'not_authorized') {
            // the user is logged in to Facebook, 
            // but has not authenticated your app
          } else {
            // the user isn't logged in to Facebook.
          }
        });
    }
  });

  $scope.add = function() {

    ga('send', 'event', 'foods', 'add');

    var food = $('input[name=food]').val();
    var formData = {
      'food': food,
      'accessToken': $scope.accessToken
    };
    $http.post('/api/add', formData).success(function(data) {
      console.log(data);
      if( data.status == 'already_exists' ){
        data.name = data.name + ' (we got that already)';
      }
      $scope.currentfood = data;
    }).error(function(data) {
      console.log('Error: ' + data);
    });
  };

  $scope.next = function() {

    ga('send', 'event', 'foods', 'next');

    console.log('Next '+$scope.limit);

    var apiUrl = '/api/randomfood';
    if( $scope.user && $scope.limit ){
      console.log('Current user '+$scope.user.id)
      apiUrl = apiUrl + '?accessToken='+$scope.accessToken;
    }

    $http.get(apiUrl, $scope.formData)
      .success(function(data) {
        $scope.currentfood = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };
}



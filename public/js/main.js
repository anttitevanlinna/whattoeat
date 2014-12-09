
var foods = angular.module('foods', ['facebook','ngRoute'])
foods.config(
  ['FacebookProvider','$routeProvider', 
    function(FacebookProvider, $routeProvider) { // , FacebookProvider
      FacebookProvider.init('785659141493231');
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

function foodController($scope, $http, Facebook) {

}

function mainController($scope, $http, Facebook) {

  $http.get('/api/randomfood').success(function(data) {
    $scope.currentfood = data;
  }).error(function(data) {
    console.log('Error: ' + data);
  });

  $scope.formData = {};
  $scope.loginStatus = 'disconnected';
  $scope.facebookIsReady = false;
  $scope.user = null;
  
  
  $scope.login = function () {
    Facebook.login(function(response) {
      $scope.loginStatus = response.status;
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
            var accessToken = response.authResponse.accessToken;
            $scope.loginStatus ='connected';
            $scope.api();            
          } else if (response.status === 'not_authorized') {
            // the user is logged in to Facebook, 
            // but has not authenticated your app
          } else {
            // the user isn't logged in to Facebook.
          }
        });
      $scope.facebookIsReady = true;
    }
  });

  $scope.add = function() {
    var food = $('input[name=food]').val();
    var formData = {
      'food': food,
      'user': $scope.user.first_name,
      'uid': $scope.user.id
    };
    $http.post('/api/add', formData)
    .success(function(data) {
      console.log(data);
      if( data.status == 'already_exists' ){
        data.name = data.name + ' (we got that already)';
      }
      $scope.currentfood = data;
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  };

  $scope.next = function() {
    $http.get('/api/randomfood', $scope.formData)
    .success(function(data) {
      $scope.currentfood = data;
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  };
}



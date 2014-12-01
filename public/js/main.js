var foods = angular.module('foods', ['facebook']).config(
  function(FacebookProvider) {
    FacebookProvider.init('785659141493231');
  });

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
      console.log(response.status);
    });
  };
  
  $scope.api = function () {
    Facebook.api('/me', function(response) {
      $scope.user = response;
    });
  };
  
  $scope.$watch(function() {
    return Facebook.isReady();
  }, function(newVal) {
    if (newVal) {
      $scope.facebookIsReady = true;
    }
  });

  $scope.add = function() {
    var food = $('input[name=food]').val();
    var formData = {
      'food' 				: food,
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

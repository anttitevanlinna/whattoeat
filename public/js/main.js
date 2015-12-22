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
                templateUrl : 'why.html'
      });
      $routeProvider.when('/code', {
                templateUrl : 'code.html'
      });
      $routeProvider.otherwise( {
                templateUrl : 'yesno.html',
                controller  : 'mainController'
      });
   }])

foods.run(['$http', function($http) {
  $http.get('/api/fbconfig/').success(function(data) {
    console.log('initing FB with '+data);
    fbProvider.init(data);
  }).error(function(data) {
    console.log('Error: ' + data);
  });
}]);

function mainController($scope, $http, Facebook) {

  $http.get('/api/randomfood').success(function(data) {
    $scope.$parent.currentfood = data;
  }).error(function(data) {
    console.log('Error: ' + data);
  });
  $scope.formData = {};
  $scope.hideTip = true;
  console.log('mainController.init');

  $scope.updateCount = function(){
    console.log('count');
    if($scope.accessToken){
      $http.get('api/count'+'?accessToken='+$scope.accessToken)
        .success(function(data) {
          $scope.count = data;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });      
    }else{
      $scope.count = 0;      
    }
  }

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
            console.log('fb ready');
            $scope.accessToken = response.authResponse.accessToken;
            $scope.api();        
            $scope.updateCount();    
          } else if (response.status === 'not_authorized') {
            // the user is logged in to Facebook, 
            // but has not authenticated your app
          } else {
            // the user isn't logged in to Facebook.
          }
        });
    }
  });

  $scope.$watch("limit", function(newVal) {
    if (newVal) {
      console.log('limiting, doing next');
      $scope.next();
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
      $scope.$parent.currentfood = data;
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
        $scope.$parent.currentfood = data;
        $scope.hideTip = false;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };
}
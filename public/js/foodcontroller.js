function foodController($scope, $http, Facebook) {

    ga('send', 'event', 'foods', 'view');

	console.log('foodController.init '+$scope.currentfood.name);

	var queryString = window.encodeURIComponent($scope.currentfood.name);

	$http.get('/api/query?q='+queryString)
	    .success(function(data) {
	      $scope.foodlist = data;
	    })
	    .error(function(data) {
	      console.log('Error: ' + data);
	});
}

var foods = angular.module('foods', []);

function mainController($scope, $http) {
    $scope.formData = {};

    $http.get('/api/randomfood')
        .success(function(data) {
            $scope.currentfood = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.add = function() {
        var formData = {
					'food' 				: $('input[name=food]').val(),
				};
        console.log(formData);
        $http.post('/api/add', $scope.formData)
            .success(function(data) {
                console.log(data);
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

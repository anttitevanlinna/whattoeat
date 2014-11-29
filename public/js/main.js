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
        var food = $('input[name=food]').val();
        var formData = {
					'food' 				: food,
				};
        console.log(formData);
        $http.post('/api/add', formData)
            .success(function(data) {
                $scope.currentfood = data;
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

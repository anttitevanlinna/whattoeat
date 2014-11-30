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

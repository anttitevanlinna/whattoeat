var foods = angular.module('foods', []);

function mainController($scope, $http) {
    $scope.formData = {};

    $http.get('/api/randomfood')
        .success(function(data) {
            $scope.currentfood = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.addFood = function() {
        $http.post('/api/addfood', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear 
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}

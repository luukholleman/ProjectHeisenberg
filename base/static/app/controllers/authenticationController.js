angular.module('punktlichDep').controller('AuthenticationController', function($scope) {
    $scope.punktlich = true;

    $scope.authenticate = function (){
      authenticate('login');
    };

    $scope.register = function () {
      register();
    };
});

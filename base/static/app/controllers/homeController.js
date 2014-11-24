angular.module('punktlichDep').controller('HomeController', function ($scope, $http, UserModel) {
    $http.get(apiBase + 'get-authenticated-user').success(function(data){
        $scope.user = data;
    });

});

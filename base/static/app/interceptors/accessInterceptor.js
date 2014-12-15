angular.module('punktlichDep').factory('AccessInterceptor', function ($q, $rootScope) {
    return {
        'responseError': function (rejection) {

            // check if the server throws a 401 broadcast that the user is invalid
            if (rejection.status == 401) {
                $rootScope.$broadcast('unauthorizedRequest');
            }

            // do something on error
            return $q.reject(rejection);
        }
    };
});


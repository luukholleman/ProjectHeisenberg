angular.module('punktlichDep').factory('UserModel', function ($resource) {
    return $resource(apiBase + 'users/:id');
});

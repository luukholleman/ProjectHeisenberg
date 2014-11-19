angular.module('punktlichDep').factory('UserModel', function ($resource) {
    function getById(id){
        $resource(apiBase+'users/:id');
    }
    function getByCredentials(email, password){
        $resource(apiBase+'users/')
    }

    return $resource(apiBase + 'users/:id');
});

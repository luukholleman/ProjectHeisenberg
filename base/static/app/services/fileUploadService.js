angular.module('punktlichDep').service('FileUploadService', ['$http', function ($http) {
    this.uploadToUrl = function (file, uploadUrl, success, failure) {
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        });
    }
}]);
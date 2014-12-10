angular.module('punktlichDep').factory('AttachmentModel', function (Restangular) {
    Restangular.extendModel('attachments', function (attachment) {
        return attachment;
    });

    return Restangular.service('attachments');
});
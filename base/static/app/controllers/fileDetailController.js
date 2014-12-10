angular.module('punktlichDep').controller('AttachmentDetailController', function ($scope, $stateParams, AttachmentModel) {
    var id = $stateParams.attachmentid;

    console.log(id);
    AttachmentModel.one(id).get().then(function (data) {
        console.log(data);
    });

    //@todo
});
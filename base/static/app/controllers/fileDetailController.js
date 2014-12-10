angular.module('punktlichDep').controller('MinutesDetailController', function ($scope) {
    //@todo
});

angular.module('punktlichDep').controller('AgendaDetailController', function ($scope) {
    //@todo
});

angular.module('punktlichDep').controller('AttachmentDetailController', function ($scope, $stateParams, AttachmentModel) {
    var id = $stateParams.attachmentid;

    console.log(id);
    AttachmentModel.one(id).get().then(function (data) {
        console.log(data);
    });

    //@todo
});
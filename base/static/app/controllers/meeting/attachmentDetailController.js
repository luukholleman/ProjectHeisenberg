angular.module('punktlichDep').controller('AttachmentDetailController', function ($scope, $stateParams, $window) {
    if ($scope.meeting)
        $scope.attachment = $scope.meeting.one('attachments', $stateParams.attachmentid).get().$object;
    else
        $scope.$on('meeting.loaded', function (event, data) {
            $scope.attachment = data.meeting.one('attachments', $stateParams.attachmentid).get().$object;
        });

    $scope.download = function(path) {
        $window.open(path);
    };

    $scope.saveFilename = function(name) {
        $scope.attachment.patch({file_name: name});
    };
});
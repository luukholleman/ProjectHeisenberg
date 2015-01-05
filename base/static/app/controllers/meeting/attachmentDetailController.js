angular.module('punktlichDep').controller('AttachmentDetailController', function ($scope, $controller, $stateParams, $window) {
    $controller('FileDetailController',{$scope: $scope});


    $scope.$on('meeting.loaded', function(event, data){
        $scope.attachment = data.meeting.one('attachments', $stateParams.attachmentid).get().$object;
        console.log('loaded!!!', data.meeting);
    });
    //$scope.attachment = _.findWhere($scope.attachments, {id: $stateParams.attachmentid});
    //console.log('att', $scope.attachments, $scope.attachment, $stateParams.attachmentid);
});
angular.module('punktlichDep').controller('MeetingCreateController', function ($scope, $location, $routeParams, Restangular, MeetingService, ValidationService) {

    $scope.meeting = {};

    $scope.groups = [
        'Windesheim',
        'Gumbo Millenium',
        'Gemeente Zwolle'
    ];

    var box = document.getElementById('filter-box');

    Restangular.all('users').getList().then(function(users){
        box.setData(_.each(_.toArray(users), function(user){
            user.meta = {
                id: user.id,
                img: "http://lorempixel.com/24/24/people",
                name: user.first_name + " " + user.last_name,
                show: true
            };
        }));
    });

    $scope.save = function(form) {
        $scope.meeting.invitations = _.map($scope._invitations, function(participant){
            return {user: participant.id};
        });

        MeetingService.create($scope.meeting, function(data){
            $location.path('meeting/'+data.id+'/update');
        }, function(errors){
            ValidationService.showErrors(form, errors.data)
        });
    };

    box.addEventListener('core-activate', function(){
        $scope._invitations = box.getSelection();

        $scope.$apply();
    });
});

angular.module('punktlichDep').controller('MeetingUpdateController', function($scope, MeetingService, Restangular, $stateParams, ValidationService){
    var box = document.getElementById('filter-box');

    $scope.groups = [
        'Windesheim',
        'Gumbo Millenium',
        'Gemeente Zwolle'
    ];

    MeetingService.get($stateParams.id).get().then(function(data){
        $scope.meeting = data;

        Restangular.all('users').getList().then(function(users){
            box.setData(_.each(_.toArray(users), function(user){
                user.meta = {
                    id: user.id,
                    img: "http://lorempixel.com/24/24/people",
                    name: user.first_name + " " + user.last_name,
                    show: true
                };
            }));

            box.setSelected($scope.meeting.invitations, function(listItem, invitation){
                return listItem.meta.id == invitation.user;
            });
        });

    });

    $scope.save = function(form) {
        $scope.meeting.invitations = _.map($scope._invitations, function(participant){
            return {user: participant.id};
        });

        MeetingService.update($scope.meeting, function(){

        }, function(errors){
            ValidationService.showErrors(form, errors.data)
        });
    };

    box.addEventListener('core-activate', function(){
        $scope._invitations = box.getSelection();

        $scope.$apply();
    });
});

angular.module('punktlichDep').controller('MeetingDetailController', function($scope, $rootScope, MeetingService, MeetingModel){

    // attach eventlistener to custom polymer element
    _.each(document.querySelectorAll('.select-revision'), function(element, i) {
        element.addEventListener('revision-selection-changed', function(event) {
            console.log('loading new pdf file');
        });
    });

    $scope.loadPdf = function() {

    }
});
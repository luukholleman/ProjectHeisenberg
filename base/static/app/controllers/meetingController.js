<<<<<<< HEAD
angular.module('punktlichDep').controller('MeetingController', function($scope, $rootScope, MeetingService, MeetingModel){
    $rootScope.$on('timelineViewPortChanged', function(event, from, to){
        MeetingService.getMeetingsForTimeSpan(from, to, function(data){
            $scope.meetings = _.toArray(data);
        }, function(response){
            console.error(response);
=======
angular.module('punktlichDep').controller('MeetingController', function ($scope, $state, $routeParams, Restangular, MeetingService, ValidationService) {

    $scope.meeting = {};

    $scope.groups = [
        'Windesheim',
        'Gumbo Millenium',
        'Gemeente Zwolle',
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
            $state.go('^.update');
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
        'Gemeente Zwolle',
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
>>>>>>> feature/timeline2
        });
    });
});

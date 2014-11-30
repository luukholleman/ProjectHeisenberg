angular.module('punktlichDep').controller('MeetingController', function ($scope, $routeParams, Restangular, MeetingService) {

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

    $scope.save = function() {
        $scope.meeting.invitations = _.map($scope._participants, function(participant){
            return {user: participant.id};
        });

        $scope.meeting = MeetingService.create($scope.meeting);
    };

    box.addEventListener('core-activate', function(){
        $scope._participants = box.getSelection();

        $scope.$apply();
    });
});

angular.module('punktlichDep').controller('MeetingUpdateController', function($scope, MeetingService, Restangular, $stateParams){
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

    $scope.save = function() {
        $scope.meeting.invitations = _.map($scope._participants, function(participant){
            return {user: participant.id};
        });

        MeetingService.update($scope.meeting);
    };

    box.addEventListener('core-activate', function(){
        $scope._participants = box.getSelection();

        $scope.$apply();
    });
});

angular.module('punktlichDep').controller('MeetingController', function ($scope, Restangular) {
    $scope.groups = [
        'Windesheim',
        'Gumbo Millenium',
        'Gemeente Zwolle',
        'Faggots United'
    ];

    var box = document.getElementById('filter-box');

    var users = Restangular.all('users').getList().then(function(users){
        box.setData(_.each(_.toArray(users), function(user){
            user.meta = {
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

        console.log($scope.meeting);

        Restangular.service('meetings').post($scope.meeting);
    }

    box.addEventListener('core-activate', function(item){
        $scope._participants = box.getSelection();

        $scope.$apply();
    });
});

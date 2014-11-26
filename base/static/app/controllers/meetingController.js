angular.module('punktlichDep').controller('MeetingController', function ($scope, Restangular) {
    $scope.groups = [
        'Windesheim',
        'Gumbo Millenium',
        'Gemeente Zwolle',
        'Faggots United'
    ];

    var box = document.getElementById('filter-box');

    var users = Restangular.all('api/v1/users').getList().then(function(users){
        box.setData(_.each(_.toArray(users), function(user){
            user.meta = {
                img: "http://lorempixel.com/24/24/people",
                name: user.first_name + " " + user.last_name,
                show: true
            };
        }));
    });

    box.addEventListener('core-activate', function(item){
        $scope._participants = box.getSelection();

        $scope.$apply();
    });
});

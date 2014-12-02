angular.module('punktlichDep').service('MeetingService', function (MeetingModel) {
    function update(meeting, success, error){
        meeting.put().then(success, error);
    }

    function create(meeting, success, error){
        MeetingModel.post(meeting).then(success, error);
    }

    function getMeetingsForTimeSpan(from, to, success, error) {
        MeetingModel.getList({from: from, to: to}).then(function(data){
            success(data);
        }, function(response){
            error(response);
        });
    }

    return {
        read: function(){

        },
        update: update,
        create: create,
        get: function(id)
        {
            return MeetingModel.one(id);
        },
        getMeetingsForTimeSpan: getMeetingsForTimeSpan
    };
});
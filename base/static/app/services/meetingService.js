angular.module('punktlichDep').service('MeetingService', function (MeetingModel) {
    function update(meeting, success, error){
        meeting.put().then(success, error);
    }

    function create(meeting, success, error){
        MeetingModel.post(meeting).then(success, error);
    }

    return {
        read: function(){

        },
        update: update,
        create: create,
        get: function(id)
        {
            return MeetingModel.one(id);
        }
    };
});
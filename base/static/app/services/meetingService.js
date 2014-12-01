angular.module('punktlichDep').service('MeetingService', function (MeetingModel) {
    return {
        read: function(){

        },
        update: function(meeting){
            meeting.put();
        },
        create: function(meeting){
            MeetingModel.post(meeting);
        },
        get: function(id)
        {
            return MeetingModel.one(id);
        }
    };
});
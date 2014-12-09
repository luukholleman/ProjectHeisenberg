angular.module('punktlichDep').service('MeetingService', function (MeetingModel, Restangular) {

    Restangular.extendModel('meetings', function (meeting) {

        //@todo maybe we should create somehing generic to parse dates
        meeting.date_and_time_moment = moment(new Date(meeting.date_and_time));

        meeting.future = function () {
            return meeting.date_and_time_moment.isAfter(moment());
        };

        meeting.humanReadableDate = function () {
            return meeting.future() ? 'Starts' : 'Started' + ' ' + meeting.date_and_time_moment.fromNow();
        };

        var postFile = function (type, file, success, error) {
            var formData = new FormData();
            formData.append('file', file);
            meeting.withHttpConfig({transformRequest: angular.identity})
                .customPOST(formData, 'agenda', undefined, {'Content-Type': undefined}).then(success, error);
        };

        meeting.postAgenda = function(file, success, error) {
            postFile('agenda', file, success, error);
        };

        meeting.postMinute = function(file, success, error) {
            postFile('minute', file, success, error);
        };

        meeting.postAttachment = function(file, success, error) {
            postFile('attachment', file, success, error);
        };

        return meeting;
    });

    function update(meeting, success, error) {
        meeting.put().then(success, error);
    }

    function create(meeting, success, error) {
        MeetingModel.post(meeting).then(success, error);
    }

    function getMeetingsForTimeSpan(from, to, success, error) {
        MeetingModel.getList({from: from, to: to}).then(function (data) {
            success(data);
        }, function (response) {
            error(response);
        });
    }

    return {
        read: function () {

        },
        update: update,
        create: create,
        get: function (id) {
            return MeetingModel.one(id);
        },
        getMeetingsForTimeSpan: getMeetingsForTimeSpan,
    };
});
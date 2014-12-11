angular.module('punktlichDep').factory('MeetingModel', function (Restangular) {

    Restangular.extendModel('meetings', function (meeting) {

        //@todo maybe we should create somehing generic to parse dates
        meeting.date_and_time_moment = moment(new Date(meeting.date_and_time));

        meeting.future = function () {
            return meeting.date_and_time_moment.isAfter(moment());
        };

        meeting.humanReadableDate = function () {
            return meeting.future() ? 'Starts' : 'Started' + ' ' + meeting.date_and_time_moment.fromNow();
        };

        function createRevision(agenda) {
            test = agenda;
            return {
                file: agenda.file,
                owner: agenda.created_by,
                name: agenda.file_name,
                humanReadableDate: function () {
                    return moment(new Date(agenda.uploaded_at)).fromNow();
                }
            };
        };

        meeting.hasAgenda = meeting.agendas && meeting.agendas.length > 0;
        meeting.latestAgenda = meeting.hasAgenda ? createRevision(meeting.agendas[meeting.agendas.length - 1]) : null;

        meeting.agendaRevisions = _.map(meeting.agendas, function(agenda){
            return createRevision(agenda);
        }).reverse();

        meeting.postFile = function (type, file, success, error) {
            var formData = new FormData();
            formData.append('file', file);
            meeting.withHttpConfig({transformRequest: angular.identity})
                .customPOST(formData, 'agenda', undefined, {'Content-Type': undefined}).then(success, error);
        };

        meeting.postAgenda = function (file, success, error) {
            postFile('agenda', file, success, error);
        };

        meeting.postMinute = function (file, success, error) {
            postFile('minute', file, success, error);
        };

        meeting.postAttachment = function (file, success, error) {
            postFile('attachment', file, success, error);
        };

        return meeting;
    });

    return Restangular.service('meetings');
});
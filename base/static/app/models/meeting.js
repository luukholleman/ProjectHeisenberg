angular.module('punktlichDep').factory('MeetingModel', function (Restangular) {

    Restangular.extendModel('meetings', function (meeting) {

        meeting.getAgendaRevisions = function() {
            return meeting.all('agendas').getList().$object;
        };
        meeting.getMinutesRevisions = function() {
            return meeting.all('minutes').getList().$object;
        };

        meeting.getAttachments = function() {
            return meeting.all('attachments').getList().$object;
        };

        meeting.getInvited = function() {
            return meeting.all('invited').getList().$object;
        };

        meeting.postFile = function (type, file, success, error) {
            var formData = new FormData();
            formData.append('file', file);
            meeting.withHttpConfig({transformRequest: angular.identity})
                .customPOST(formData, type, undefined, {'Content-Type': undefined}).then(success, error);
        };

        return meeting;
    });

    return Restangular.service('meetings');
});

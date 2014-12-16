angular.module('punktlichDep').factory('FlashMessageService', function ($rootScope) {
    var currentMessage = null;

    return {
        setMessage: function (message, autoClose) {
            currentMessage = message;

            var el = document.querySelector('paper-toast');

            if(!message) {
                el.hide();
                return;
            }
            el.duration =  autoClose || typeof autoClose === 'undefined' ? 5000 : 600000;
            el.show();
        },
        getMessage: function () {
            return currentMessage;
        }
    };
});

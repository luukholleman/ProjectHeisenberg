angular.module('punktlichDep').factory('FlashMessageService', function ($rootScope) {
    var currentMessage = "";

    return {
        setMessage: function (message, autoClose) {
            autoClose = typeof autoClose !== 'undefined' ? autoClose : true;

            currentMessage = message;
            var el = document.querySelector('paper-toast');
            el.duration = autoClose == true ? 5000 : 600000;
            el.show();


        },
        getMessage: function () {
            return currentMessage;
        }
    };
});

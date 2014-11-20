angular.module('punktlichDep').factory('FlashMessageService', function ($rootScope) {
    //var queue = [];
    var currentMessage = "";

    //$rootScope.$on("$routeChangeSuccess", function () {
        //currentMessage = queue.shift() || undefined;
    //});

    return {
        setMessage: function (message) {
            //if (!currentMessage) {
                currentMessage = message;
                document.querySelector('paper-toast').show();
            //}
            //else {
                //queue.push(message);
            //}
        },
        getMessage: function () {
            return currentMessage;
        }
    };
});

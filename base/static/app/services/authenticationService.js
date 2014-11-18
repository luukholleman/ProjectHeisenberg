app.factory('authenticate', function (window) {
    return function (msg) {
        window.alert(msg);
    };
});

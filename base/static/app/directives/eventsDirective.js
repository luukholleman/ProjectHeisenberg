angular.module('punktlichDep').directive('ngEvents', function ($parse, $rootScope) {
    return {
        restrict: 'A',
        compile: function ($element, attr) {
            return function ngEventHandler(scope, element) {
                attr['ngEvents'].split(' ').forEach(function (evname) {
                    var directive = 'on' + function (string) {
                            return string.charAt(0).toUpperCase() + string.slice(1);
                        }(evname);
                    var fn = $parse(attr[directive], null, true);

                    element.on(evname, function (event) {
                        var callback = function () {
                            fn(scope, {$event: event});
                        };
                        if ($rootScope.$$phase) {
                            scope.$evalAsync(callback);
                        } else {
                            scope.$apply(callback);
                        }
                    });
                });
            };
        }
    };
});
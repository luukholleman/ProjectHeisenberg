angular.module('punktlichDep').directive('plSubmit', function ($parse, $rootScope) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            if (attrs['ngSubmit']) {
                var fn = $parse(attrs['ngSubmit'], null, true);
                _.forEach(element[0].querySelectorAll('input'), function (input) {
                    input.addEventListener('keypress', function (e) {
                        if (e.which == 10 || e.which == 13) {
                            e.preventDefault();

                            var callback = function () {
                                fn(scope, {$event: event});
                            };
                            if ($rootScope.$$phase) {
                                scope.$evalAsync(callback);
                            } else {
                                scope.$apply(callback);
                            }
                        }
                    });
                });
            }
        }
    };
});
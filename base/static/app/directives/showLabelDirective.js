angular.module('punktlichDep').directive('plShowLabel', function ($parse, $rootScope) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element[0].labelVisible = false;
        }
    };
});
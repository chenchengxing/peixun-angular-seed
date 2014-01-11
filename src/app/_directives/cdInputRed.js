define(['app'], function (app) {
    app.registerDirective('cdInputRed', ['$rootScope', function ($rootScope) {
        return {
            link: function (scope, element, attrs) {
                element.css("background-color", "red");
            }
        };
    }]);
});
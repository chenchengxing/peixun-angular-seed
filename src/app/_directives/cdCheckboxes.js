define(['app'], function (app) {
    app.registerDirective('cdCheckboxes', ['$rootScope', function ($rootScope) {
        return {
            link: function (scope, element, attrs) {
                var checkName = attrs.cdCheckboxesName;
                var checked = element.find('checkbox');
                scope.formData = scope.formdata || {};
                scope.formData[checkName] = scope.formData[checkName] || {};
                scope.formData[checkName].arr = [];
                angular.forEach(checked, function (ele, index) {
                    scope.formData[checkName].arr.push(ele.value);
                    scope.formData[checkName].text = join(',', scope.formData[checkName].arr);
                });
                console.log(scope.formData[checkName].arr);
            }
        };
    }]);
});
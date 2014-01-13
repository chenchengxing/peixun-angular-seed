define([
    'app',
    '../_directives/checklistModel'
    ], function ( app ) {
        app.registerController( 'CtrlDemoForm', [ '$scope' , function ( $scope ) {
            // $scope.colors = ['red', 'blue', 'green'];
            $scope.colors = ['red', 'green', 'blue', 'yellow'];
            $scope.genders = ['male', 'female'];

            $scope.simpleForm = {
                inputText : 'some init text~',
                inputCheckbox : ['blue', 'red'],
                inputRadio: 'male'
            };
            $scope.alertValues = function () {
                var text = 'the form values as: \n';
                angular.forEach($scope.simpleForm, function (value, key) {
                    text += key + " : " + value + "\n";
                });
                alert(text);
            };
            $scope.emptyAll = function () {
                $scope.simpleForm = {
                    inputText : '',
                    inputCheckbox : [],
                    inputRadio: ''
                };
            };
        }]);
});

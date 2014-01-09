define([
    'app'
    ], function ( app ) {
        app.registerController( 'CtrlDemoForm', [ '$scope' , function ( $scope ) {
            $scope.colors = ['red', 'blue', 'green'];

            $scope.simpleForm = {
                inputText : '',
                inputCheckbox : []
            };
            $scope.alertValues = function () {
                alert("inputText value : " + $scope.simpleForm.inputText);
            };
        }]);
});
define([
    'app',
    '../_directives/cdInputRed',
    '../_directives/cdCheckboxes'
    ], function ( app ) {
        app.registerController( 'CtrlDemoForm', [ '$scope' , function ( $scope ) {
            // $scope.colors = ['red', 'blue', 'green'];
            $scope.color = {
                valText: "",
                valArry: "",
                array: ['red', 'green', 'blue'],
            };
            $scope.gender = {
                val: "",
                genders : [
                    {
                        name: 'male',
                        chosen : false
                    },
                    {
                        name: 'female',
                        chosen : false
                    }
                ]
            };

            $scope.simpleForm = {
                inputText : '',
                inputCheckbox : []
            };
            $scope.alertValues = function () {
                // alert("inputText value : " + $scope.simpleForm.inputText);
                alert($scope.gender.val);
            };
        }]);
});

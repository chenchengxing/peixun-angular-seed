define(['app'], function (app) {
  app.registerController('CtrlDemo', ['$scope', function ($scope) {
    $scope.name = "Demo Name";
    $scope.test = "test";
    if (true) {
      var i = 0;
    }
    $scope['test'] = "hehe";
  }]);
});
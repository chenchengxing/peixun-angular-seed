define([
       'app',
       '../_service/Org'
       ], function ( app ) {
  app.registerController( 'CtrlDemoHttp', [ '$scope', 'Org', function ( $scope, Org ) {
    Org.get( { ip: 'xx.xx.xx.xx' }, function ( response ) {
      console.log( response );
      if ( response.code === 200 ) {
        $scope.orgs = response.data;
      }
    });
  }]);
});
/**
 * [description]
 * this is a spec for CtrlHttp
 * use command-line 'grunt test' to run specs
 */
define( [ 'angular', 'angular-mock', './CtrlHttp' ], function ( angular ) {
  describe( 'Test for CtrlHttp', function () {
    beforeEach( function () {
      module( 'app' ); //mock app
    });
    var Ctrl, scope;
    // Initialize the controller and a mock scope
    beforeEach( inject( function ( $rootScope, $controller ) {
        scope = $rootScope.$new();
        Ctrl = $controller( 'CtrlHttp', { $scope:scope } );
    }));
    // spec code here
    it('should attach a list of awesomeThings to the scope', function () {
        expect(true).toBeTruthy();
    });

  });
});
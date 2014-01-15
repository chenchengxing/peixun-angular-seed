define( [ 'angular', 'angular-mock', './Org' ], function () {

  describe( '[http service] Org Spec', function () {
    beforeEach(function () {
      module( 'app' );
    });
    var MainCtrl, scope, org, rootScope;
    var urlReg = /\.\.\/jsondata\/orgs\.json/;

    beforeEach(inject(function( Org, _$httpBackend_, $rootScope ) {
      rootScope = $rootScope;
      org = Org;
      $httpBackend = _$httpBackend_;
    }));

    it( 'should pass in [id] as it\'s parameter', function () {
      //without id
      org.get( { ip: 'xxx22' }, function ( result ) {
        expect( result.code ).toBe( 404 );
      });
      //with id
      $httpBackend.expectGET( urlReg ).respond( { code: 200 } );
      org.get( { id: 'xxx22' }, function ( result ) {
        expect( result.code ).toBe( 200 );
      });
      if( !rootScope.$$phase ) {
        rootScope.$apply();    //AngularJS 1.1.4 fix
      }
      $httpBackend.flush();
    });
  });
  
});
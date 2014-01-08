

define(['angular', 'angular-mock', './Org'], function (angular, couchPotato) {

  describe('xxx', function () {
    // body...
    beforeEach(function (argument) {
      // angular.module('app', ['scs.couch-potato', 'ui.router', 'ui.bootstrap', 'ui.bootstrap.tpls', 'chieffancypants.loadingBar', 'app-templates'])
      module('app');
    });
    var MainCtrl, scope, org, rootScope;

      beforeEach(inject(function(Org, _$httpBackend_, $rootScope) {
            rootScope = $rootScope;
            org = Org;
            $httpBackend = _$httpBackend_;
        }));

        it('httppp', function() {
            $httpBackend.expectGET(/\.\.\/jsondata\/orgs\.json/).respond({code: 403});
            org.get( { pageNo: 1 }, function (result) {
                expect(result).toBeTruthy();
            });
            if(!rootScope.$$phase) {
              rootScope.$apply();    //AngularJS 1.1.4 fix
            }
            $httpBackend.flush();
        });
  });


});
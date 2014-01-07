define(['app'], function (app) {
  app.registerFactory('Org', ['$http', function ($http) {
    return {
      /**
       * get orgnization list
       * @param  {Object} paramObj pageSize,pageNo
       * @param  {Fuction} cbfn     callback function
       * @return {void}          no return
       */
      get: function ( paramObj, cbfn ) {
        angular.extend( paramObj, { _: new Date().getTime() } );//ie cache
        return $http({
          method: 'get',
          url: '../jsondata/orgs.json',
          // url: '/platform/getOrgList', //should switch to real url
          params : paramObj
        }).success(function ( result ) {
          cbfn( result );
        });
      }
    };
  }]);
});
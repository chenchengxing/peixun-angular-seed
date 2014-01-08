define(['app'], function(app) {
  app.registerProvider(
    'routeDefs',
    [
      '$stateProvider',
      '$urlRouterProvider',
      '$couchPotatoProvider',
      function (
        $stateProvider,
        $urlRouterProvider,
        $couchPotatoProvider
      ) {

        this.$get = function() {
          // this is a config-time-only provider
          // in a future sample it will expose runtime information to the app
          return {};
        };
        // $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/');

        $stateProvider
          .state('home', {
            url: '/',
            views: {
              'leftNav' : {
                templateUrl: 'common/home.leftNav.tpl.html'
              },
              'main' : {
                templateUrl: 'common/home.main.tpl.html',
              }
            }
          })
          .state('demo', {
            url: '/demo',
            views: {
              'leftNav' : {
                templateUrl: 'demo/leftNav.tpl.html'
              },
              'main' : {
                templateUrl: 'demo/demo.tpl.html',
                controller: 'CtrlDemo'
              }
            },
            resolve: {
              dummy: $couchPotatoProvider.resolveDependencies(['demo/CtrlDemo'])
            }
          })
          .state('demo.http', {
            url: '/http',
            views: {
              'demoContainer' : {
                templateUrl: 'demo/demo.http.tpl.html',
                controller: 'CtrlDemoHttp'
              }
            },
            resolve: {
              dummy: $couchPotatoProvider.resolveDependencies(['demo/CtrlDemoHttp'])
            }
          })
          .state('demo.form', {
            url: '/http',
            views: {
              'demoContainer' : {
                templateUrl: 'demo/demo.form.tpl.html',
                controller: 'CtrlDemoForm'
              }
            },
            resolve: {
              dummy: $couchPotatoProvider.resolveDependencies(['demo/CtrlDemoForm'])
            }
          });
      }
    ]
  );
});

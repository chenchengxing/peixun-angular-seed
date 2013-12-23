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
            template: '<p class="lead">欢迎来到百度教育！</p><p>左侧是您的导航</p>' +
              '<p>试试 创建课程 或 创建直播 来开启您的百度教育之旅<' + '/p>'
          })
          .state('demo', {
            url: '/demo',
            templateUrl: 'demo/demo.tpl.html',
            controller: 'CtrlDemo',
            resolve: {
              dummy: $couchPotatoProvider.resolveDependencies(['demo/CtrlDemo'])
            }
          });
        
      }
    ]
  );
});

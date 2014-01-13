// Anything required here wil by default be combined/minified by r.js
// if you use it.
define(['app', 'routeDefs'], function(app) {
  app.factory('myHttpInterceptor',['$q','$log', '$rootScope', function ($q, $log, $rootScope) {
    var errorModalFlag = false;
    return function (promise) {
        return promise.then(function (response) {
            return response;
        }, function (response) {
            // do something on error
            $log.info(response);
            if ( !errorModalFlag && !$rootScope.isDev) {
                errorModalFlag = true;
                var $modal = $("<div class=\"modal hide\">\n" +
       "  <div class=\"modal-header\">\n" +
       "    <h3>系统异常</h3>\n" +
       "  </div>\n" +
       "  <div class=\"modal-body\">\n" +
       "    <p>您当前操作的请求出现了异常，您可以选择下面的操作。</p>\n" +
       "  </div>\n" +
       "  <div class=\"modal-footer\">\n" +
       "    <a class=\"btn btn-system-error-stay\">留在当前页</a>\n" +
       "    <a class=\"btn btn-primary btn-system-error-backhome\">返回系统首页</a>\n" +
       "  </div>\n" +
       "</div>").appendTo($("body"));
                var $backdrop = $('<div class="modal-backdrop in" ng-class="{in: animate}" style="z-index: 1040;"></div>');
                $backdrop.appendTo($("body"));
                $(".btn-system-error-stay").on('click', function () {
                    $modal.remove();
                    $backdrop.remove();
                    errorModalFlag = false;
                });
                $(".btn-system-error-backhome").on('click', function () {
                    location.href = "#";
                    $modal.remove();
                    $backdrop.remove();
                    errorModalFlag = false;
                });
                $modal.fadeIn(500);
            }

            return $q.reject(response);
        });
    };
  }]);
  app.config(['routeDefsProvider', '$httpProvider', function(routeDefsProvider, $httpProvider ) {

    // in large applications, you don't want to clutter up app.config
    // with routing particulars.  You probably have enough going on here.
    // Use a service provider to manage your routing.

    //post header setting to make it work
    $httpProvider.defaults.headers.post = {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With':'XMLHttpRequest'
    };

    //put header setting to make it work
    $httpProvider.defaults.headers.put = {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With':'XMLHttpRequest'
    };

    //disable IE ajax request caching
    $httpProvider.defaults.headers.get = $httpProvider.defaults.headers.get || {};
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';

    $httpProvider.responseInterceptors.push('myHttpInterceptor');
  }]);
  app.config(['$compileProvider', function($compileProvider){
      //unsafe url 处理，不然在href标签上会加上 unsafe：xxx
      // $compileProvider.urlSanitizationWhitelist(/^\s*((https?|ftp|mailto|tel):)|#/);
  }]);
  app.run([
    '$couchPotato', '$state', '$stateParams', '$rootScope',
    function($couchPotato, $state, $stateParams, $rootScope) {

      // by assigning the couchPotato service to the lazy property, we
      // the register functions will know to run-time-register components
      // instead of config-time-registering them.
      app.lazy = $couchPotato;

      // angular-ui-project recommends assigning these services to the root
      // scope.  Others have argued that doing so can lead to obscured
      // dependencies and that making services directly available to html and
      // directives is unclean.  In any case, the ui-router demo assumes these
      // are available in the DOM, therefore they should be on $rootScope.
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;

    }
  ]);
  app.run(['$templateCache', function ($templateCache) {
    $templateCache.put("ConfirmModalContent.html",
        "<div class=\"modal-header\">\n" +
   "        <h3>{{title}}</h3>\n" +
   "    </div>\n" +
   "    <div class=\"modal-footer\">\n" +
   "        <button class=\"btn btn-primary\" ng-click=\"ok()\">确认</button>\n" +
   "        <button class=\"btn btn-warning\" ng-click=\"cancel()\" ng-show=\"showCancel\">取消</button>\n" +
   "    </div>");
    // var msie = parseInt((/msie (\d+)/.exec((navigator.userAgent).toLowerCase()) || [])[1], 10);
    //     if (msie || msie < 9) {

        // }

}]);
  // app.directive('input', ['$rootScope', function ($rootScope) {
  //     return {
  //       restrict: "E",
  //       link: function (scope, element, attrs) {
  //           element.css("backgroundColor", "red");
  //       }
  //     }
  // }])
  app.directive('pxJspinject', ['$rootScope', function ($rootScope) {
    return {
        restrict: "EA",
        link : function (scope, element, attrs) {
            $rootScope.JSP_VALUE = $rootScope.JSP_VALUE || {};
            $rootScope.JSP_VALUE[attrs.pxJspinject] = element.val();
        }
    };
  }]);
  app.controller('CtrlApp', ['$scope', '$http', '$rootScope', '$timeout', function ($scope, $http, $rootScope, $timeout) {
        var msie = parseInt((/msie (\d+)/.exec((navigator.userAgent).toLowerCase()) || [])[1], 10);
        if (msie || msie < 9) {
            $timeout(function () {
                $(".accordion-group:last .accordion-inner").css("borderBottom", "1px solid #e5e5e5");
            }, 100);
        }


        $http({
            method : "get",
            url : "/platform/rs/login/user"
        }).success(function (data, status) {
            // body...
            if ( ~~sstatus === 200) {
                $scope.username = data.data.username;
            }
            // {"message":"操作成功！","data":{"username":"M_2013"},"code":200}
        });

        /*配置测试的jsp注入的地址，这些地址在程序运行时会被正确覆盖*/
        $rootScope.JSP_VALUE = {
            AuthSettingUrl: "http://m1-ite-taoli17.m1.baidu.com:8058",
            ZhixinSiteUrl: "http://jiaoyu.px.baidu.com:8875/xuetang"
        };


        $rootScope.msie = msie;
        // $rootScope.navOpenItem = "站点管理";
        // $scope.setActiveNavItem = function (text) {
        //     $rootScope.navActiveItem = text;
        // }
        $http({
            method: 'get',
            url: '/platform/side_json.jsp'
        })
        .success(function (response) {
            // 特殊的处理
            try {
                response.splice(response.length - 1, 1);
                for (var i = response.length - 1; i >= 0; i--) {
                    response[i].items.splice(response[i].items.length - 1, 1);
                }

                $rootScope.navData = response;
            } catch(e) {
                setDevNav();
            }

        })
        .error( function (data, status) {
            setDevNav();
        });
        function setDevNav () {
            $rootScope.isDev = true;
            $http({
                method: 'get',
                url: '/platform/src/app/devNav.json'
            }).success(function (response) {
                $rootScope.navData = response;
            });

        }

    }]);




});


require.config({

  // baseUrl: 'app',

  paths: {

    'angular'               : '../../vendor/angular/angular',
    'angular-ui-router'     : '../../vendor/angular/angular-ui-router',
    'angular-couch-potato'  : '../../vendor/angular/angular-couch-potato',
    'angular-ui-bootstrap'  : '../../vendor/angular/ui-bootstrap-tpls-0.6.0',
    'angular-loading-bar'   : '../../vendor/angular-loading-bar/loading-bar',
    'app-templates'         : './app-templates'
  },

  shim: {

    'angular': {
      exports   : 'angular'
    },

    'angular-couch-potato': {
      deps :['angular']
    },
    'angular-ui-router': {
      deps      : ['angular']
    },

    'angular-ui-bootstrap' : {
      deps      : ['angular']
    },

    'angular-loading-bar': {
      deps      : ['angular']
    },

    'app-templates': {
      deps      : ['angular']
    }

  }

});

// run is required to force the app to run, not because we need to interact
// with it.  Anything required here will by default be combined/minified by
// r.js if you use it.
require(['app', 'angular', 'app-init'], function(app, angular) {

  angular.element(document).ready(function() {

    angular.bootstrap(document, [app['name'], function() {

      // for good measure, put ng-app on the html element
      // studiously avoiding jQuery because angularjs.org says we shouldn't
      // use it.  In real life, there are a ton of reasons to use it.
      // karma likes to have ng-app on the html element when using requirejs.
      angular.element(document).find('html').addClass('ng-app');

    }]);

  });

});
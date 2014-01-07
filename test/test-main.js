
require.config({

  baseUrl: 'base/src/app',

  paths: {

    'angular'               : '../../vendor/angular/angular',
    'angular-ui-router'     : '../../vendor/angular/angular-ui-router',
    'angular-couch-potato'  : '../../vendor/angular/angular-couch-potato',
    'angular-ui-bootstrap'  : '../../vendor/angular/ui-bootstrap-tpls-0.6.0',
    'angular-loading-bar'   : '../../vendor/angular-loading-bar/loading-bar',
    'angular-mock'          : '../../vendor/angular/angular-mocks',
    'app-templates'         : './app-templates'
  },

  shim: {

    'angular': {
      exports   : 'angular' 
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

    'angular-mock': {
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
require(['app', 'angular', 'angular-mock', 'app-init', 'angular-couch-potato', 'demo/CtrlDemo.spec', '_service/Org.spec'], function(app, angular) {

  window.__karma__.start();

});
/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
  /**
   * The `build_dir` folder is where our projects are compiled during
   * development and the `compile_dir` folder is where our app resides once it's
   * completely built.
   */
  build_dir: 'build',
  vendor_files: {
    js: [
      'vendor/angular/angular.js',
      'vendor/angular/angular-ui-router.js',
      'vendor/angular/ui-bootstrap-tpls-0.6.0.js',
      'vendor/angular/angular-couch-potato.js',
      'vendor/angular-loading-bar/loading-bar.js',
      'vendor/requirejs/require.js'
    ],
    css: [
      'vendor/angular-loading-bar/loading-bar.css'
    ],
    assets: [
    ]
  },
}
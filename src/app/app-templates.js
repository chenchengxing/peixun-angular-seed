angular.module('app-templates', ['demo/demo.tpl.html']);

angular.module("demo/demo.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("demo/demo.tpl.html",
    "<h1>this is the demo feature</h1>\n" +
    "<div>\n" +
    "  \n" +
    "  {{name}}\n" +
    "</div>");
}]);
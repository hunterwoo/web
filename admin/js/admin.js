/**
 * Created by keziyuan on 2015/12/30.
 */

'use strict';
var admin = angular.module("admin", [
    "ui.router",
    "angular-loading-bar",
    "ngAnimate",
    "ui.bootstrap",
    "oc.lazyLoad",
    "vButton",
    "Showdown",
    "ngCookies",
    "ngSweetAlertFull",
    "ngSanitize",
    "akoenig.deckgrid",
    "tc.chartjs"
]).run(["$rootScope", "$state", "$stateParams", "loginService", "$templateCache",
    function ($rootScope, $state, $stateParams, loginService, $templateCache) {
        $rootScope.title = "Blog";
        var nav = navigator.userAgent.toLowerCase();//--返回代表浏览器名和版本号的字符串--
        $rootScope.isWeixin = "micromessenger" == nav.match(/MicroMessenger/i);//--微信浏览器--
        $rootScope.isiOSChrome = "crios" == nav.match(/CriOS/i);//--iPhone下的Chrome浏览器--
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.loginService = loginService;
        $rootScope.$on('$stateChangeStart', function (evt, toState, toParams, fromState) {
            $state.toParams = toParams;
            $state.toState = toState;
        })
        $rootScope.$on('$stateChangeSuccess', function (evt, toState, toParams, fromState) {
        });
        $templateCache.put("template/nav/accordionGroup.html",
            "<li ng-class='{active:isOpen}' ui-sref-active='current-page'>\n" +
            "<a class=\"accordion-toggle a\" ng-click=\"toggleOpen()\" uib-accordion-transclude=\"heading\"><span>{{heading}}</span></a>\n" +
            "<div class=\"collapse\" uib-collapse=\"!isOpen\" ng-transclude></div>\n" +
            "</li>\n" +
            "");
        $templateCache.put("template/nav/accordion.html",
            "<div class=\"nav side-menu\" ng-transclude></div>");
    }]);

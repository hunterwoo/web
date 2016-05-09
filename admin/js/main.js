/**
 * Created by keziyuan on 2016/1/27.
 */
/**
 * Created by keziyuan on 2015/12/30.
 */

var libsPath = '/libs/';
var mustPath = '/libs/must/';
var basePath = '';
var common = '/common/';

require.config({
    baseUrl: 'js',
    skipDataMain: true,
    urlArgs: "v=",// + new Date().getTime(),
    waitSeconds: 0,
    paths: {
        'domReady': libsPath + "domReady",
        "jquery": libsPath + "jquery",
        "bootstrap": libsPath + "bootstrap",
        "jquery.actual": libsPath + "jquery.actual",
        "metro": libsPath + "metro",
        "jqueryUI": libsPath + "jquery-ui",
        "angular": libsPath + "angular",
        "angular-ui-router": libsPath + "angular-ui-router",
        "ct-ui-router-extras": libsPath + "ct-ui-router-extras",
        "ocLazyLoad": libsPath + "/ocLazyLoad.require",
        "ngCookies": libsPath + "angular-cookies",//--cookies--
        "angular-sanitize": libsPath + "angular-sanitize",
        "angular-mocks": libsPath + "angular-mocks",
        "ui.bootstrap": libsPath + "ui-bootstrap-tpls",
        "ngAnimate": libsPath + "angular-animate",
        "angular-translate": libsPath + "angular-translate",
        "angular-translate-loader-static-files": libsPath + "angular-translate-loader-static-files",

        "vButton": libsPath + "v-button",
        "xeditable": libsPath + "/xeditable",
        "ng-file-upload": libsPath + "ng-file-upload",
        "scrollreveal": libsPath + "scrollreveal",
        "cgBusy": libsPath + "angular-busy",
        "angular-loading-bar": libsPath + "loading-bar",

        "angular-summernote": libsPath + "angular-summernote",
        "summernote": libsPath + "summernote",

        "akoenig.deckgrid": libsPath + "angular-deckgrid",

        "textAngular": libsPath + "textAngular",//--与angular-ui-routes--冲突--
        "textAngular-rangy.min": libsPath + "textAngular-rangy.min",

        "ngTable": libsPath + "ng-table",

        "sweet-alert": libsPath + "sweet-alert",
        "ngSweetAlertFull": libsPath + "ngSweetAlertFull",

        "angular-validation": libsPath + "angular-validation",

        "tc.chartjs": libsPath + "tc-angular-chartjs",//--已经和chart.js合并--
        "Chart": libsPath + "Chart",

        "angular.easypiechart": libsPath + "angular.easypiechart",//--已经和chart.js合并--

        "scroll": common + "directive/scroll",
        "angular-scroll-animate": libsPath + "angular-scroll-animate",

        'angular-must': mustPath + 'angular-must',
        'admin': 'admin'

    },
    shim: {
        "jquery": {exports: "jquery"},
        "jquery.actual": {deps: ["jquery"]},
        "jqueryUI": {deps: ["jquery"], exports: "jqueryUI"},
        "metro": {deps: ["jquery"], exports: "metro"},

        "angular": {deps: ["jquery"], exports: "angular"},
        'angular-must': {deps: ["angular"]},

        "angular-ui-router": {deps: ["angular"]},
        "ct-ui-router-extras": {deps: ["angular"]},
        "ngCookies": {deps: ["angular"]},
        "ocLazyLoad": {deps: ["angular"]},
        "angular-mocks": {deps: ["angular"]},
        'angular-sanitize': {deps: ["angular"], exports: 'angular-sanitize'},
        'ngAnimate': {deps: ["angular"]},
        "ui.bootstrap": {deps: ["angular"]},
        'angular-translate': {deps: ["angular"], exports: 'angular-translate'},
        'angular-translate-loader-static-files': {deps: ["angular-translate"]},

        "vButton": {deps: ["angular"]},
        'xeditable': {deps: ["angular"]},
        'cgBusy': {deps: ["angular"]},
        'angular-loading-bar': {deps: ["angular"]},

        'sweet-alert': {deps: ["jquery"], exports: "sweet-alert"},
        'ngSweetAlertFull': {deps: ["angular", "sweet-alert"]},

        'summernote': {deps: ["jquery", "bootstrap"]},
        'angular-summernote': {deps: ["angular", "summernote"]},

        'akoenig.deckgrid': {deps: ["angular"]},

        'textAngular-rangy.min': {deps: ["angular"], exports: "textAngular-rangy"},
        'textAngular': {deps: ["textAngular-rangy"]},

        'ngTable': {deps: ["angular"]},


        'ng-file-upload': {deps: ["angular"]},
        'scrollreveal': {deps: ["angular"]},
        'tc.chartjs': {deps: ["angular"]},
        'Chart': {deps: ["jquery"]},
        'angular.easypiechart': {deps: ["angular"]},

        'scrollTo': {deps: ["angular", "jquery"]},
        'angular-scroll-animate': {deps: ["angular"]}
    }
});

define([
    'require',
    'angular',
    'admin',
    'config',
    'controller',
    'directive',
    'filter',
    'interceptor',
    'service'
], function (require, angular) {
    'use strict';
    require(['domReady!'], function (document) {
        angular.bootstrap(document, ['admin']);
    });
});
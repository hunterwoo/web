/**
 * Created by keziyuan on 2016/1/28.
 */
!(function (angular, $) {

    /**
     * lazyLoad state
     * @param option 正常的state配置对象，需要lazy加载的文件 为 src 字段
     * @returns {*} 目前返回的对象中 lazyLoad 为固定，后期可以修改
     */
    var lazyLoadState = function (option) {
        if (option.src) {
            option.resolve = {
                lazyLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(option.src);
                }]
            }
        }
        return option;
    }

    angular.module('admin')
        .config(["$logProvider", function ($logProvider) {
            $logProvider.debugEnabled(!0);//--开启debug模式--
        }])
        .config(['cfpLoadingBarProvider', '$httpProvider', function (cfpLoadingBarProvider, $httpProvider) {
            //-- bar 进度条 --
            cfpLoadingBarProvider.includeSpinner = true;
            //cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Loading...</div>';
            //cfpLoadingBarProvider.latencyThreshold = 500;
            // ignore a particular $http GET:
            // $http.get('/status', {
            //    ignoreLoadingBar: true
            // });

            //$httpProvider.defaults.useXDomain = true;
            //$httpProvider.defaults.withCredentials = true;
            /* 拦截器配置 */
            $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
            $httpProvider.interceptors.push('httpInterceptor');//--拦截器--
        }])
        .config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
            var libsPath = "/libs/";
            var bower = "/bower_components/"
            $ocLazyLoadProvider.config({
                debug  : false,
                events : false,//--加载module的事件冒泡--
                modules: [{
                    name : 'akoenig.deckgrid',
                    files: [bower + "angular-deckgrid/angular-deckgrid.js", libsPath + 'css/deckgrid.css']
                }]
            });
        }])
        .config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/");
            $stateProvider
                .state('home', lazyLoadState({
                    url        : "/",
                    templateUrl: 'views/home.html',
                    controller : 'homeCtrl as hCtrl'
                }))
                .state('posts', {
                    url        : '/posts',
                    templateUrl: 'views/posts/main.html'
                })
                .state('posts.list', lazyLoadState({
                    url  : '/list',
                    views: {
                        '': {
                            controller : 'postsListCtrl',
                            templateUrl: 'views/posts/list.html'
                        }
                    }
                }))
                .state('posts.new', lazyLoadState({
                    url  : '/new',
                    views: {
                        '': {
                            controller : 'postsNewCtrl',
                            templateUrl: 'views/posts/new.html'
                        }
                    }
                }))
                .state('posts.info', lazyLoadState({
                    url  : '/info/:id',
                    views: {
                        '': {
                            controller : 'postsInfoCtrl',
                            templateUrl: 'views/posts/info.html'
                        }
                    }
                }))
                .state('posts.editor', lazyLoadState({
                    url  : '/editor/:id',
                    views: {
                        '': {
                            controller : 'postsEditorCtrl',
                            templateUrl: 'views/posts/editor.html'
                        }
                    }
                }))
                .state('posts.tags', lazyLoadState({
                    url  : '/tags',
                    views: {
                        '': {
                            controller : 'postsTagsCtrl',
                            templateUrl: 'views/posts/tags.html'
                        }
                    }
                }))
                .state('analyties', lazyLoadState({
                    url        : '/anylytics',
                    controller : 'analytiesCtrl as alCtrl',
                    templateUrl: 'views/analyties/list.html'
                }))
                .state('comment', {
                    url        : '/comment',
                    templateUrl: 'views/comment/main.html'
                })
                .state('comment.list', lazyLoadState({
                    url  : '/list',
                    views: {
                        '': {
                            controller : 'commentListCtrl',
                            templateUrl: 'views/comment/list.html'
                        }
                    }
                }))
                .state('message', {
                    url        : '/message',
                    templateUrl: 'views/message/main.html'
                })
                .state('message.list', lazyLoadState({
                    url  : '/list',
                    views: {
                        '': {
                            controller : 'messageListCtrl as mslCtrl',
                            templateUrl: 'views/message/list.html'
                        }
                    }
                }))
        }
        ])
})(angular, $)
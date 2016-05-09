/**
 * Created by keziyuan on 2016/1/29.
 */
!(function (angular) {
    angular.module('admin')
        .factory('httpInterceptor', ['$q', '$rootScope', '$log', '$window', 'SweetAlert',
            function ($q, $rootScope, $log, $window, SweetAlert) {
                var httpInterceptor = {
                    request: function (config) {
                        //$log.log("请求之前: ", config);
                        config.headers = config.headers || {};
                        if ($rootScope.loginService.getField('X-Auth-Token')) {
                            config.headers['X-Auth-Token'] = $rootScope.loginService.getField('X-Auth-Token');
                        }
                        return config;
                    },
                    response: function (response) {
                        //$log.log(response);
                        return response;
                    },
                    requestError: function (response) {
                        // 请求发生了错误，如果能从错误中恢复，可以返回一个新的请求或promise
                        $log.log("请求发生了错误: ", response);
                        //return response; // 或新的promise
                        // 或者，可以通过返回一个rejection来阻止下一步
                        // return $q.reject(rejection);
                    },
                    responseError_1: function (rejection) {
                        var status = rejection.status;
                        $log.log("响应发生了错误: ", rejection);
                        switch (status) {
                            case 300 :
                                $window.location.href = rejection.data.url;//--需要重定向--
                                break;
                            case 302 :
                                $window.location.href = rejection.data.url;//--需要浏览器重定向--
                                break;
                            case 400 :
                                SweetAlert.swal("被拒绝!", rejection.data.msg, "error");//--参数错误，当前请求无法被服务器理解。--
                                break;
                            case 401 :
                                $window.location.href = "/#/signin";//--需要登录验证--
                                break;
                            case 403 ://--服务器已经理解请求，但是拒绝执行它。--
                                SweetAlert.swal("被拒绝!", rejection.data.msg, "error");
                                break;
                            case 404 ://--服务器已经理解请求，但是拒绝执行它。--
                                SweetAlert.swal("被拒绝!", rejection.data.msg, "error");
                                break;
                            default:
                                break;
                        }
                        return $q.reject(rejection);
                    }
                }
                return httpInterceptor;
            }])

})(angular, $)
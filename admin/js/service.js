/**
 * Created by keziyuan on 2016/1/28.
 */
!(function (angular) {
    angular.module('admin').factory('loginService', ['$cookies', '$rootScope', '$http', '$window',
        function ($cookies, $rootScope, $http, $window) {
            var auth = {};
            auth.getLoginStatus = function () {
                return "true" === $cookies.get("active");
            };
            auth.checkLoginStatus = function () {
                $cookies.get("active") && "false" !== $cookies.get("active") || $rootScope.$state.go("home");
            };
            auth.login = function (e) {
                $rootScope.$state.go("login");
            };
            auth.signup = function (e) {
                return o.signup(e)
            };
            auth.signout = function () {
                $http({
                    method: "GET",
                    url   : "signout"
                }).success(function () {
                    $window.location.href = "/";
                })
            };
            auth.getId = function () {
                return $cookies.get("_id")
            };
            auth.getName = function () {
                return $cookies.get("name")
            };
            auth.getRole = function () {
                return $cookies.get("role")
            };
            auth.getEmail = function () {
                return $cookies.get("email")
            };
            auth.getWechat = function () {
                return $cookies.get("wechat")
            };
            auth.getField = function (field) {
                return $cookies.get(field)
            }
            return auth;

        }])
})(angular, $)
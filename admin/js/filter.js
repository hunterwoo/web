/**
 * Created by keziyuan on 2016/1/28.
 */
!(function (angular) {
    angular.module('admin')
        .filter('trustUrl', ["$sce", function ($sce) {
            return function (url) {
                if (url) {
                    return $sce.trustAsResourceUrl(url);
                }
            }
        }])
})(angular, $)
/**
 * Created by keziyuan on 2016/1/28.
 */

!(function (angular, $) {

    angular.module('admin')
        .controller("homeCtrl", homeCtrl)
        .controller("indexCtrl", indexCtrl)
        .controller("menuCtrl", menuCtrl)
        .controller("headerCtrl", headerCtrl)
        .controller("analytiesCtrl", analytiesCtrl)
        .controller('messageListCtrl', messageListCtrl)
        .controller('postsListCtrl', postsListCtrl)
        .controller('postsNewCtrl', postsNewCtrl)
        .controller('postsEditorCtrl', postsEditorCtrl)
        .controller('postsInfoCtrl', postsInfoCtrl)

    homeCtrl.$inject = ["$scope", "$http", "$filter", '$timeout'];
    function homeCtrl($scope, $http, $filter, $timeout) {

        var self = this;
        var today = new Date();
        var dateFilter = $filter('date');

        var setLogs = function (d) {
            var sharpLineData = {
                labels  : [
                    dateFilter(today - 86400000 * 6, 'dd'),
                    dateFilter(today - 86400000 * 5, 'dd'),
                    dateFilter(today - 86400000 * 4, 'dd'),
                    dateFilter(today - 86400000 * 3, 'dd'),
                    dateFilter(today - 86400000 * 2, 'dd'),
                    dateFilter(today - 86400000 * 1, 'dd'),
                    dateFilter(today, 'dd')
                ],
                datasets: [
                    {
                        fillColor           : "rgba(98,203,49,0.5)",
                        strokeColor         : "rgba(98,203,49,0.7)",
                        pointColor          : "rgba(98,203,49,1)",
                        pointStrokeColor    : "#fff",
                        pointHighlightFill  : "#fff",
                        pointHighlightStroke: "rgba(98,203,49,1)",
                        data                : [33, 48, 40, 19, 54, 27, 54]
                    }
                ]
            };
            var sharpLineOptions = {
                responsive             : true,
                scaleShowGridLines     : true,
                //scaleGridLineColor: "rgba(0,0,0,.05)",
                scaleGridLineWidth     : 1,
                bezierCurve            : false,
                pointDot               : true,
                pointDotRadius         : 5,
                pointDotStrokeWidth    : 2,
                pointHitDetectionRadius: 10,
                datasetStroke          : false,
                //datasetStrokeWidth: 1,
                datasetFill            : false
            };
            sharpLineData.datasets[0].data = [
                d[6] && d[6].visitors.length || 0,
                d[5] && d[5].visitors.length || 0,
                d[4] && d[4].visitors.length || 0,
                d[3] && d[3].visitors.length || 0,
                d[2] && d[2].visitors.length || 0,
                d[1] && d[1].visitors.length || 0,
                d[0] && d[0].visitors.length || 0,
            ];
            var ctx = document.getElementById("visitorViewsChart").getContext("2d");
            var myNewChart = new Chart(ctx).Line(sharpLineData, sharpLineOptions);
        }

        $http.get("home")
            .success(function (data) {
                data = data;
                if (data.logs) {
                    setLogs(data.logs)
                }
                self.articles = data.articles;
                self.user = data.user;
                self.message = data.message;
            })
        self.establishTime = Math.round((new Date().getTime() - new Date(2016, 1, 7).getTime()) / 1000);
        var addTime = function () {
            $timeout(function () {
                self.establishTime = self.establishTime + 1;
                addTime();
            }, 1000)
        }
        addTime();
    }

    indexCtrl.$inject = ["$scope", "$http"];
    function indexCtrl($scope, $http) {
        $scope.getCarouselImgs = $http.get('/getCarouselImgs')
            .success(function (data, header, config, status) {
                if (data) {
                    $scope.carouselImgs = data;
                }
            })
    }

    menuCtrl.$inject = ["$scope", "$http", "$filter"];
    function menuCtrl($scope, $http, $filter) {
        var self = this;
        $http
            .get('/admin/client/count')
            .success(function (data, header, config, status) {
                self.clientCount = data;
            })


        var today = new Date();
        var dateFilter = $filter('date');
        var sharpLineData = {
            labels  : [
                dateFilter(today - 86400000 * 6, 'dd'),
                dateFilter(today - 86400000 * 5, 'dd'),
                dateFilter(today - 86400000 * 4, 'dd'),
                dateFilter(today - 86400000 * 3, 'dd'),
                dateFilter(today - 86400000 * 2, 'dd'),
                dateFilter(today - 86400000 * 1, 'dd'),
                dateFilter(today, 'dd')],
            datasets: [
                {
                    fillColor           : "rgba(98,203,49,0.5)",
                    strokeColor         : "rgba(98,203,49,0.7)",
                    pointColor          : "rgba(98,203,49,1)",
                    pointStrokeColor    : "#fff",
                    pointHighlightFill  : "#fff",
                    pointHighlightStroke: "rgba(98,203,49,1)",
                    data                : [33, 48, 40, 19, 54, 27, 54]
                }
            ]
        };
        var sharpLineOptions = {
            responsive             : true,
            scaleShowGridLines     : false,
            //scaleGridLineColor: "rgba(0,0,0,.05)",
            //scaleGridLineWidth: 1,
            bezierCurve            : false,
            //bezierCurveTension: 0,
            pointDot               : true,
            pointDotRadius         : 3,
            pointDotStrokeWidth    : 2,
            pointHitDetectionRadius: 2,
            datasetStroke          : false,
            //datasetStrokeWidth: 1,
            datasetFill            : false
        };
        $http
            .get('/admin/log/count?limit=7')
            .success(function (data, header, config, status) {
                var d = data;
                sharpLineData.datasets[0].data = [
                    d[6] && d[6].visitors.length || 0,
                    d[5] && d[5].visitors.length || 0,
                    d[4] && d[4].visitors.length || 0,
                    d[3] && d[3].visitors.length || 0,
                    d[2] && d[2].visitors.length || 0,
                    d[1] && d[1].visitors.length || 0,
                    d[0] && d[0].visitors.length || 0,
                ];
                var ctx = document.getElementById("menuChartLine").getContext("2d");
                var myNewChart = new Chart(ctx).Line(sharpLineData, sharpLineOptions);
            })

    }

    headerCtrl.$inject = ["$scope", "$http", "$timeout"];
    function headerCtrl($scope, $http, $timeout) {
        var _this = this;
        _this.messages = {
            total: 0,
            data : []
        }
        var refreshMessage = function () {
            $http({
                method: "GET",
                url   : "message/remind"
            }).success(function (data) {
                _this.messages.total = data.length;
                _this.messages.data = data;
            })
            $timeout(function () {
                refreshMessage();
            }, 100000000);
        }
        refreshMessage();
    }

    analytiesCtrl.$inject = ["$scope", "$http", '$filter'];
    function analytiesCtrl($scope, $http, $filter) {
        var self = this;
        $http
            .get('/admin/client/count')
            .success(function (data, header, config, status) {
                self.clientCount = data;
            })

        var today = new Date();
        var dateFilter = $filter('date');
        var sharpLineData = {
            labels  : [
                dateFilter(today - 86400000 * 6, 'yyyy-MM-dd'),
                dateFilter(today - 86400000 * 5, 'yyyy-MM-dd'),
                dateFilter(today - 86400000 * 4, 'yyyy-MM-dd'),
                dateFilter(today - 86400000 * 3, 'yyyy-MM-dd'),
                dateFilter(today - 86400000 * 2, 'yyyy-MM-dd'),
                dateFilter(today - 86400000 * 1, 'yyyy-MM-dd'),
                dateFilter(today, 'yyyy-MM-dd')],
            datasets: [
                {
                    fillColor           : "rgba(98,203,49,0.5)",
                    strokeColor         : "rgba(98,203,49,0.7)",
                    pointColor          : "rgba(98,203,49,1)",
                    pointStrokeColor    : "#fff",
                    pointHighlightFill  : "#fff",
                    pointHighlightStroke: "rgba(98,203,49,1)",
                    data                : [33, 48, 40, 19, 54, 27, 54]
                }
            ]
        };
        var sharpLineOptions = {
            responsive             : true,
            scaleShowGridLines     : true,
            //scaleGridLineColor: "rgba(0,0,0,.05)",
            scaleGridLineWidth     : 1,
            bezierCurve            : false,
            pointDot               : true,
            pointDotRadius         : 5,
            pointDotStrokeWidth    : 2,
            pointHitDetectionRadius: 10,
            datasetStroke          : false,
            //datasetStrokeWidth: 1,
            datasetFill            : false
        };
        $http
            .get('/admin/log/count?limit=7')
            .success(function (data, header, config, status) {
                var d = data;
                sharpLineData.datasets[0].data = [
                    d[6] && d[6].visitors.length || 0,
                    d[5] && d[5].visitors.length || 0,
                    d[4] && d[4].visitors.length || 0,
                    d[3] && d[3].visitors.length || 0,
                    d[2] && d[2].visitors.length || 0,
                    d[1] && d[1].visitors.length || 0,
                    d[0] && d[0].visitors.length || 0,
                ];
                var ctx = document.getElementById("visitorViewsChart").getContext("2d");
                var myNewChart = new Chart(ctx).Line(sharpLineData, sharpLineOptions);
            })
    }

    messageListCtrl.$inject = ["$scope", "$http"];
    function messageListCtrl($scope, $http) {
        var _this = this;
        $http({
            method: "GET",
            data  : {},
            url   : "message/list"
        }).success(function (data) {
            _this.messages = data;
        });
    }

    postsListCtrl.$inject = ["$scope", "$http", "SweetAlert"];
    function postsListCtrl($scope, $http, SweetAlert) {
        var _this = this;
        $http({
            method: "GET",
            url   : "/posts"
        }).success(function (data) {
            $scope.posts = data;
        });
        $scope.remove = function (_id) {
            SweetAlert.swal({
                title             : "Are you sure?",
                text              : "Your will not be able to recover this imaginary file!",
                type              : "warning",
                showCancelButton  : true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText : "Yes, delete it!",
                closeOnConfirm    : false
            }, function () {
                $http({
                    method: "DELETE",
                    params: {
                        _id: _id
                    },
                    url   : "/posts"
                }).success(function (data) {
                    SweetAlert.swal("Good job!", "删除成功!", "success");
                    $http({
                        method: "GET",
                        url   : "/posts"
                    }).success(function (data) {
                        $scope.posts = data;
                    });
                })
            });
        }
    }

    postsEditorCtrl.$inject = ["$scope", "$http", "SweetAlert", "$uibModal"]
    function postsEditorCtrl($scope, $http, SweetAlert, $uibModal) {
        $http({
            method: "GET",
            url   : "/posts/" + $scope.$stateParams.id
        }).success(function (data) {
            $scope.post = data;
        })
        $scope.open = function () {
            $uibModal.open({
                animation  : true,
                templateUrl: 'views/template/markdown-content.html',
                size       : "md"
            });
        };
        $scope.ok = function () {
            return $http({
                method: "PUT",
                data  : $scope.post,
                url   : "/posts"
            }).success(function (data) {
                SweetAlert.swal("Good job!", "修改成功!", "success")
            })
        }
    }

    postsNewCtrl.$inject = ["$scope", "$http", "SweetAlert", "$uibModal"]
    function postsNewCtrl($scope, $http, SweetAlert, $uibModal) {
        $scope.posts = {
            image   : 'http://img02.tooopen.com/images/20140314/sy_56692371155.jpg',
            markdown: ""
        }
        $scope.open = function () {
            $uibModal.open({
                animation  : true,
                templateUrl: 'views/template/markdown-content.html',
                size       : "md"
            });
        };
        $scope.ok = function () {
            $http({
                method: "POST",
                data  : $scope.posts,
                url   : "/posts"
            }).success(function (data) {
                //SweetAlert.swal("Good job!", "添加成功!", "success");
                SweetAlert.swal({
                    title            : "添加成功!",
                    type             : "success",
                    confirmButtonText: "查看",
                    closeOnConfirm   : true
                }, function () {
                    $scope.$state.go("posts.info", {id: data._id});
                })
            })
        }
    }

    postsInfoCtrl.$inject = ["$scope", "$http", "SweetAlert"]
    function postsInfoCtrl($scope, $http, SweetAlert) {
        var self = this;
        $http({
            method: "GET",
            url   : "/posts/" + $scope.$stateParams.id
        }).success(function (data) {
            $scope.post = data;
        })
    }

})(angular, $)

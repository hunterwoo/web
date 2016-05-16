/**
 * Created by keziyuan on 2016/1/28.
 */
!(function (angular, $) {
    angular.module('admin')
        .directive('iframeOnload', iframeOnload)
        //.directive('clearInput', clearInput)
        .directive("panelTools", panelTools)
        .directive("winResize", winResize)
        .directive("winCenter", winCenter)
        .directive("toToggleMenu", toToggleMenu)
        .directive('imageloaded', imageLoaded)
        .directive('layoutLoading', layoutLoading)
        .filter('getCol', function () {
            return function (items, row) {
                return items && items.map(function (item) {
                        return item[row];
                    }).join(',');
            }
        })
        .directive('focusMe', ['$timeout', '$parse', function ($timeout, $parse) {
            return {
                link: function (scope, element, attrs) {
                    var model = $parse(attrs.focusMe);
                    scope.$watch(model, function (value) {
                        if (value === true) {
                            $timeout(function () {
                                element[0].focus();
                            });
                        }
                    });
                    element.bind('blur', function () {
                        scope.$apply(model.assign(scope, false));
                    });
                }
            };
        }])
        .directive('tagEditor', function () {
            return {
                restrict   : 'AE',
                /* require: 'ngModel',*/
                scope      : {
                    tags: '=ngModel'
                },
                replace    : true,
                templateUrl: 'views/template/ngTagEditor.html',
                controller : ['$scope', '$attrs', '$element', '$http', '$filter', function ($scope, $attrs, $element, $http, $filter) {

                    $scope.options = [];
                    $scope.options.output = $attrs.output || 'name';
                    $scope.options.fetch = $attrs.fetch || '/tag';
                    $scope.options.placeholder = $attrs.placeholder || 'Enter a few letters...';
                    $scope.options.apiOnly = $attrs.apiOnly || false;
                    $scope.search = '';

                    $http.get($scope.options.fetch)
                        .success(function (data) {
                            $scope.suggestions = data;
                        });

                    //$scope.$watch('search', function () {
                    //$http.get($scope.options.fetch + $scope.search).success(function(data){
                    //    $scope.suggestions = data;
                    //    /* console.log(data); */
                    //});
                    //});
                    $scope.add = function (id, name) {
                        var tag = $scope.tags.filter(function (tag) {
                            return tag.name == name;
                        });
                        if (tag.length == 0) {
                            var suggestion = $scope.suggestions.filter(function (suggestion) {
                                return suggestion.name == name;
                            });
                            if (suggestion.length == 0) {
                                $scope.tags.push({'_id': new Date().getTime(), 'name': name, isNew: true});
                            }else{
                                $scope.tags.push(suggestion[0]);
                            }
                        }
                        $scope.search = '';
                    };
                    $scope.remove = function (index) {
                        $scope.tags.splice(index, 1);
                    };

                    $scope.tagsFilter = function (item) {
                        return $scope.tags.filter(function (tag) {
                                return tag._id === item._id || tag.name === item.name;
                            }).length == 0 && ($scope.search == '' || item.name.indexOf($scope.search) >= 0);
                    }

                    $element.find('input').on('keydown', function (e) {
                        var keys = [8, 13, 32];
                        if (keys.indexOf(e.which) !== -1) {
                            if (e.which == 8) { /* backspace */
                                if ($scope.search.length === 0 && $scope.tags.length) {
                                    $scope.tags.pop();
                                    e.preventDefault();
                                }
                            }
                            else if (e.which == 32 || e.which == 13) { /* space & enter */
                                if ($scope.search.length && !$scope.apiOnly) {
                                    if (!$scope.apiOnly) {
                                        $scope.add(0, $scope.search);
                                        e.preventDefault();
                                    }
                                }
                            }
                            $scope.$apply();
                        }
                    });

                }]
            }
        });

    layoutLoading.$inject = ["$rootScope"];
    function layoutLoading($rootScope) {
        return {
            restrict: 'AE',
            link    : function (scope, element, attrs) {
                $rootScope.$on('$stateChangeStart', function () {
                    element.removeClass('ng-hide');
                });
                $rootScope.$on('$stateChangeSuccess', function () {
                    element.addClass('ng-hide');
                });
                $rootScope.$on('$stateNotFound', function () {
                    element.addClass('ng-hide');
                });
                $rootScope.$on('$stateChangeError', function () {
                    element.addClass('ng-hide');
                });
            }
        }
    }

    function iframeOnload() {
        return {
            restrict: 'AE',
            link    : function (scope, element, attrs) {
                var $body = $(element).contents().find('body');

                $(element).load(function () {
                    $body = $(element).contents().find('body');
                    $body.css(scope.$eval(attrs.iframeOnload));
                    console.log($body.css("font-size"));
                });

                attrs.$observe('updateBodyStyle', function (value) {
                    $body.css(scope.$eval(value));
                }, true);
            }
        }
    }

    clearInput.$inject = ['$parse'];
    function clearInput($parse) {
        return {
            restrict: 'AE',
            require : 'ngModel',
            link    : function (scope, element, attr) {
                var htmlMarkup = attr.clearBtnMarkup ? attr.clearBtnMarkup : '<span>×</span>';
                var btn = $(htmlMarkup);
                btn.addClass(attr.clearBtnClass ? attr.clearBtnClass : "clear-btn");
                element.after(btn);

                btn.on('click', function (event) {
                    if (attr.clearInput) {
                        var fn = $parse(attr.clearInput);
                        scope.$apply(function () {
                            fn(scope, {
                                $event: event
                            });
                        });
                    } else {
                        scope[attr.ngModel] = null;
                        scope.$digest();
                    }
                });

                scope.$watch(attr.ngModel, function (val) {
                    var hasValue = val && val.length > 0;
                    if (!attr.clearDisableVisibility) {
                        btn.css('visibility', hasValue ? 'visible' : 'hidden');
                    }

                    if (hasValue && !btn.hasClass('clear-visible')) {
                        btn.removeClass('clear-hidden').addClass('clear-visible');
                    } else if (!hasValue && !btn.hasClass('clear-hidden')) {
                        btn.removeClass('clear-visible').addClass('clear-hidden');
                    }
                });
            }
        }
    }

    panelTools.$inject = ["$log"];
    function panelTools($log) {
        return function (scope, element, attr) {
            var toggle = function (_this) {
                var icon = _this.find('i:first');
                var hpanel = $(element).closest('div.hpanel');
                var body = hpanel.find('div.panel-body');
                var footer = hpanel.find('div.panel-footer');
                body.slideToggle(300);
                footer.slideToggle(200);
                icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                hpanel.toggleClass('').toggleClass('panel-collapse');
                setTimeout(function () {
                    hpanel.resize();
                    hpanel.find('[id^=map-]').resize();
                }, 50);
            }
            var close = function () {
                var hpanel = $(element).closest('div.hpanel');
                hpanel.remove();
                if ($('body').hasClass('fullscreen-panel-mode')) {
                    $('body').removeClass('fullscreen-panel-mode');
                }
            }
            $(element).find("a").each(function () {
                var _this = $(this)
                _this.on('click', function (event) {
                    event.preventDefault();
                    var type = _this.attr("type") || _this.attr("class");
                    $log.log(type);
                    switch (type) {
                        case "toggle" :
                            toggle(_this);
                            break;
                        case "close" :
                            close(_this);
                            break;
                        case "showhide" :
                            toggle(_this);
                            break;
                        case "closebox" :
                            close(_this);
                            break;
                    }
                })
            })
        }
    }

    winResize.$inject = ["$window", "$timeout"];
    function winResize($window, $timeout) {
        return function (scope, element, attr) {
            var resize = function () {
                scope.winHeight = $(window).height();
                scope.winWidth = $(window).width();
                if (attr.broadcast == 'true') {
                    scope.$broadcast('windowChangeSize', {
                        winHeight: scope.winHeight,
                        winWidth : scope.winWidth
                    });
                }
            }
            var apply = function () {
                resize();
                scope.$digest();
            }
            $($window).bind('resize', apply);
            scope.$on('$destroy', function () {
                $($window).unbind('resize', apply);
            })
            $timeout(function () {
                resize();//--会在浏览器渲染之后执行。
            })
            //scope.$evalAsync(resize);//--会在angular操作DOM之后，浏览器渲染之前执行。
        }
    }

    function winCenter() {
        return function (scope, element, attr) {
            function resize(data) {
                var bannerTextTop = 0;
                if (data.winHeight > $(element).actual('height')) {
                    bannerTextTop = (data.winHeight / 2) - ($(element).actual('height') / 2) - 40;
                }
                element.css('padding-top', bannerTextTop + 'px');
            }

            scope.$on('windowChangeSize', function (target, data) {
                resize(data);
            });
        }
    }

    winNavigation.$inject = ["$window", "$timeout"];
    function winNavigation($window, $timeout) {
        return function (scope, element, attr) {
            var next = attr.next;
            console.log(next);
            var scrollListen = function (data) {
                if ($($window).scrollTop() >= scope.winHeight) {
                    element.addClass('nav-wrap');
                    $(next).addClass('exp');
                } else {
                    element.removeClass('nav-wrap');
                    $(next).removeClass('exp');
                }
            }
            var apply = function () {
                scrollListen();
                scope.$apply();
            }
            scope.$on('windowChangeSize', function (target, data) {
                scrollListen(data);
            });
            $($window).bind('scroll', apply);
            scope.$on('$destroy', function () {
                $($window).unbind('scroll', apply);
            })

        }
    }

    function toToggleMenu() {
        return function (scope, ele, attr) {
            ele.on('click', function () {
                if ($("body").hasClass('hide-sidebar')) {
                    $("body").removeClass('hide-sidebar').addClass('show-sidebar')
                } else {
                    $("body").removeClass('show-sidebar').addClass('hide-sidebar')
                }
            })
        }
    }

    function imageLoaded() {
        return {
            restrict: 'AE',
            link    : function (scope, element, attrs) {
                var cssClass = attrs.loadedclass;
                element.bind('load', function (e) {
                    angular.element(element).addClass(cssClass);
                });
            }
        }
    }

})(angular, $)
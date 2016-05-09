/**
 * vButton - AngularJS pressable button with a busy indicator
 * @version v1.1.1
 * @link http://lukaszwatroba.github.io/v-button
 * @author Łukasz Wątroba <l@lukaszwatroba.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

(function (angular) {
    'use strict';


// Config
    angular.module('vButton.config', [])
        .constant('buttonConfig', {
            busyLabel: 'Loading',

            states: {
                busy: 'is-busy',
                pressed: 'is-pressed'
            }
        });


// Modules
    angular.module('vButton.directives', []);
    angular.module('vButton',
        [
            'vButton.config',
            'vButton.directives'
        ]);


// vBusy directive
    angular.module('vButton.directives')
        .directive('vBusy', vBusyDirective)

    /** 修改
     *  添加  require: '?^form' 对form的提交按钮处理
     */
    function vBusyDirective($document, buttonConfig) {
        return {
            restrict: 'A',
            scope: {
                isBusy: '=vBusy',
                busyLabel: '@vBusyLabel',
                busyText: '@vBusyText'
            },
            require: '?^form', //-- 修改添加 --
            compile: function (tElement, tAttrs) {
                /** 修改
                 *  vBusyClass 针对不同按钮的busy-class
                 */
                var busyClass = tAttrs.vBusyClass || buttonConfig.states.busy;

                var labelElement = angular.element(tElement.find('span'));

                if (!labelElement[0]) {
                    tElement.html('<span>' + tElement.html() + '</span>');
                    labelElement = angular.element(tElement.find('span'));
                }

                return function postLink(scope, iElement, iAttrs, FromCtrl) {
                    var idleLabelHtml = labelElement.html(),
                        busyLabelHtml = scope.busyLabel || buttonConfig.busyLabel,
                        busyTextHtml = scope.busyText;

                    scope.$watch('isBusy', function (value) {
                        if (value) {
                            //iElement.addClass(buttonConfig.states.busy); //--修改--
                            iElement.addClass(busyClass)
                            labelElement.html(busyLabelHtml);
                        } else {
                            //iElement.removeClass(buttonConfig.states.busy);//--修改--
                            iElement.removeClass(busyClass)
                            labelElement.html(busyTextHtml || idleLabelHtml);
                        }
                    });

                    tAttrs.$observe('vBusyLabel', function (value) {
                        busyLabelHtml = value;
                    });

                    tAttrs.$observe('vBusyText', function (value) {
                        busyTextHtml = value;
                    });

                    /** 修改
                     *  单击按钮执行 v-busy-click
                     */

                    if (tAttrs.vBusyClick) {
                        iElement.bind("click", function () {
                            if (tAttrs.type == 'submit' && FromCtrl && FromCtrl.$invalid) {
                                console.log("$invalid");
                                return;
                            }
                            if (!iElement.hasClass("disabled")) {
                                //console.log("vBusyClick");
                                if (scope.isBusy) {
                                    console.log("正在提交...");
                                    return;
                                }
                                scope.isBusy = true;
                                var defer;
                                try {
                                    defer = scope.$parent.$eval(tAttrs.vBusyClick);
                                } catch (e) {
                                    console.log(e);
                                }
                                if (!defer) {
                                    scope.isBusy = false;
                                } else {
                                    defer.then(function () {
                                        scope.isBusy = false;
                                    }, function () {
                                        scope.isBusy = false;
                                    })
                                }
                            }
                        })
                    }
                };
            }
        };
    }

    vBusyDirective.$inject = ['$document', 'buttonConfig'];


// vPressable directive
    angular.module('vButton.directives')
        .directive('vPressable', vPressableDirective);


    function vPressableDirective($document, buttonConfig) {
        return {
            restrict: 'A',
            link: function (scope, iElement) {
                var isTouch = !!('undefined' !== typeof $document[0].documentElement.ontouchstart);
                var pressEvent = (isTouch) ? 'touchstart' : 'mousedown',
                    releaseEvent = (isTouch) ? 'touchend' : 'mouseup';

                var bodyElement = angular.element($document[0].body);

                function makeRipple(posX, posY) {
                    var rect = iElement[0].getBoundingClientRect(),
                        ripple = iElement[0].querySelector('v-ripple');

                    var top, left;

                    angular.element(ripple).remove();

                    ripple = $document[0].createElement('v-ripple');
                    ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';

                    iElement.append(ripple);

                    left = posX - rect.left - ripple.offsetWidth / 2 - bodyElement[0].scrollLeft;
                    top = posY - rect.top - ripple.offsetHeight / 2 - bodyElement[0].scrollTop;
                    ripple.style.left = left + 'px';
                    ripple.style.top = top + 'px';
                }

                function pressButton(event) {
                    makeRipple(event.pageX, event.pageY);
                    iElement.addClass(buttonConfig.states.pressed);

                    bodyElement.bind(releaseEvent, releaseButton);
                }

                function releaseButton(event) {
                    iElement.removeClass(buttonConfig.states.pressed);
                    bodyElement.unbind(releaseEvent, releaseButton);
                }

                iElement.bind(pressEvent, pressButton);
            }
        };
    }

    vPressableDirective.$inject = ['$document', 'buttonConfig'];


}(angular));
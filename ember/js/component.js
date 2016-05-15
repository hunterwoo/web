/**
 * Created by keziyuan on 2016/3/31 0031.
 */

ZEEV.LoadingBarComponent = Ember.Component.extend({
    classNames: ['pace animated-panel'],
    //classNameBindings: ['isLoading::hidden'],
    manage    : function () {
        this.get("isLoading") ? this.animate.call(this) : this.set("isLoaded", !0)
    }.observes("isLoading"),
    animate   : function () {
        this.set("isLoaded", !1);
        var self       = this,
            status     = 0,
            loadingBar = $('<div class="pace-progress" style="width: 0%"><\/div>'),
            color      = this.get('color') || "#fcb851";
        self.$().append(loadingBar);
        if (color) {
            loadingBar.css('background-color', color);
        }
        var interval;
        var _inc = function () {
            if (self.get("isLoaded")) {
                status = 1;
            } else {
                status = self.getStatus(status);
            }
            var pct = (status * 100) + '%';
            loadingBar.css('width', pct);
            if (status >= 1) {
                window.clearInterval(interval);
                Ember.run.later(function () {
                    loadingBar.remove()
                }, 500);
            }
        }
        _inc();
        interval = window.setInterval(function () {
            _inc();
        }, 500)
    },
    getStatus : function (_status) {
        var rnd = 0;
        var stat = _status;
        if (stat >= 0 && stat < 0.25) {
            // Start out between 3 - 6% increments
            rnd = 6 / 100;
        } else if (stat >= 0.25 && stat < 0.65) {
            // increment between 0 - 3%
            rnd = 3 / 100;
        } else if (stat >= 0.65 && stat < 0.9) {
            // increment between 0 - 2%
            rnd = 1 / 100;
        } else if (stat >= 0.9 && stat < 0.97) {
            // finally, increment it .5 %
            rnd = 0.005;
        } else {
            // after 99%, don't increment:
            rnd = 0;
        }
        return _status + rnd;
    }
})

ZEEV.LoadingSliderComponent = Ember.Component.extend({
    tagName          : "div",
    classNames       : ["loading-slider"],
    classNameBindings: "expanding",
    manage           : function () {
        this.get("isLoading") ? this.get("expanding") ? this.expandingAnimate.call(this) : this.animate.call(this) : this.set("isLoaded", !0)
    }.observes("isLoading"),
    animate          : function () {
        this.set("isLoaded", !1);
        var self        = this,
            elapsedTime = 0,
            inner       = $('<span>'),
            outer       = this.$(),
            duration    = this.getWithDefault('duration', 300),
            innerWidth  = 0,
            outerWidth  = this.$().width(),
            stepWidth   = Math.round(outerWidth / 50),
            color       = this.get('color');

        outer.append(inner);
        if (color) {
            inner.css('background-color', color);
        }
        var interval = window.setInterval(function () {
            elapsedTime = elapsedTime + 10;
            inner.width(innerWidth = innerWidth + stepWidth);
            if (elapsedTime > (duration * 0.75) || innerWidth > (outerWidth * 0.66)) {
                // don't stop the animation completely
                if (stepWidth > 1) {
                    stepWidth = stepWidth * 0.97;
                }
            }
            if (innerWidth > outerWidth) {
                Ember.run.later(function () {
                    outer.empty();
                    window.clearInterval(interval);
                }, 50);
            }
            if (self.get('isLoaded')) {
                if (stepWidth < 10) {
                    stepWidth = 10;
                }
                stepWidth = stepWidth + stepWidth;
            }
        }, 10)
    },
    expandingAnimate : function () {
        var self       = this,
            outer      = this.$(),
            speed      = this.getWithDefault('speed', 1000),
            colorQueue = this.get('color');
        if ('object' === typeof colorQueue) {
            (function updateFn() {
                var color = colorQueue.shift();
                colorQueue.push(color);
                self.expandItem.call(self, color);
                if (!self.get('isLoading')) {
                    outer.empty();
                } else {
                    window.setTimeout(updateFn, speed);
                }
            })();
        } else {
            this.expandItem.call(this, colorQueue, true);
        }
    },
    expandItem       : function (color, cleanUp) {
        var self       = this,
            inner      = $('<span>').css({'background-color': color}),
            outer      = this.$(),
            innerWidth = 0,
            outerWidth = outer.width(),
            stepWidth  = Math.round(outerWidth / 50);
        var ua = window.navigator.userAgent;
        var ie10   = ua.indexOf("MSIE "),
            ie11   = ua.indexOf('Trident/'),
            ieEdge = ua.indexOf('Edge/');

        outer.append(inner);
        var interval = window.setInterval(function () {
            var step = (innerWidth = innerWidth + stepWidth);
            if (innerWidth > outerWidth) {
                window.clearInterval(interval);
                if (cleanUp) {
                    outer.empty();
                }
            }
            if (ie10 > 0 || ie11 > 0 || ieEdge > 0) {
                inner.css({
                    'margin': '0 auto',
                    'width' : step
                });
            } else {
                inner.css({
                    'margin-left': '-' + step / 2 + 'px',
                    'width'      : step
                });
            }
        }, 10);
    },
    didInsertElement : function () {
        this.$().html('<span>');
        var color = this.get('color');
        if (color) {
            this.$('span').css('background-color', color);
        }
    }
})

ZEEV.PostsDynamicComponent = Ember.Component.extend({
    tagName: 'ul'
})

ZEEV.WindowResizeComponent = Ember.Component.extend({
    attributeBindings: ['style'],
    style            : "",
    initializeTinyMCE: Ember.on('didInsertElement', function () {
        var _this = this;
        _this.set("style", 'height:' + $(window).height() + 'px')
        $(window).resize(function () {
            _this.set("style", 'height:' + $(window).height() + 'px')
        })
    })
})


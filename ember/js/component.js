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


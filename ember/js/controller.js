/**
 * Created by keziyuan on 2016/3/30 0030.
 */

ZEEV.ApplicationController = Ember.Controller.extend({
    ajaxCount: 0,
    isAjaxLoading: Ember.computed.gt('ajaxCount', 0),
    decrementAjaxCount: function () {
        if (this.get('isLoading')) {
            Ember.run.debounce(this, 'decrementAjaxCount', 2000);
        } else if (this.get('isAjaxLoading')) {
            this.decrementProperty('ajaxCount');
        }
    },
    registerAjaxObserver: function () {
        Ember.$(document).ajaxStart(
            function () {
                this.incrementProperty('ajaxCount');
            }.bind(this)
        ).ajaxStop(
            function () {
                this.decrementAjaxCount();
            }.bind(this)
        );
    }.on('init'),
    actions: {
        open_side: function () {
            $("body").addClass("side");
            $("#side_mask").css("display","block");
        },
        close_side: function () {
            $("body").removeClass("side");
            $("#side_mask").css("display","none");
        }
    }
})

ZEEV.PostsController = Ember.Controller.extend({
    init: function () {
        this._super();
        Ember.debug('I\'m a debug notice!');
    }
})
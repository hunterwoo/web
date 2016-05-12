/**
 * Created by keziyuan on 2016/4/7 0007.
 */
ZEEV.Router.map(function () {
    this.resource('index', {path: '/'})
    this.resource('posts', function () {
        this.route('info', {path: '/:posts_id'}, function () {

        });
    })
    this.resource('about', function () {

    })
});
ZEEV.ApplicationRoute = Ember.Route.extend({
    model  : function () {
        return {
            name : 'zeev',
            email: '617070839@qq.com'
        }
    },
    actions: {
        willTransition: function () {
            if ($("body").hasClass("side")) {
                $("body").removeClass("side");
                $("#side_mask").css("display", "none");
            }
        },
        didTransition : function () {
            window.scrollTo(0, 0);
        }
    }
})


ZEEV.PostsRoute = Ember.Route.extend({
    model: function () {
        return Ember.$.getJSON('/posts?part111');
    }
});

ZEEV.PostsInfoRoute = Ember.Route.extend({
    model: function (params) {
        return Ember.$.getJSON('/posts/' + params.posts_id);
    }
});
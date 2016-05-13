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
    this.route('error404', {path: '/*path'});
});

ZEEV.ApplicationRoute = Ember.Route.extend({
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
        return Ember.$.getJSON('/posts?part');
    }
});

ZEEV.PostsInfoRoute = Ember.Route.extend({
    model: function (params) {
        return Ember.$.getJSON('/posts/' + params.posts_id);
    }
});
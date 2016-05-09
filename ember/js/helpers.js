/**
 * Created by keziyuan on 2016/4/16 0016.
 */
var DEFAULT_FORMAT = 'D MMM YYYY HH:mm';

Ember.Handlebars.helper('date', function (value, format) {
    if (typeof format !== "string") {
        format = DEFAULT_FORMAT;
    }
    return moment.duration(new Date() - new Date(value)).humanize(true);
})
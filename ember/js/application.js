/**
 * Created by keziyuan on 2016/3/31 0031.
 */

//Ember.Application.initialize({
//    name: 'api-adapter',
//    initialize: function(application) {
//        Ember.debug('Running first initializer!');
//    }
//});

window.ZEEV = Ember.Application.create({
    LOG_TRANSITIONS: false,
    LOG_TRANSITIONS_INTERNAL: false,
    LOG_STACKTRACE_ON_DEPRECATION: true
});

ZEEV.ApplicationStore = DS.Store.extend({
    revision: 11,
    adapter: "DS.RESTAdapter"
});

ZEEV.ApplicationAdapter = DS.RESTAdapter.extend({
    //namespace: 'api/1',
    //host: 'https://api.example.com',
    coalesceFindRequests: false,
    defaultSerializer: 'application',//ApplicationSerializer
    headers: {
        'API_KEY': 'secret key',
        'ANOTHER_HEADER': 'Some header value'
    },
    //beforeSend: function () {
    //    alert("ajax请求之前");
    //},
    //complete: function () {
    //    alert("ajax请求完成");
    //},
    findAll: function (store, type, sinceToken, snapshotRecordArray) {
        console.log(store, type, sinceToken, snapshotRecordArray);
        var promise = this._super(store, type);
        store.unloadAll(type);
        store.all(type);    // restore typeMap.findAllCache
        return new Ember.RSVP.Promise(function (resolve, reject) {
            promise.then(function (records) {
                resolve(records);
            }, reject);
        });
    }
});

ZEEV.ApplicationSerializer = DS.RESTSerializer.extend({
    primaryKey: '_id',
    //keyForAttribute: function (attr, method) {
    //    console.info(attr, method);
    //    return Ember.String.underscore(attr).toUpperCase();
    //},
    //keyForPolymorphicType: function (key, relationship) {
    //    console.info(key, relationship);
    //    var relationshipKey = this.keyForRelationship(key);
    //    return 'type-' + relationshipKey;
    //},
    //serialize: function (snapshot, options) {
    //    console.info(snapshot, options);
    //    return json;
    //}
});
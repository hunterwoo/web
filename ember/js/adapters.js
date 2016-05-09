/**
 * Created by keziyuan on 2016/3/31 0031.
 */
/*
 缺省情况下，Ember Data内置了一些非常有用的适配器。可以根据自己的实际情况，选择其中之一作为起点来自定义适配器。

 DS.Adapter
    最基础的适配器，其自身不包含任何功能。如果需要创建一个与Ember适配器有根本性区别的适配器，那么可以这里入手。

 DS.FixtureAdapter
    一个用来从内存中加载记录的适配器，常用于开发和测试阶段。

 DS.RESTAdapter
    最通用的扩展适配器。RESTAdapter可以实现store与HTTP服务器之间通过XHR交互JSON数据。大部分使用JSON API的Ember应用都应该使用RESTAdapter。

 DS.ActiveModelAdapter
    一个RESTAdapter的特列，用于与Rails风格的REST API协同工作。
 */



//UserMgr.ApplicationAdapter = DS.RESTAdapter.extend({
//    host: zeevConfig.API_HOST,
//    pathForType: function(type) {
//        return type+'s/list?limit=3';
//    }
//});

ZEEV.ArticleAdapter = ZEEV.ApplicationAdapter.extend({
    //namespace: 'api/v1'
    findAll: function (store, type, sinceToken, snapshotRecordArray) {
        console.log(store, type, sinceToken, snapshotRecordArray);
        var promise = this._super(store, type);
        store.unloadAll(type);
        store.all(type);    // restore typeMap.findAllCache
        return new Ember.RSVP.Promise(function(resolve, reject) {
            promise.then(function(records) {
                var data = {};
                data["Articles"] = records;
                resolve(data);
            }, reject);
        });
    }
});
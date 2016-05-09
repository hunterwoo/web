/**
 * Created by Administrator on 2016/3/1.
 */

var Log = global.dbHelper.getModel("Log");

module.exports = {
    getLogs: getLogs
}

function getLogs(req, res) {
    var limit = parseInt(req.query.limit) || 0;
    Log.find({})
        .limit(limit)
        .sort({'date': -1})
        .exec(function (err, logs) {
            if (err) {
                console.log(err);
            }
            res.status(200).send(logs)
        })
}
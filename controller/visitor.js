/**
 * Created by Administrator on 2016/2/28.
 */

var Visitor = global.dbHelper.getModel("Visitor");
var Log = global.dbHelper.getModel("Log");

module.exports = {
    compareClientIp: compareClientIp,
    getClientIpCount: getClientIpCount
}

function compareClientIp(ip) {
    Visitor.findOne({ip: ip}, function (err, visitor) {
        if (err) {
            console.log(err);
            return;
        }
        if (!visitor) {
            visitor = Visitor.create({
                ip: ip
            });
        } else {
            visitor.update({$set: {'meta.updateAt': new Date()}});
        }
        var date = new Date();
        var today = new Date(date.getFullYear(), date.getMonth(), date.getDay());
        Log.findOne({date: today}, function (err, log) {
            if (err) {
                console.log(err)
            }
            if (log) {
                if (log.visitors.indexOf(visitor._id) == -1) {
                    log.visitors.push(visitor._id)
                    log.save(function (err) {
                    })
                }
            } else {
                Log.create({
                    date: today,
                    visitors: [visitor._id]
                });
            }
        })
    })
}

function getClientIpCount(req, res) {
    Visitor.count(function (err, doc) {
        if (err) {
            return res.sendStatus(500);
        }
        res.status(200).sendStatus(doc)
    })
}
var mongo = require("mongodb");
var dbconf;
var db;

exports.init = function (alias) {
    var conf = __conf.get(alias);
    dbconf = conf;
    var server = new mongo.Server(dbconf.host, dbconf.port, {});
    db = new mongo.Db(dbconf.dbname, server, {});
};

exports.save = function (table, data) {
    db.open(function (error, db) {
        if (error) { return; }
        db.collection(table, function (error, collection) {
            if (error) { console.log(error.message); }
            collection.insert(data, { safe: true }, function (error, objects) {
                if (error) { console.log(error.message); }
                //if (err && err.message.indexOf('E11000 ') !== -1) {
                // this _id was already inserted in the database
                //}
                db.close();
            });
        });
    });
};

exports.remove = function (table, query) {
    db.open(function (error, db) {
        if (error) { return; }
        db.collection(table, function (error, collection) {
            collection.remove(query, { safe: true }, function (error, objects) {
                if (error) { console.warn(error.message); }

                db.close();
            });
        });
    });
};

exports.select = function (table, query) {
    db.open(function (error, db) {
        if (error) { return; }
        db.collection(table, function (error, collection) {
            if (error) { console.log(error.message); }
            collection.find(query, { safe: true }).toArray(function (error, result) {
                if (error) { console.log(error.message); }

                if (result.length == 0) {
                    console.log("No result found");
                }

                db.close();
                return result;
            });
        });
    });
};
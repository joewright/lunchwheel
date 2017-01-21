var _ = require('lodash');

var schema = {
    name: '',
    spots: [],
    latestPick: ''
};

var TeamModel = module.exports = function(values) {
    values = _.defaults(values, schema, this.__proto__);
    for (key in values) {
        this[key] = values[key];
    }
};

TeamModel.connect = function(db) {
    this.db = db;
};

TeamModel.get = function(id, callback) {
    var self = this;
    this.db.get(id, function(err, res) {
        callback(err, new self(res));
    });
};

TeamModel.prototype.save = function(callback) {
    var self = this;
    var values = self.serialize();
    if (self._rev) {
        values = _.extend(values, {
            _id: self._id,
            _rev: self._rev
        });
    }
    TeamModel.db.post(values, function(err, saved) {
        if (saved && saved.ok) {
            self._rev = saved.rev;
            self._id = saved.id;
            callback(err, self);
        } else {
            callback(err || saved);
        }
    });
};

TeamModel.prototype.serialize = function() {
    var doc = {};
    for (key in this) {
        if (schema[key] !== undefined) {
            doc[key] = this[key];
        }
    }
    return doc;
};
var _ = require('lodash');
var async = require('async');

var schema = {
    name: '',
    spots: [],
    latestPick: ''
};

var TeamModel = module.exports = function(values) {
    var copy = _.chain(values)
        .cloneDeep()
        .defaults(copy, schema, this.__proto__)
        .value();
    _.extend(this, copy);
};

TeamModel.designs = [{
    _id: '_design/by_name',
    views: {
        lc: {
            map: function(doc) {
                emit(doc.name && doc.name.toLowerCase(), 1);
            }.toString()
        }
    },
    language: 'javascript'
}];

TeamModel.connect = function(db) {
    this.db = db;
    var self = this;
    async.each(self.designs, ensureDesignDoc, function(err) {
        console.log('Design docs synced');
    });

    function ensureDesignDoc(designDoc, nextDoc) {
        self.db.get(designDoc._id, function(err, existing) {
            if (existing) {
                designDoc._rev = existing._rev;
            }
            self.db.post(designDoc, nextDoc);
        });
    }
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
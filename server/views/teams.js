var _ = require('lodash');
var TeamsView = module.exports = function(options) {
    this.model = options.model;
};

TeamsView.prototype.load = function() {
    var self = this;
    return function(req, res, next) {
        self.model.db.get(req.params.id, function(err, existing) {
            if (err || !existing) {
                return res.status(404).render('404');
            }
            res.locals.team = new self.model(existing);
            next();
        });
    };
};

TeamsView.prototype.index = function() {
    var self = this;
    return function(req, res, next) {
        var queryOpts = {
            limit: 20,
            skip: req.query.skip || 0,
            descending: false
        };
        self.model.db.query('by_name/lc', queryOpts, function(err, results) {
            var ctx = {
                rows: results.rows,
                total_rows: results.total_rows
            };
            if (results.rows.length >= queryOpts.limit) {
                ctx.next_page = results.offset + queryOpts.limit;
            }
            if (!results.rows.length) {
                ctx.previous_page = 0;
            } else if (results.offset) {
                ctx.previous_page = results.offset - queryOpts.limit;
            }
            res.render('teams-index', ctx);
        });
    };
};

TeamsView.prototype.show = function() {
    return function(req, res) {
        res.render('team', {
            team: res.locals.team
        });
    };
};

TeamsView.prototype.editorGet = function() {
    var self = this;
    return function(req, res) {
        var ctx = {
            team: new self.model({
                spots: ['']
            }),
            formAction: '/teams'
        };
        if (res.locals.team) {
            ctx = {
                team: res.locals.team,
                formAction: '/teams/' + res.locals.team._id
            };
        }
        res.render('team-form', ctx);
    };
};

TeamsView.prototype.formPost = function() {
    var self = this;
    return function(req, res, next) {
        var team = new self.model(req.body);
        if (res.locals.team) {
            team = _.defaults(req.body, res.locals.team);
        }
        team.save(function(err, saved) {
            if (err || !saved) {
                return next(err || 'save failed');
            }
            res.redirect('/teams/' + saved._id);
        });
    };
};
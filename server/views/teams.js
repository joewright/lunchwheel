var _ = require('lodash');
var TeamsView = module.exports = function(options) {
    this.model = options.model;
};

TeamsView.prototype.load = function() {
    var self = this;
    return function(req, res, next) {
        if (req.params.id) {
            return self.model.get(req.params.id, function(err, existing) {
                if (err || !existing) {
                    return res.status(404).render('404');
                }
                res.locals.team = existing;
                next();
            });
        }
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
            formAction: '/teams',
            formMethod: 'post'
        };
        if (res.locals.team) {
            ctx = {
                team: res.locals.team,
                formAction: '/teams/' + res.locals.team._id,
                formMethod: 'post'
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
            team = _.defaults(team, res.locals.team);
        }
        team.save(function(err, saved) {
            if (err || !saved) {
                return next(err || 'save failed');
            }
            res.redirect('/teams/' + saved._id);
        });
    };
};
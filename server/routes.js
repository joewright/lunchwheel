var TeamModel = require('./models/team');
var BaseView = require('./views');
var TeamsView = require('./views/teams');
var bodyParser = require('body-parser');

exports.setup = function(app) {
    var views = new BaseView();
    TeamModel.connect(app.get('db'));
    var teamViews = new TeamsView({
        model: TeamModel
    });
    app.get('/', views.homeGet());

    app.get('/teams/new', teamViews.editorGet());
    app.get('/teams/:id/edit', teamViews.load(), teamViews.editorGet());
    app.get('/teams/:id', teamViews.load(), teamViews.show());

    app.post('/teams', bodyParser.urlencoded({extended:true}), teamViews.formPost());
    // html can't do put requests. boy howdy
    app.post('/teams/:id', teamViews.load(), bodyParser.urlencoded({extended:true}), teamViews.formPost());
};
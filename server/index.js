var path = require('path');
var express = require('express');
var swig = require('swig');

var Config = {
    WEB_PORT: process.env.WEB_PORT || 3000,
    APP_ENV: process.env.APP_ENV || 'local',
    COUCH_URL: process.env.COUCH_URL || 'http://localhost:5984',
    COUCH_DB_NAME: process.env.COUCH_DB_NAME || 'lunchwheel',
    PUBLIC_DIR: path.join(__dirname, 'public')
};
Config.COUCHDB_URL = Config.COUCH_URL + '/' + Config.COUCH_DB_NAME;

var PouchDB = require('pouchdb');


// start a server
exports.start = function() {
    var app = express();
    
    // add a database connection
    app.set('db', new PouchDB(Config.COUCHDB_URL));

    // setup swig templating
    app.engine('html', swig.renderFile);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/templates');
    if (Config.APP_ENV !== 'production') {
        // disable cache for development
        swig.setDefaults({
            cache: false
        });
        app.set('view cache', false);
    }

    app.use(express.static(Config.PUBLIC_DIR));

    // add views
    require('./routes').setup(app);

    // listen for connections
    app.listen(Config.WEB_PORT, function() {
        console.log('Web server listening on port', Config.WEB_PORT);
    });
    return app;
};
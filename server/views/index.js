var IndexViews = module.exports = function() {};

IndexViews.prototype.homeGet = function() {
    return function(req, res) {
        return res.render('home');
    };
};
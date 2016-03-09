var model = require('../comp.json');
exports.index = function(req, res) {
    model.title = 'One Less Shower a Day';


    res.render('index', model);
};

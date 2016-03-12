var showerModel = require('../comp.json');
exports.one_less_shower = function(req, res) {
    showerModel.title = 'One Less Shower a Day';

    res.render('one_less_shower', showerModel);
};


exports.map = function(req, res) {
    var mapModel = {
        title: 'The drought and you'
    }

    res.render('map', mapModel);
};

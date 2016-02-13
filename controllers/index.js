(function() {
    'use strict';

    exports.index = function(req, res) {
        let model = {
            title: 'Vis it up',
        };


        res.render('index', model);
    };

}());

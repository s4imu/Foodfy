const data = require('../data.json')

exports.index = function(req, res) {
    return res.render('admin/index', {recipes: data.recipes})
}
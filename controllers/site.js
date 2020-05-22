const data = require('../data.json')

exports.index = function(req, res) {
    return res.render('site/index', {recipes: data.recipes})
}

exports.about = function(req,res) {
    return res.render('site/about')
}

exports.recipes = function(req,res) {
    return res.render('site/recipes', { recipes: data.recipes })
}

exports.recipe =  function (req, res) {
    const recipeIndex = req.params.index
    
    const recipe = data.recipes.find(function(recipe) {
        return recipeIndex == recipe.id
    })

    return res.render('site/recipe', {recipe})

  }
const Recipe = require('../models/Recipe')
const Chef = require('../models/Chef')

module.exports = {
    index(req, res) {

        const { filter } = req.query

        if (filter) {
            Recipe.findBy(filter, function (recipes) {
                return res.render('site/results', { recipes, filter })
            })
        } else {

            Recipe.all(function (recipes) {
                return res.render('site/index', { recipes })
            })
        }

    },
    about(req, res) {
        return res.render('site/about')
    },
    recipes(req, res) {
        Recipe.all(function (recipes) {
            return res.render('site/recipes', { recipes })
        })
    },
    recipe(req, res) {
        Recipe.find(req.params.id, function (recipe) {
            if (!recipe) {
                return res.send("Recipe not found")
            }

            return res.render('site/recipe', { recipe })
        })
    },
    chefs(req, res) {
        Chef.all(function (chefs) {
            return res.render('site/chefs', { chefs })
        })
    }
}
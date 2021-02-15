const Recipe = require('../models/Recipe')
const Chef = require('../models/Chef')

module.exports = {
    async index(req, res) {

        const { filter } = req.query

        if (filter) {
            
            let results = await Recipe.findBy(filter)
            const recipes = results.rows 
            return res.render('site/results', { recipes, filter })

        } else {
           
            let results = await Recipe.all()  
            const recipes = results.rows
            return res.render('site/index', { recipes })
        }

    },
    about(req, res) {
        return res.render('site/about')
    },
    async recipes(req, res) {
        const results = await Recipe.all() 
        const recipes = results.rows

        return res.render('site/recipes', { recipes })
    },
    async recipe(req, res) {
        const result = await Recipe.find(req.params.id) 
        const recipe = result.rows[0]
        
        if (!recipe) return res.send("Recipe not found")

        return res.render('site/recipe', { recipe })
    },
    async chefs(req, res) {
        const results = await Chef.all()
        const chefs = results.rows

        return res.render('site/chefs', { chefs })
    }
}
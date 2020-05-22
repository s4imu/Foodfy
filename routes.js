const express = require ('express')
const routes = express.Router()
const site = require('./controllers/site')
const recipes = require('./controllers/admin')

routes.get("/", function(req,res) {
    return res.redirect('/index')
})

routes.get("/index", site.index)
routes.get("/about", site.about)
routes.get("/recipes", site.recipes)
routes.get("/recipe/:index", site.recipe)

routes.get("/admin/recipes", recipes.index)
routes.get("/admin/recipe/:id", recipes.show)
routes.get("/admin/recipes/create", recipes.create)
routes.get("/admin/recipe/:id/edit", recipes.edit)

routes.post("/admin/recipes", recipes.post)
routes.put("/admin/recipes", recipes.put)
routes.delete("/admin/recipes", recipes.delete)
module.exports = routes
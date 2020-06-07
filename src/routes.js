const express = require('express')
const routes = express.Router()
const site = require('./app/controllers/site')
const recipes = require('./app/controllers/admin')

routes.get("/", function (req, res) {
    return res.redirect('/index')
})

routes.get("/index", site.index)
routes.get("/about", site.about)
routes.get("/recipes", site.recipes)
routes.get("/chefs", site.chefs)
routes.get("/recipe/:id", site.recipe)

routes.get("/admin/recipes", recipes.indexRecipe)
routes.get("/admin/recipe/:id", recipes.showRecipe)
routes.get("/admin/recipes/create", recipes.createRecipe)
routes.get("/admin/recipe/:id/edit", recipes.editRecipe)

routes.post("/admin/recipes", recipes.postRecipe)
routes.put("/admin/recipes", recipes.putRecipe)
routes.delete("/admin/recipes", recipes.deleteRecipe)

routes.get("/admin/chefs", recipes.indexChef)
routes.get("/admin/chefs/create", recipes.createChef)
routes.get("/admin/chef/:id", recipes.showChef)
routes.get("/admin/chef/:id/edit", recipes.editChef)

routes.post("/admin/chefs", recipes.postChef)
routes.put("/admin/chefs", recipes.putChef)
routes.delete("/admin/chefs", recipes.deleteChef)

module.exports = routes
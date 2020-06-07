const Recipe = require('../models/Recipe')
const Chef = require('../models/Chef')

module.exports = {
    indexRecipe(req, res) {
        Recipe.all(function (recipes) {
            return res.render('admin/index', { recipes })
        })

    },
    createRecipe(req, res) {
        return res.render('admin/create')
    },
    postRecipe(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == "") {
                return res.send("Preencha todos os campos")
            }
        }

        Recipe.create(req.body, function (recipe) {
            return res.redirect(`/admin/recipe/${recipe.id}`)
        })
    },
    showRecipe(req, res) {
        Recipe.find(req.params.id, function (recipe) {
            if (!recipe) {
                return res.send("Recipe not found")
            }

            return res.render('admin/recipe', { recipe })
        })
    },
    editRecipe(req, res) {
        Recipe.find(req.params.id, function (recipe) {
            if (!recipe) {
                return res.send("Recipe Not Found")
            }

            Recipe.chefSelectOption(function (options) {
                return res.render('admin/edit', { recipe, chefOptions: options })
            })

        })

    },
    putRecipe(req, res) {

        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[keys] == "") {
                return res.send("Preencha todos os campos")
            }
        }

        Recipe.update(req.body, function () {
            return res.redirect(`/admin/recipe/${req.body.id}`)
        })


    },
    deleteRecipe(req, res) {

        Recipe.delete(req.body.id, function () {
            return res.redirect("admin/index")
        })
    },
    indexChef(req, res) {
        Chef.all(function (chefs) {
            return res.render('admin/indexChef', { chefs })
        })
    },
    createChef(req, res) {
        return res.render('admin/createChef')
    },
    postChef(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == "") {
                return res.send("Preencha todos os campos")
            }
        }

        Chef.create(req.body, function (chef) {
            return res.redirect(`/admin/chef/${chef.id}`)
        })
    },
    showChef(req, res) {
        Chef.find(req.params.id, function (chef) {
            if (!chef) {
                return res.send("Chef not found")
            }

            Recipe.chefRecipes(chef.id, function (recipes) {
                return res.render('admin/chef', { chef, recipes })
            })

        })
    },
    editChef(req, res) {
        Chef.find(req.params.id, function (chef) {
            if (!chef) {
                return res.send("Chef Not Found")
            }

            return res.render('admin/editChef', { chef })
        })
    },
    putChef(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == "") {
                return res.send("Preencha todos os campos")
            }
        }

        Chef.update(req.body, function () {
            return res.redirect(`/admin/chef/${req.body.id}`)
        })
    },
    deleteChef(req, res) {
        Chef.find(req.body.id, function (chef) {
            if (!chef) {
                return res.send("Chef not found")
            }

            const numberRecipes = chef.total_recipes

            if (numberRecipes > 0) {
                return res.send("Impossível excluir chefe")
            } else {
                Chef.delete(chef.id, function () {
                    return res.redirect("/admin/chefs")
                })
            }

        })
    }
}
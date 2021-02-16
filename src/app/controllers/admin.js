const Recipe = require('../models/Recipe')
const Chef = require('../models/Chef')
const File = require('../models/File')

module.exports = {
   async indexRecipe(req, res) {

    const results = await Recipe.all()
    const recipes = results.rows
        
    return res.render('admin/index', { recipes })

    },
    createRecipe(req, res) {
       return res.render('admin/create')
    },
    async postRecipe(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == "") {
                return res.send("Preencha todos os campos")
            }
        }

        if(req.files.length == 0){
            return res.send("Por favor envie pelo menos uma imagem")
        }

        let results = await Recipe.create(req.body)
        const recipeId = results.rows[0].id

        const filesPromise = req.files.map(file => File.create({file}))
        const filesResults = await Promise.all(filesPromise)

        const recipeFilesPromises = filesResults.map(file => {
            const fileId = file.rows[0].id

            File.createRecipeFiles(fileId, recipeId)
        })

        await Promise.all(recipeFilesPromises)

        return res.redirect(`/admin/recipe/${recipeId}`)
        
    },
    async showRecipe(req, res) {
        const results = await Recipe.find(req.params.id)
        const recipe = results.rows[0]

        if (!recipe) return res.send("Recipe not found")

            return res.render(`admin/recipe`, { recipe })
    
    },
    async editRecipe(req, res) {
        let results = await Recipe.find(req.params.id)
        const recipe = results.rows[0]
           
        if (!recipe) return res.send("Recipe Not Found")

        results = await Recipe.chefSelectOption()
        const chefOptions = results.rows 
        
        return res.render(`admin/edit`, { recipe, chefOptions })
            

    },
    async putRecipe(req, res) {

        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[keys] == "") {
                return res.send("Preencha todos os campos")
            }
        }

        const results = await Recipe.update(req.body) 
        const recipeId = results.rows[0].id
        
        return res.redirect(`/admin/recipe/${recipeId}`)
    


    },
    async deleteRecipe(req, res) {

        await Recipe.delete(req.body.id)
        
        return res.redirect("admin/index")
        
    },
    async indexChef(req, res) {
        
        const results = await Chef.all()
        const chefs = results.rows

        return res.render('admin/indexChef', { chefs })
        
    },
    createChef(req, res) {
        return res.render('admin/createChef')
    },
    async postChef(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == "") {
                return res.send("Preencha todos os campos")
            }
        }

        const results = await Chef.create(req.body) 
        const chefId = results.rows[0].id

        return res.redirect(`/admin/chef/${chefId}`)

    },
    async showChef(req, res) {
        let results = await Chef.find(req.params.id)
        const chef = results.rows[0]
 
        if (!chef) return res.send("Chef not found")

        results = await Recipe.chefRecipes(chef.id)
        const recipes = results.rows 
        
        return res.render('admin/chef', { chef, recipes })

    },
    async editChef(req, res) {
        
        const results = await Chef.find(req.params.id) 
        const chef = results.rows[0]
        
        if (!chef) return res.send("Chef Not Found")

        return res.render(`admin/editChef/${chef.id}`, { chef })
    },
    async putChef(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == "") {
                return res.send("Preencha todos os campos")
            }
        }
        
        const results = await Chef.update(req.body)
        const chefId = results.rows[0].id
        
        return res.redirect(`/admin/chef/${chefId}`)
    },
    async deleteChef(req, res) {
        
        let results = await Chef.find(req.body.id) 
        const chef = results.rows[0]

        if (!chef) return res.send("Chef not found")

        const numberRecipes = chef.total_recipes

        if (numberRecipes > 0) {
            return res.send("Impossível deletar chef")
        } else {
            await Chef.delete(chef.id) 
            return res.redirect("/admin/chefs")
        }

    }
}
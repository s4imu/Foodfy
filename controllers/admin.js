const fs = require('fs')
const data = require('../data.json')
const { index } = require('../utils')

exports.index = function(req, res) {
    return res.render('admin/index', {recipes: data.recipes})
}

exports.create = function (req, res) {
    return res.render('admin/create')
}

exports.post = function (req,res) {
    const keys = Object.keys(req.body)

    for(let key of keys) {
        if(req.body[key] == ""){
            return res.send("Preencha todos os campos")
        }
    }
    const id =  index(req.body.title)
    const recipe = {
        ...req.body,
        id
    }

    data.recipes.push(recipe)

    fs.writeFile("data.json",JSON.stringify(data,null,2),function(err){
        if(err) {
            return res.send("Erro! Não foi possível criar receita")
        }

        return res.redirect('/admin/recipes')
    })
}

exports.show = function (req, res) { 
    const recipeIndex = req.params.id
    
    const recipe = data.recipes.find(function(recipe) {
        return recipeIndex == recipe.id
    })

    return res.render('admin/recipe', {recipe})
}

exports.edit = function (req, res) {
    const { id } = req.params

    const foundRecipe = data.recipes.find(function(recipe) {
        return recipe.id == id
    })

    if(!foundRecipe){
        return res.send("Não foi possível encontrar receita")
    }

    const recipe = {
        ...foundRecipe
    }

    return res.render('admin/edit', { recipe })
}

exports.put = function(req, res) {
    const { id } = req.body
    let index = 0

    console.log(req.body)
    const foundRecipe = data.recipes.find(function(recipe, foundIndex) {
        if(recipe.id == id){
            index = foundIndex
            return true
        }
    })

    if(!foundRecipe){
        return res.send("Não foi possível encontrar receita")
    }

    const recipe = {
        ...req.body,
    }

  
    data.recipes[index] = recipe

    fs.writeFile("data.json",JSON.stringify(data,null,2),function(err){
        if(err){
            return res.send("Erro de update")
        }

        return res.redirect(`/admin/recipe/${id}`)
    })
}

exports.delete = function(req, res) {
    const { id } = req.body
    
    const filteredRecipes = data.recipes.filter(function (recipe){
        return recipe.id != id
    })

    data.recipes = filteredRecipes

    fs.writeFile("data.json", JSON.stringify(data,null,2),function(err) {
        if(err){
            return res.send("Não foi possível apagar receita")
        }

        return res.redirect('/admin/recipes')
    })
}
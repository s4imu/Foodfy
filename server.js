const express = require('express')
const nunjucks = require('nunjucks')
const recipes = require('./data')

const server = express()

server.use(express.static('public'))
server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req,res) {
    return res.render('index', { recipes })
})

server.get("/about", function(req,res) {
    return res.render('about')
})

server.get("/recipes", function(req,res) {
    return res.render('recipes', { recipes })
})

server.get("/recipe", function(req,res) {
    return res.render('recipe', { recipes })
})

server.get("/recipe/:index", function (req, res) {
    const recipes = recipes
    const recipeIndex = req.params.index;
  
    console.log(recipes[recipeIndex]);

  })

server.listen(5000, function() {

})
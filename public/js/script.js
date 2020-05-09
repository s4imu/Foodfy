const cartoes = document.querySelectorAll('.cartao')
const links = document.querySelectorAll("a")

const currentPage = location.pathname

for (let cartao of cartoes) {
    cartao.addEventListener("click", function () {
        const receitaId = cartao.getAttribute("id")
        window.location.href = `/recipe/${receitaId}`
    })
}
for (let link of links) {
    if (currentPage.includes(link.getAttribute("href"))) {
        link.classList.add("active");
    }
}

function ingredientsButton (){
    const ingredientContent = document.querySelector('.recipeIngredients')
    const ingredientButton = document.querySelector('#ingredientButton')
    
    if(ingredientContent.classList.contains('hide')){
        ingredientButton.innerHTML = 'ESCONDER'
        ingredientContent.classList.remove('hide')
     }else{
        ingredientButton.innerHTML = 'MOSTRAR'
        ingredientContent.classList.add('hide')
    }
}

function preparationButton (){
    const preparationContent = document.querySelector('.recipePreparation')
    const preparationButton = document.querySelector('#prepButton')

    if(preparationContent.classList.contains('hide')){
        preparationButton.innerHTML = 'ESCONDER'
        preparationContent.classList.remove('hide')
     }else{
        preparationButton.innerHTML = 'MOSTRAR'
        preparationContent.classList.add('hide')
    }
}

function infoButton (){
    const infosContent = document.querySelector('.recipeInfo')
    const infosButton = document.querySelector('#infoButton')
   
    if(infosContent.classList.contains('hide')){
        infosButton.innerHTML = 'ESCONDER'
        infosContent.classList.remove('hide')
     }else{
        infosButton.innerHTML = 'MOSTRAR'
        infosContent.classList.add('hide')
    }
}
const cartoes = document.querySelectorAll('.cartao')
const links = document.querySelectorAll("a")
const cards = document.querySelectorAll('.admCard')
const currentPage = location.pathname

for (let cartao of cartoes) {
    cartao.addEventListener("click", function () {
        const receitaId = cartao.getAttribute("id")
        window.location.href = `/recipe/${receitaId}`
    })
}

for (let card of cards) {
    card.addEventListener("click", function () {
        const receitaId = card.getAttribute("id")
        window.location.href = `/admin/recipe/${receitaId}`
    })
}

for (let link of links) {
    if (currentPage.includes(link.getAttribute("href"))) {
        link.classList.add("active")
    }
}

function ingredientsButton() {
    const ingredientContent = document.querySelector('.recipeIngredients')
    const ingredientButton = document.querySelector('#ingredientButton')

    if (ingredientContent.classList.contains('hide')) {
        ingredientButton.innerHTML = 'ESCONDER'
        ingredientContent.classList.remove('hide')
    } else {
        ingredientButton.innerHTML = 'MOSTRAR'
        ingredientContent.classList.add('hide')
    }
}

function preparationButton() {
    const preparationContent = document.querySelector('.recipePreparation')
    const preparationButton = document.querySelector('#prepButton')

    if (preparationContent.classList.contains('hide')) {
        preparationButton.innerHTML = 'ESCONDER'
        preparationContent.classList.remove('hide')
    } else {
        preparationButton.innerHTML = 'MOSTRAR'
        preparationContent.classList.add('hide')
    }
}

function infoButton() {
    const infosContent = document.querySelector('.recipeInfo')
    const infosButton = document.querySelector('#infoButton')

    if (infosContent.classList.contains('hide')) {
        infosButton.innerHTML = 'ESCONDER'
        infosContent.classList.remove('hide')
    } else {
        infosButton.innerHTML = 'MOSTRAR'
        infosContent.classList.add('hide')
    }
}

function addIngredient() {
    const ingredients = document.querySelector('#ingredients')
    const fieldContainer = document.querySelectorAll('.ingredient')

    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

    if (newField.children[0].value == "") return false

    newField.children[0].value = ""
    ingredients.appendChild(newField)

}

document
    .querySelector('.add-ingredient')
    .addEventListener('click', addIngredient);

function addPreparation() {
    const preparation = document.querySelector('#preparation')
    const fieldContainer = document.querySelectorAll('.preparation')

    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true)

    if (newField.children[0].value == "") return false

    newField.children[0].value = ""
    preparation.appendChild(newField)
}

document
    .querySelector('.add-preparation')
    .addEventListener('click', addPreparation);
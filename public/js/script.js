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

const PhotosUpload = {
    input: "",
    preview: document.querySelector('#photos-preview'),
    uploadLimit: 5,
    files: [],
    handleFileInput(event) {
        const { files: fileList } = event.target
        PhotosUpload.input = event.target
        
        if (PhotosUpload.hasLimit(event)) return
    
        Array.from(fileList).forEach(file => {
            
            PhotosUpload.files.push(file)
            
            const reader = new FileReader()
    
            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)
    
                const div = PhotosUpload.getContainer(image)
    
                PhotosUpload.preview.appendChild(div)
            }
    
            reader.readAsDataURL(file)
        })

        PhotosUpload.input.files = PhotosUpload.getAllFiles()
    },
    hasLimit(event) {
        const { uploadLimit, input, preview } = PhotosUpload
        const { files: fileList } = input
        
        if (fileList.length > uploadLimit) {
            alert(`Envie no máximo até ${uploadLimit} fotos`)
            event.preventDefault()
            return true
        }

        const photosDiv = []
        preview.childNodes.forEach(item => {
            if(item.classList && item.classList.value == "photo")
                photosDiv.push(item)
        })

        const totalPhotos = fileList.length + photosDiv.length

        if(totalPhotos > uploadLimit){
            alert(`You reached the maximum limit of photos`)
            event.preventDefault()
            return true
        }

        return false
    },
    getAllFiles(){
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files

    },
    getContainer(image) {
        const div = document.createElement('div')
        div.classList.add('photo')
    
        div.onclick = PhotosUpload.removePhoto
    
        div.appendChild(image)
    
        div.appendChild(PhotosUpload.getRemoveButton())
    
        return div
    },
    getRemoveButton() {
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "close"
        
        return button
    },
    removePhoto(event) {
        const photoDiv = event.target.parentNode
        const photosArray = Array.from(PhotosUpload.preview.children)
        const index = photosArray.indexOf(photoDiv)

        PhotosUpload.files.splice(index, 1)
        PhotosUpload.input.files = PhotosUpload.getAllFiles()

        photoDiv.remove()
    },
    removeOldPhoto(event){
        const photoDiv = event.target.parentNode

        if(photoDiv){
            const removedFiles = document.querySelector('input[name="removed_files"]')
            if(removedFiles){
                removedFiles.value += `${photoDiv.id},`
            }
        }
        photoDiv.remove()
    }
    
}

// const ImageGallery = {
//     highlight: document.querySelector('.gallery .highlight > img'),
//     previews: document.querySelectorAll('.gallery-preview img'),
//     setImage(event){
//         const { target } = event
        
//         ImageGallery.previews.forEach(preview => preview.classList.remove('active'))
//         target.classList.add('active')

//         ImageGallery.highlight.src = target.src
//         Lightbox.image.src = target.src
//     }
// }

// const Lightbox = {
//     target: document.querySelector('.lightbox-target'),
//     image: document.querySelector('.lightbox-target img'),
//     closeButton: document.querySelector('.lightbox-target a.lightbox-close'),
//     open(){
//         Lightbox.target.style.opacity = 1
//         Lightbox.target.style.top = 0
//         Lightbox.target.style.bottom = 0
//         Lightbox.closeButton.style.top = 0 
//     }
//     ,
//     close(){
//         Lightbox.target.style.opacity = 0
//         Lightbox.target.style.top = "-100%"
//         Lightbox.target.style.bottom = "initial"
//         Lightbox.closeButton.style.top = "-80px" 
//     }
// }
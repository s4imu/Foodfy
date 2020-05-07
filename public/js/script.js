const modalOverlay = document.querySelector('.modalOverlay')
const cartoes = document.querySelectorAll('.cartao')

for (let cartao of cartoes) {
    cartao.addEventListener("click", function () {
        const receitaId = cartao.getAttribute("id")
        const nome = cartao.querySelector("#nome").textContent
        const autor = cartao.querySelector("#autor").textContent
        modalOverlay.classList.add('active')
        modalOverlay.querySelector('img').src = `/img/${receitaId}.png`
        modalOverlay.querySelector('.autorModal').innerHTML = `${autor}`
        modalOverlay.querySelector('.nomeModal').innerHTML = `${nome}`

    })
}





document.querySelector("#closeModal").addEventListener("click", function () {
    modalOverlay.classList.remove('active')
})
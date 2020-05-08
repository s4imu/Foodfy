const modalOverlay = document.querySelector('.modalOverlay')
const cartoes = document.querySelectorAll('.cartao')

for (let cartao of cartoes) {
    cartao.addEventListener("click", function () {
        const receitaId = cartao.getAttribute("id")
        window.location.href = `/recipe/${receitaId}`
    })
}

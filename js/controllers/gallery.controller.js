'use strict'

function renderGallery() {
    const imgCards = []
    const imgs = getAllImgs()

    imgs.forEach(img => {
        const imgCard = `<article class="image"><img src="${img.url}"></article>`
        imgCards.push(imgCard)
    })

    document.querySelector('.gallery .images').innerHTML = imgCards.join('')
}
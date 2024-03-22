'use strict'

function renderSavedMemes() {
    const imgCards = []
    const memes = getAllMemes()

    memes.forEach(meme => {
        const imgCard = `<article class="card"><img src="${meme.snapshotImgData}" onclick="onImgSelect('${meme.img.id}')"></article>`
        imgCards.push(imgCard)
    })

    document.querySelector('.saved .cards').innerHTML = imgCards.join('')
}

function onImgSelect(imgId) {
    onSetActiveSection('editor')
    initMemeEditor(null, imgId)
}
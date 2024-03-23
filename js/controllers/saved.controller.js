'use strict'

function initSavedMemes() {
    renderSavedMemes()
}

function renderSavedMemes() {
    const imgCards = []
    const memes = getAllMemes()

    memes.forEach(meme => {
        const imgCard = `<article class="card"><img src="${meme.snapshotImgData}" onclick="onSavedMemeSelect('${meme.id}')"></article>`
        imgCards.push(imgCard)
    })

    document.querySelector('.saved .cards').innerHTML = imgCards.join('')
}

function onSavedMemeSelect(memeId) {
    onSetActiveSection('editor')
    initMemeEditor(memeId, null)
}
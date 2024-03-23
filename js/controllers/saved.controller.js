'use strict'

function initSavedMemes() {
    renderSavedMemes()
}

function renderSavedMemes() {
    const imgCards = []
    const memes = getAllMemes()

    memes.forEach(meme => {
        const imgCard = `<article class="card">
            <a href="#" class="btn delete-meme fa-solid trash" onclick="onDeleteSavedMeme('${meme.id}')"></a>
            <img src="${meme.snapshotImgData}" onclick="onSavedMemeSelect('${meme.id}')">
        </article>`
        imgCards.push(imgCard)
    })

    document.querySelector('.saved .cards').innerHTML = imgCards.join('')
}

function onSavedMemeSelect(memeId) {
    onSetActiveSection('editor')
    initMemeEditor(memeId, null)
}

function onDeleteSavedMeme(memeId) {
    deleteMeme(memeId)
    activateMsgBox('Meme Deleted')
    initSavedMemes()
}

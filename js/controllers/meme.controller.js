'use strict'

let gCurrMeme

function initMemeEditor(memeId, imgId) {
    setMemeCanvas()
    setCurrMeme(memeId, imgId)
    initLines()
    renderMeme()
}

function setCurrMeme(memeId, imgId) {
    if (memeId) gCurrMeme = getMeme(memeId)
    else gCurrMeme = getNewMeme(imgId)
}

function getCurrMeme() {
    return gCurrMeme
}

function renderMeme() {
    const lines = getLines()
    const currLineIdx = getLineIdx()
    drawImageWithLines(gCurrMeme.img.url, lines, currLineIdx)

    const currLine = getCurrLine()
    if (!currLine) return
    document.querySelector('.editor .meme-line').value = currLine.txt
    document.querySelector('.editor .line-color').value = currLine.strokeStyle
    document.querySelector('.editor .fill-color').value = currLine.fillStyle
}

function downloadMeme(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}
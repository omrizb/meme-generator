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
    setElementsLineColor(currLine)
    setElementsFillColor(currLine)
}

function setElementsLineColor(line) {
    document.querySelector('.editor .line-color').value = line.strokeStyle
    document.documentElement.style.setProperty('--line-color', line.strokeStyle)
}

function setElementsFillColor(line) {
    document.querySelector('.editor .fill-color').value = line.fillStyle
    document.documentElement.style.setProperty('--line-fill-color', line.fillStyle)
}

function downloadMeme(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}
'use strict'

let gCurrMeme

function initMemeEditor(memeId, imgId) {
    setMemeCanvas('edit-meme')
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
    setSelectedTextAlign(currLine)
}

function setElementsLineColor(line) {
    document.querySelector('.editor .line-color').value = line.strokeStyle
    document.documentElement.style.setProperty('--line-color', line.strokeStyle)
}

function setElementsFillColor(line) {
    document.querySelector('.editor .fill-color').value = line.fillStyle
    document.documentElement.style.setProperty('--line-fill-color', line.fillStyle)
}

function setSelectedTextAlign(line) {
    document.querySelector('.align-left').classList.remove('selected')
    document.querySelector('.align-center').classList.remove('selected')
    document.querySelector('.align-right').classList.remove('selected')

    switch (line.textAlign) {
        case 'left':
            document.querySelector('.align-left').classList.add('selected')
            break
        case 'center':
            document.querySelector('.align-center').classList.add('selected')
            break
        case 'right':
            document.querySelector('.align-right').classList.add('selected')
            break
    }
}

function onSaveMeme() {
    gCurrMeme.snapshotImgData = getImgDataUrl()
    saveMeme(gCurrMeme)

    activateMsgBox('Meme saved')

    renderSavedMemes()
}

function onDownloadMeme(elLink) {
    // const elTmpCanvas = document.createElement('canvas')
    // elTmpCanvas.classList.add('tmp-canvas')
    // document.body.appendChild(elTmpCanvas)
    // setMemeCanvas('tmp-canvas')
    // drawImageWithLines(gCurrMeme.img.url, gCurrMeme.lines, 0)

    const imgContent = getImgDataUrl()
    elLink.href = imgContent
}
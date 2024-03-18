'use strict'

let gCurrMeme
let gCurrLineIdx

function initMemeEditor(memeId, imgId) {
    setMemeCanvas()
    setCurrMeme(memeId, imgId)
    gCurrLineIdx = 0
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
    drawImageWithLines(gCurrMeme.img.url, gCurrMeme.lines, gCurrLineIdx)

    const currLine = gCurrMeme.lines[gCurrLineIdx]
    if (!currLine) return
    document.querySelector('.editor .meme-line').value = currLine.txt
    document.querySelector('.editor .line-color').value = currLine.strokeStyle
    document.querySelector('.editor .fill-color').value = currLine.fillStyle
}

function onAddLine() {
    const currLine = gCurrMeme.lines[gCurrLineIdx]
    const x = (currLine) ? currLine.posPercent.x + 5 : 50
    const y = (currLine) ? currLine.posPercent.y + 5 : 20

    const newLine = getNewLine('Say something smart...')
    newLine.strokeStyle = document.querySelector('.editor .line-color').value
    newLine.fillStyle = document.querySelector('.editor .fill-color').value
    newLine.posPercent.x = x
    newLine.posPercent.y = y

    gCurrMeme.lines.push(newLine)
    gCurrLineIdx = gCurrMeme.lines.length - 1
    renderMeme()
}

function onSwitchLine() {
    gCurrLineIdx = (gCurrLineIdx === gCurrMeme.lines.length - 1) ? 0 : gCurrLineIdx + 1
    renderMeme()
}

function onDeleteLine() {
    gCurrMeme.lines.splice(gCurrLineIdx, 1)
    gCurrLineIdx = (gCurrLineIdx === 0) ? gCurrMeme.lines.length - 1 : gCurrLineIdx - 1
    renderMeme()
}

function onUpdateMemeLine(elLine) {
    if (!gCurrMeme.lines[gCurrLineIdx]) return
    gCurrMeme.lines[gCurrLineIdx].txt = elLine.value
    renderMeme()
}

function onUpdateLineColor(elColor) {
    if (!gCurrMeme.lines[gCurrLineIdx]) return
    gCurrMeme.lines[gCurrLineIdx].strokeStyle = elColor.value
    renderMeme()
}

function onUpdateFillColor(elColor) {
    if (!gCurrMeme.lines[gCurrLineIdx]) return
    gCurrMeme.lines[gCurrLineIdx].fillStyle = elColor.value
    renderMeme()
}

function onIncreaseFontSize() {
    const currFontSize = +gCurrMeme.lines[gCurrLineIdx].fontSize
    if (currFontSize > 70) return

    gCurrMeme.lines[gCurrLineIdx].fontSize = (currFontSize + 2) + ''
    renderMeme()
}

function onDecreaseFontSize() {
    const currFontSize = +gCurrMeme.lines[gCurrLineIdx].fontSize
    if (currFontSize < 16) return

    gCurrMeme.lines[gCurrLineIdx].fontSize = (currFontSize - 2) + ''
    renderMeme()
}

function setCurrMemeLineDrag(lineIdx, value) {
    if (lineIdx === -1) return
    gCurrMeme.lines[lineIdx].isDrag = value
}

function setLinePos(lineIdx, newX, newY) {
    const line = gCurrMeme.lines[lineIdx]
    line.posPercent.x = newX
    line.posPercent.y = newY
    renderMeme()
}

function downloadMeme(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}
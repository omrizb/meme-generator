'use strict'

const TEXT_FONT = 'arial'
const TEXT_SIZE = '45'
const TEXT_LINE_WIDTH = '2'
const TEXT_LINE_COLOR = 'darkred'
const TEXT_FILL_COLOR = 'orange'

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

    const newLine = {
        txt: 'Say something smart...',
        fontFace: 'arial',
        fontSize: 36,
        lineWidth: 2,
        strokeStyle: document.querySelector('.editor .line-color').value,
        fillStyle: document.querySelector('.editor .fill-color').value,
        posPercent: {
            x,
            y
        }
    }

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

function downloadMeme(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}
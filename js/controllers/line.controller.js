'use strict'

let gLines
let gCurrLineIdx

function initLines() {
    gLines = getCurrMeme().lines
    gCurrLineIdx = 0
}

function getLines() {
    return gLines
}

function getCurrLine() {
    return gLines[gCurrLineIdx]
}

function getLineIdx() {
    return gCurrLineIdx
}

function onAddLine() {
    const currLine = getCurrLine()
    const x = (currLine) ? currLine.posPercent.x + 5 : 50
    const y = (currLine) ? currLine.posPercent.y + 5 : 20

    const newLine = getNewLine('Say something smart...')
    newLine.strokeStyle = document.querySelector('.editor .line-color').value
    newLine.fillStyle = document.querySelector('.editor .fill-color').value
    newLine.posPercent.x = x
    newLine.posPercent.y = y

    gLines.push(newLine)
    gCurrLineIdx = gLines.length - 1
    renderMeme()
}

function onSwitchLine() {
    gCurrLineIdx = (gCurrLineIdx === gLines.length - 1) ? 0 : gCurrLineIdx + 1
    renderMeme()
}

function onDeleteLine() {
    gLines.splice(gCurrLineIdx, 1)
    gCurrLineIdx = (gCurrLineIdx === 0) ? gLines.length - 1 : gCurrLineIdx - 1
    renderMeme()
}

function onUpdateMemeLine(elLine) {
    if (gLines.length === 0) return
    getCurrLine().txt = elLine.value
    renderMeme()
}

function onUpdateLineColor(elColor) {
    if (gLines.length === 0) return
    getCurrLine().strokeStyle = elColor.value
    renderMeme()
}

function onUpdateFillColor(elColor) {
    if (gLines.length === 0) return
    getCurrLine().fillStyle = elColor.value
    renderMeme()
}

function onIncreaseFontSize() {
    const currFontSize = +getCurrLine().fontSize
    if (currFontSize > 70) return

    getCurrLine().fontSize = (currFontSize + 2) + ''
    renderMeme()
}

function onDecreaseFontSize() {
    const currFontSize = +getCurrLine().fontSize
    if (currFontSize < 16) return

    getCurrLine().fontSize = (currFontSize - 2) + ''
    renderMeme()
}

function selectLine(idx) {
    gCurrLineIdx = idx
    renderMeme()
}

function setCurrMemeLineDrag(lineIdx, value) {
    if (lineIdx === -1) return
    gLines[lineIdx].isDrag = value
}

function setLinePos(lineIdx, newX, newY) {
    const line = gLines[lineIdx]
    line.posPercent.x = newX
    line.posPercent.y = newY
    renderMeme()
}
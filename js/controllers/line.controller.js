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

    const lineProps = {
        txt: 'Say something smart...',
        strokeStyle: document.querySelector('.line-color').value,
        fillStyle: document.querySelector('.fill-color').value,
        textAlign: getSelectedTextAlign(),
        posPercent: { x, y }
    }
    const newLine = getNewLine(lineProps)

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

function onChangeTextAlign(newAlign) {
    if (gLines.length === 0) return
    changeLineTextAlign(newAlign)
}

function selectLine(idx) {
    gCurrLineIdx = idx
    renderMeme()
}

function setCurrMemeLineDrag(lineIdx, value) {
    if (lineIdx === -1) return
    gLines[lineIdx].isDrag = value
}

function getSelectedTextAlign() {
    let val
    document.querySelectorAll('.text-align').forEach(el => {
        if (el.classList.contains('selected')) val = el.dataset.align
    })
    return val
}

function changeLineTextAlign(newAlign) {
    const line = getCurrLine()
    if (line.textAlign === newAlign) return

    const alignIdx = {
        left: 0,
        center: 1,
        right: 2
    }

    const linePos = getCanvasPosFromPercent(line.posPercent.x, line.posPercent.y)
    const { dx } = getTextFrameMetrics(line)
    const newX = linePos.x + (alignIdx[newAlign] - alignIdx[line.textAlign]) * dx

    line.textAlign = newAlign
    const newPosPercent = getCanvasPercentFromPos(newX, linePos.y)
    setLinePos(gCurrLineIdx, newPosPercent.widthPercent, newPosPercent.heightPercent)
}

function setLinePos(lineIdx, newX, newY) {
    const line = gLines[lineIdx]
    line.posPercent.x = newX
    line.posPercent.y = newY
    renderMeme()
}
'use strict'

const TEXT_FONT = 'arial'
const TEXT_SIZE = '45'
const TEXT_LINE_WIDTH = '2'
const TEXT_LINE_COLOR = 'darkred'
const TEXT_FILL_COLOR = 'orange'

let gElCanvas
let gCtx
let gCurrMeme
let gCurrLineIdx

function initMemeEditor(memeId, imgId) {
    setMemeCanvas()
    setCurrMeme(memeId, imgId)
    gCurrLineIdx = 0
    renderMeme()
}

function setMemeCanvas() {
    gElCanvas = document.querySelector('canvas.edit-meme')
    gCtx = gElCanvas.getContext('2d')
}

function setCurrMeme(memeId, imgId) {
    if (memeId) gCurrMeme = getMeme(memeId)
    else gCurrMeme = getNewMeme(imgId)
}

function renderMeme() {
    const elImg = new Image()
    elImg.src = gCurrMeme.img.url
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawLines(gCurrMeme.lines)
    }

    const currLine = gCurrMeme.lines[gCurrLineIdx]
    if (!currLine) return
    document.querySelector('.editor .meme-line').value = currLine.txt
    document.querySelector('.editor .line-color').value = currLine.strokeStyle
    document.querySelector('.editor .fill-color').value = currLine.fillStyle
}

function drawLines(lines) {
    lines.forEach(line => {
        const { fontFace, fontSize, lineWidth, strokeStyle, fillStyle } = line
        setTextProps({
            fontFace,
            fontSize,
            lineWidth,
            strokeStyle,
            fillStyle,
        })

        let textPos = getCanvasPosByPercent(line.posPercent.x, line.posPercent.y)
        drawText(line.txt, textPos.x, textPos.y)
    })
}

function setTextProps(props = {}) {
    let fontFace = props.fontFace || TEXT_FONT
    let fontSize = props.fontSize || TEXT_SIZE
    gCtx.font = `${fontSize}px ${fontFace}`

    gCtx.lineWidth = props.lineWidth || TEXT_LINE_WIDTH
    gCtx.strokeStyle = props.strokeStyle || TEXT_LINE_COLOR
    gCtx.fillStyle = props.fillStyle || TEXT_FILL_COLOR

    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
}

function drawText(text, x, y) {
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function getCanvasPosByPercent(widthPercent, heightPercent) {
    let x = gElCanvas.width * widthPercent / 100
    let y = gElCanvas.height * heightPercent / 100
    return { x, y }
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
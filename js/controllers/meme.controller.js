'use strict'

const TEXT_FONT = 'arial'
const TEXT_SIZE = '45'
const TEXT_LINE_WIDTH = '2'
const TEXT_LINE_COLOR = 'darkred'
const TEXT_FILL_COLOR = 'orange'

let gElCanvas
let gCtx
let gCurrMeme

function initMemeEditor(memeId, imgId) {
    setMemeCanvas()
    setCurrMeme(memeId, imgId)
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

    document.querySelector('.editor .meme-line').value = gCurrMeme.lines[0].txt
    document.querySelector('.editor .line-color').value = gCurrMeme.lines[0].strokeStyle
    document.querySelector('.editor .fill-color').value = gCurrMeme.lines[0].fillStyle
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

function onUpdateMemeLine(elLine) {
    const lineIdx = elLine.dataset.lineIdx
    gCurrMeme.lines[lineIdx].txt = elLine.value
    renderMeme()
}

function onUpdateLineColor(elColor) {
    const lineIdx = elColor.dataset.lineIdx
    gCurrMeme.lines[lineIdx].strokeStyle = elColor.value
    renderMeme()
}

function onUpdateFillColor(elColor) {
    const lineIdx = elColor.dataset.lineIdx
    gCurrMeme.lines[lineIdx].fillStyle = elColor.value
    renderMeme()
}

function onIncreaseFontSize(elIncFontSize) {
    const lineIdx = elIncFontSize.dataset.lineIdx
    const currFontSize = +gCurrMeme.lines[lineIdx].fontSize
    if (currFontSize > 70) return

    gCurrMeme.lines[lineIdx].fontSize = (currFontSize + 2) + ''
    renderMeme()
}

function onDecreaseFontSize(elDecFontSize) {
    const lineIdx = elDecFontSize.dataset.lineIdx
    const currFontSize = +gCurrMeme.lines[lineIdx].fontSize
    if (currFontSize < 16) return

    gCurrMeme.lines[lineIdx].fontSize = (currFontSize - 2) + ''
    renderMeme()
}

function downloadMeme(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}
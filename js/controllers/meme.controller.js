'use strict'

const TEXT_FONT = 'arial'
const TEXT_SIZE = '45px'
const TEXT_LINE_WIDTH = 2
const TEXT_COLOR = 'darkred'
const TEXT_FILL_COLOR = 'orange'

let gElCanvas
let gCtx
let gTextProps

function initCanvas() {
    gElCanvas = document.querySelector('canvas.edit-meme')
    gCtx = gElCanvas.getContext('2d')
    setTextProps()
}

function setTextProps(props = {}) {
    gCtx.lineWidth = props.lineWidth || TEXT_LINE_WIDTH
    gCtx.strokeStyle = props.strokeStyle || TEXT_COLOR
    gCtx.fillStyle = props.fillStyle || TEXT_FILL_COLOR

    let fontFace = props.fontFace || TEXT_FONT
    let fontSize = props.fontSize || TEXT_SIZE
    gCtx.font = `${fontSize} ${fontFace}`

    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
}

function renderMeme() {
    drawImage('./assets/images/memes-square/1.jpg')
    drawText('Noted...', 100, 100)
}

function drawImage(url) {
    const elImg = new Image()
    elImg.src = url
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

        let textPos = getCanvasPosByPercent(50, 20)
        drawText('Meme text here...', textPos.x, textPos.y)
    }
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

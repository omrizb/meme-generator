'use strict'

const TEXT_FONT = 'arial'
const TEXT_SIZE = '45'
const TEXT_LINE_WIDTH = '2'
const TEXT_LINE_COLOR = 'darkred'
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
    let fontFace = props.fontFace || TEXT_FONT
    let fontSize = props.fontSize || TEXT_SIZE
    gCtx.font = `${fontSize}px ${fontFace}`

    gCtx.lineWidth = props.lineWidth || TEXT_LINE_WIDTH
    gCtx.strokeStyle = props.strokeStyle || TEXT_LINE_COLOR
    gCtx.fillStyle = props.fillStyle || TEXT_FILL_COLOR

    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
}

function renderMeme() {
    const meme = getMeme('123')

    const elImg = new Image()
    elImg.src = meme.img.url
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawLines(meme.lines)
    }
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

function drawText(text, x, y) {
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function getCanvasPosByPercent(widthPercent, heightPercent) {
    let x = gElCanvas.width * widthPercent / 100
    let y = gElCanvas.height * heightPercent / 100
    return { x, y }
}

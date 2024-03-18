'use strict'

let gElCanvas
let gCtx

function setMemeCanvas() {
    gElCanvas = document.querySelector('canvas.edit-meme')
    gCtx = gElCanvas.getContext('2d')
}

function drawImageWithLines(imgSrc, lines, currLineIdx) {
    const elImg = new Image()
    elImg.src = imgSrc
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawLines(lines, currLineIdx)
    }
}

function drawLines(lines, currLineIdx) {
    lines.forEach((line, idx) => {
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
        if (idx === currLineIdx) drawTextFrame(line.txt, textPos.x, textPos.y)
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

function drawTextFrame(text, x, y) {
    const txtMetrics = gCtx.measureText(text)
    const dx = Math.ceil(txtMetrics.width / 2) + 5
    const dyUp = Math.ceil(txtMetrics.fontBoundingBoxAscent) + 2
    const dyDown = Math.ceil(txtMetrics.fontBoundingBoxDescent) + 2

    gCtx.strokeRect(x - dx, y - dyUp, 2 * dx, dyUp + dyDown)
}

function getCanvasPosByPercent(widthPercent, heightPercent) {
    let x = gElCanvas.width * widthPercent / 100
    let y = gElCanvas.height * heightPercent / 100
    return { x, y }
}
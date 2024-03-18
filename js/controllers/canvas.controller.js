'use strict'

let gElCanvas
let gCtx
let gIsDown = false
let gMovingLineIdx = -1

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']

function setMemeCanvas() {
    gElCanvas = document.querySelector('canvas.edit-meme')
    gCtx = gElCanvas.getContext('2d')

    addListeners()
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    gIsDown = true
    gElCanvas.classList.add('grabbing')

    const startPos = getEvPos(ev)
    gMovingLineIdx = isPosInsideLine(startPos)
    if (gMovingLineIdx !== -1) setCurrMemeLineDrag(gMovingLineIdx, true)
}

function onMove(ev) {
    if (!gIsDown || gMovingLineIdx === -1) return

    const line = getCurrMeme().lines[gMovingLineIdx]
    if (!line.isDrag) return

    const linePos = getCanvasPosFromPercent(line.posPercent.x, line.posPercent.y)
    const newX = linePos.x + ev.movementX
    const newY = linePos.y + ev.movementY
    const newPosPercent = getCanvasPercentFromPos(newX, newY)
    setLinePos(gMovingLineIdx, newPosPercent.widthPercent, newPosPercent.heightPercent)
}

function onUp() {
    setCurrMemeLineDrag(gMovingLineIdx, false)
    gIsDown = false
    gElCanvas.classList.remove('grabbing')
}

function getEvPos(ev) {

    if (TOUCH_EVENTS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]

        return {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    } else {
        return {
            x: ev.offsetX,
            y: ev.offsetY,
        }
    }

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
        setTextProps(gCtx, line)

        const textPos = getCanvasPosFromPercent(line.posPercent.x, line.posPercent.y)
        drawText(line.txt, textPos.x, textPos.y)
        if (idx === currLineIdx) drawTextFrame(line, textPos.x, textPos.y)
    })
}

function setTextProps(ctx, line) {
    let fontFace = line.fontFace
    let fontSize = line.fontSize
    ctx.font = `${fontSize}px ${fontFace}`

    ctx.lineWidth = line.lineWidth
    ctx.strokeStyle = line.strokeStyle
    ctx.fillStyle = line.fillStyle

    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
}

function drawText(text, x, y) {
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function drawTextFrame(line, x, y) {
    const { dx, dyUp, dyDown } = getTextFrameMetrics(line)

    gCtx.strokeRect(x - dx, y - dyUp, 2 * dx, dyUp + dyDown)
}

function getCanvasPosFromPercent(widthPercent, heightPercent) {
    return {
        x: gElCanvas.width * widthPercent / 100,
        y: gElCanvas.height * heightPercent / 100
    }
}

function getCanvasPercentFromPos(x, y) {
    return {
        widthPercent: 100 * x / gElCanvas.width,
        heightPercent: 100 * y / gElCanvas.height
    }
}

function isPosInsideLine(pos) {
    let res = -1
    const meme = getCurrMeme()
    meme.lines.forEach((line, idx) => {
        const { dx, dyUp, dyDown } = getTextFrameMetrics(line)
        const textPos = getCanvasPosFromPercent(line.posPercent.x, line.posPercent.y)
        if ((pos.x <= textPos.x + dx)
            && (pos.x >= textPos.x - dx)
            && (pos.y <= textPos.y + dyDown)
            && (pos.y >= textPos.y - dyUp)) {
            res = idx
        }
    })
    return res
}

function getTextFrameMetrics(line) {
    const elTempCanvas = document.createElement('canvas')
    const tempCtx = elTempCanvas.getContext('2d')

    setTextProps(tempCtx, line)

    const txtMetrics = tempCtx.measureText(line.txt)

    return {
        dx: Math.ceil(txtMetrics.width / 2) + 8,
        dyUp: Math.ceil(txtMetrics.fontBoundingBoxAscent) + 2,
        dyDown: Math.ceil(txtMetrics.fontBoundingBoxDescent) + 2
    }
}

function getCanvasPosFromPercent(widthPercent, heightPercent) {
    return {
        x: gElCanvas.width * widthPercent / 100,
        y: gElCanvas.height * heightPercent / 100
    }
}

function getCanvasPercentFromPos(x, y) {
    return {
        widthPercent: 100 * x / gElCanvas.width,
        heightPercent: 100 * y / gElCanvas.height
    }
}

function isPosInsideLine(pos) {
    let res = -1
    const meme = getCurrMeme()
    meme.lines.forEach((line, idx) => {
        const { dx, dyUp, dyDown } = getTextFrameMetrics(line)
        const textPos = getCanvasPosFromPercent(line.posPercent.x, line.posPercent.y)
        if ((pos.x <= textPos.x + dx)
            && (pos.x >= textPos.x - dx)
            && (pos.y <= textPos.y + dyDown)
            && (pos.y >= textPos.y - dyUp)) {
            res = idx
        }
    })
    return res
}

function getTextFrameMetrics(line) {
    const elTempCanvas = document.createElement('canvas')
    const tempCtx = elTempCanvas.getContext('2d')

    setTextProps(tempCtx, line)

    const txtMetrics = tempCtx.measureText(line.txt)

    return {
        dx: Math.ceil(txtMetrics.width / 2) + 8,
        dyUp: Math.ceil(txtMetrics.fontBoundingBoxAscent) + 2,
        dyDown: Math.ceil(txtMetrics.fontBoundingBoxDescent) + 2
    }
}
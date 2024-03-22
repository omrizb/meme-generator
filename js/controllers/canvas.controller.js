'use strict'

let gElCanvas
let gCtx
let gIsDown = false
let gMovingLineIdx = -1

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']

function setMemeCanvas(canvasClassName) {
    gElCanvas = document.querySelector(`canvas.${canvasClassName}`)
    gCtx = gElCanvas.getContext('2d')

    resizeCanvas()
    addListeners()
}

function addListeners() {
    addWindowListeners()
    addMouseListeners()
    addTouchListeners()
}

function addWindowListeners() {
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
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
    if (gMovingLineIdx !== -1) {
        setCurrMemeLineDrag(gMovingLineIdx, true)
        selectLine(gMovingLineIdx)
    }
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

function drawImageWithLines(imgSrc, lines, currLineIdx = -1) {
    const elImg = new Image()
    elImg.src = imgSrc
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width

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

    ctx.textAlign = line.textAlign
    ctx.textBaseline = 'middle'
}

function drawText(text, x, y) {
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function drawTextFrame(line, x, y) {
    const { dx, dyUp, dyDown } = getTextFrameMetrics(line)
    let rectStartX

    switch (line.textAlign) {
        case 'left':
            rectStartX = x - 8
            break
        case 'center':
            rectStartX = x - dx - 8
            break
        case 'right':
            rectStartX = x - 2 * dx - 8
            break
    }

    gCtx.strokeRect(rectStartX, y - dyUp - 2, 2 * (dx + 8), dyUp + dyDown + 4)
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
    const lines = getLines()
    lines.forEach((line, idx) => {
        const { dx, dyUp, dyDown } = getTextFrameMetrics(line)
        const textPos = getCanvasPosFromPercent(line.posPercent.x, line.posPercent.y)

        if (line.textAlign === 'left' && (pos.x < textPos.x || pos.x > textPos.x + 2 * dx)) return
        if (line.textAlign === 'center' && (pos.x < textPos.x - dx || pos.x > textPos.x + dx)) return
        if (line.textAlign === 'right' && (pos.x < textPos.x - 2 * dx || pos.x > textPos.x)) return
        if (pos.y < textPos.y - dyUp || pos.y > textPos.y + dyDown) return

        res = idx
    })
    return res
}

function getTextFrameMetrics(line) {
    const elTempCanvas = document.createElement('canvas')
    const tempCtx = elTempCanvas.getContext('2d')

    setTextProps(tempCtx, line)

    const txtMetrics = tempCtx.measureText(line.txt)

    return {
        dx: Math.ceil(txtMetrics.width / 2),
        dyUp: Math.ceil(txtMetrics.fontBoundingBoxAscent),
        dyDown: Math.ceil(txtMetrics.fontBoundingBoxDescent)
    }
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')

    if (elContainer.clientWidth < 200) gElCanvas.width = 200
    else if (elContainer.clientWidth < 400) gElCanvas.width = elContainer.clientWidth
    else gElCanvas.width = 400
}

function getImgDataUrl() {
    return gElCanvas.toDataURL('image/jpeg')
}
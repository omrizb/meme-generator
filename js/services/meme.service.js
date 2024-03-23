'use strict'

const MEME_DATA = 'memeData'

const gMemeLines = [
    'Monday vs. Friday: a mystery.',
    'Smile, while your teeth last.',
    'Exercise? Nope, extra fries.',
    'Lost? Me? Always.',
    'Reality called. Hung up.',
    'Need a year-long holiday.',
    'Not lazy, energy-saving.',
    'Funny? My meme says no.',
    'Not arguing, just right.',
    'Coffee, because adulting is hard.'
]

let gMemes = []

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

initMemeService()

function initMemeService() {
    gMemes = loadFromLocalStorage(MEME_DATA)

    if (!gMemes || gMemes.length === 0) gMemes = []
}

function getMeme(id) {
    return structuredClone(gMemes.find(meme => meme.id === id))
}

function getNewMeme(imgId) {
    const newLine = getRandomLine()
    newLine.posPercent = { x: 50, y: 20 }

    return {
        id: generateRandId(6),
        img: getImg(imgId),
        lines: [newLine],
        snapshotImgData: '',
        isSaved: false
    }
}

function getNewLine({ txt, strokeStyle, fillStyle, textAlign, posPercent }) {
    return {
        txt,
        fontFace: 'arial',
        fontSize: 26,
        lineWidth: 1,
        strokeStyle,
        fillStyle,
        isDrag: false,
        textAlign,
        posPercent: {
            x: posPercent.x,
            y: posPercent.y
        }
    }
}

function getRandomLine() {
    return getNewLine({
        txt: getRandomLineTxt(),
        strokeStyle: getRandomColor(),
        fillStyle: getRandomColor(),
        textAlign: 'center',
        posPercent: {
            x: 0,
            y: 0
        }
    })
}

function getRandomLineTxt() {
    const randLineIdx = getRandomInt(0, gMemeLines.length)
    return gMemeLines[randLineIdx]
}

function getAllMemes() {
    return structuredClone(gMemes)
}

function addMemeLine(id, line) {
    const meme = getMeme(id)
    const newLine = {
        txt: line.txt,
        fontFace: line.fontFace,
        fontSize: line.fontSize,
        lineWidth: line.lineWidth,
        strokeStyle: line.strokeStyle,
        fillStyle: line.fillStyle,
        isDrag: false,
        textAlign: line.textAlign,
        posPercent: {
            x: line.posPercent.x,
            y: line.posPercent.y
        }
    }
    meme.lines.push(newLine)
    return meme.lines[meme.lines.length - 1]
}

function saveMeme(memeToSave) {
    console.log
    if (!memeToSave.isSaved) {
        gMemes.push(memeToSave)
        memeToSave.isSaved = true
        saveToLocalStorage(MEME_DATA, gMemes)
        return
    }

    gMemes.forEach((meme, idx) => {
        if (meme.id === memeToSave.id) {
            gMemes[idx] = memeToSave
            saveToLocalStorage(MEME_DATA, gMemes)
        }
    })
}

function deleteMeme(memeId) {
    const idx = gMemes.findIndex(meme => meme.id === memeId)
    gMemes.splice(idx, 1)
    saveToLocalStorage(MEME_DATA, gMemes)
}


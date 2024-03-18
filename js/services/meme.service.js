'use strict'

let gMemes = [
    {
        id: '123',
        img: getImg('5'),
        lines: [
            {
                txt: 'I sometimes eat Falafel',
                fontFace: 'arial',
                fontSize: '30',
                lineWidth: '1',
                strokeStyle: '#ff0000',
                fillStyle: '#ffff00',
                isDrag: false,
                posPercent: {
                    x: 50,
                    y: 20
                }
            },
            {
                txt: 'And I like it',
                fontFace: 'arial',
                fontSize: '45',
                lineWidth: '1',
                strokeStyle: '#00008b',
                fillStyle: '#ffffff',
                isDrag: false,
                posPercent: {
                    x: 65,
                    y: 80
                }
            }
        ]
    }
]

let gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function getMeme(id) {
    return structuredClone(gMemes.find(meme => meme.id === id))
}

function getNewMeme(imgId) {
    return {
        id: generateRandId(6),
        img: getImg(imgId),
        lines: [
            {
                txt: 'Enter your meme...',
                fontFace: 'arial',
                fontSize: '30',
                lineWidth: '1',
                strokeStyle: '#ff0000',
                fillStyle: '#ffff00',
                isDrag: false,
                posPercent: {
                    x: 50,
                    y: 20
                }
            },
        ]
    }
}

function getNewLine(txt) {
    return {
        txt,
        fontFace: 'arial',
        fontSize: 30,
        lineWidth: 1,
        strokeStyle: '#000000',
        fillStyle: '#ffffff',
        isDrag: false,
        posPercent: {
            x: 0,
            y: 0
        }
    }
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
        posPercent: {
            x: line.posPercent.x,
            y: line.posPercent.y
        }
    }
    meme.lines.push(newLine)
    return meme.lines[meme.lines.length - 1]
}

function setMemeLineTxt(id, lineIdx, line) {
    const meme = getMeme(id)
    meme.lines[lineIdx].txt = line.txt
}

function updateMemeLine(id, lineIdx, newLine) {
    const meme = getMeme(id)
    meme.lines[lineIdx] = deepMerge(meme.lines[lineIdx], newLine)
}

function deleteMemeLine(id, lineIdx) {
    const meme = getMeme(id)
    meme.lines.splice(lineIdx, 1)
}

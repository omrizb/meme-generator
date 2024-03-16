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
                strokeStyle: 'red',
                fillStyle: 'yellow',
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
                strokeStyle: 'darkblue',
                fillStyle: 'white',
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
    return gMemes.find(meme => meme.id === id)
}

function getAllMemes() {
    return gMemes
}

function setMemeLineTxt(id, lineIdx, txt) {
    const meme = getMeme(id)
    meme.lines[lineIdx].txt = txt
}

function deleteMeme(id) {

}

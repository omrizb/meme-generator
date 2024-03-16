'use strict'

let gImgs = [
    { id: '1', url: './assets/images/memes-square/1.jpg', keywords: ['funny', 'cat'] },
    { id: '2', url: './assets/images/memes-square/2.jpg', keywords: ['funny', 'cat'] },
    { id: '3', url: './assets/images/memes-square/3.jpg', keywords: ['funny', 'cat'] },
    { id: '4', url: './assets/images/memes-square/4.jpg', keywords: ['funny', 'cat'] },
    { id: '5', url: './assets/images/memes-square/5.jpg', keywords: ['funny', 'cat'] },
    { id: '6', url: './assets/images/memes-square/6.jpg', keywords: ['funny', 'cat'] },
    { id: '7', url: './assets/images/memes-square/7.jpg', keywords: ['funny', 'cat'] },
    { id: '8', url: './assets/images/memes-square/8.jpg', keywords: ['funny', 'cat'] },
    { id: '9', url: './assets/images/memes-square/9.jpg', keywords: ['funny', 'cat'] },
    { id: '10', url: './assets/images/memes-square/10.jpg', keywords: ['funny', 'cat'] },
    { id: '11', url: './assets/images/memes-square/11.jpg', keywords: ['funny', 'cat'] },
    { id: '12', url: './assets/images/memes-square/12.jpg', keywords: ['funny', 'cat'] },
    { id: '13', url: './assets/images/memes-square/13.jpg', keywords: ['funny', 'cat'] },
    { id: '14', url: './assets/images/memes-square/14.jpg', keywords: ['funny', 'cat'] },
    { id: '15', url: './assets/images/memes-square/15.jpg', keywords: ['funny', 'cat'] },
    { id: '16', url: './assets/images/memes-square/16.jpg', keywords: ['funny', 'cat'] },
    { id: '17', url: './assets/images/memes-square/17.jpg', keywords: ['funny', 'cat'] },
    { id: '18', url: './assets/images/memes-square/18.jpg', keywords: ['funny', 'cat'] },
]

function getImg(id) {
    return gImgs.find(img => img.id === id)
}

function getAllImgs() {
    return gImgs
}

function getRandImg() {
    let randIdx = getRandomInt(0, gImgs.length)
    return gImgs[randIdx]
}
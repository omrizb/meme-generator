'use strict'

function generateRandId(length) {
    let result = ''
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        const randIdx = getRandomInt(0, chars.length)
        result += chars[randIdx]
    }
    return result
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min)
    const maxFloored = Math.floor(max)
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}

function deepMerge(target, source) {
    const isObject = (obj) => obj && typeof obj === 'object'

    if (!isObject(target) || !isObject(source)) {
        return source
    }

    Object.keys(source).forEach(key => {
        const targetValue = target[key]
        const sourceValue = source[key]

        if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
            target[key] = targetValue.concat(sourceValue)
        } else if (isObject(targetValue) && isObject(sourceValue)) {
            target[key] = mergeDeep(Object.assign({}, targetValue), sourceValue)
        } else {
            target[key] = sourceValue
        }
    })

    return target
}

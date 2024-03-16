'use strict'

function saveToLocalStorage(key, value) {
    const valStr = JSON.stringify(value)
    localStorage.setItem(key, valStr)
}

function loadFromLocalStorage(key) {
    const valStr = localStorage.getItem(key)
    return JSON.parse(valStr)
}
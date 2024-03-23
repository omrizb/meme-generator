'use strict'

let gCurrPageSection = 'gallery'
let gMsgBoxTimeout

function onInit() {
    setActiveSection()
    renderGallery()
}

function onSetActiveSection(section) {
    gCurrPageSection = section
    setActiveSection()

    if (section === 'saved') initSavedMemes()
}

function setActiveSection() {
    const elPageSections = document.querySelectorAll('section.page')
    elPageSections.forEach(page => {
        if (page.classList.contains(gCurrPageSection)) page.classList.remove('hidden')
        else page.classList.add('hidden')
    })
}

function activateMsgBox(msg) {
    const elMsgBox = document.querySelector('.msg-box')
    elMsgBox.textContent = msg

    elMsgBox.classList.add('show-box')

    if (gMsgBoxTimeout) clearTimeout(gMsgBoxTimeout)

    gMsgBoxTimeout = setTimeout(() => {
        elMsgBox.classList.remove('show-box')
    }, 2000);
}
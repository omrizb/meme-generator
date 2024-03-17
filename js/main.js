'use strict'

let gCurrPageSection = 'editor'

function onInit() {
    setActiveSection()
    renderGallery()
    initMemeEditor('123', null)
}

function onSetActiveSection(section) {
    gCurrPageSection = section
    setActiveSection()
}

function setActiveSection() {
    const elPageSections = document.querySelectorAll('section.page')
    elPageSections.forEach(page => {
        if (page.classList.contains(gCurrPageSection)) page.classList.remove('hidden')
        else page.classList.add('hidden')
    })
}
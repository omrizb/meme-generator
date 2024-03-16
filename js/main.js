'use strict'

let gCurrPageSection = 'editor'

function onInit() {
    setActiveSection()
    renderGallery()
    initMemeCanvas()
    renderMeme()
}

function onSetActiveSection(elPageBtn) {
    gCurrPageSection = elPageBtn.dataset.page
    setActiveSection()
}

function setActiveSection() {
    const elPageSections = document.querySelectorAll('section.page')
    elPageSections.forEach(page => {
        if (page.classList.contains(gCurrPageSection)) page.classList.remove('hidden')
        else page.classList.add('hidden')
    })
}
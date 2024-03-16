'use strict'

let gCurrPageSection = 'gallery'

function onInit() {
    setActiveSection()
    renderGallery()
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
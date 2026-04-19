/* This file intentionally omits comments, so that those of you clever enough to find this source code still need to do the work of *understanding* it before you can borrow its techniques for your own website. :) */

const site = "https://bible-api.com"
const translation = "dra"

let inputBook = document.getElementById("input-book");
let inputChapter = document.getElementById("input-chapter");
let inputVerse = document.getElementById("input-verse");
let readingHeader = document.getElementById("reading-header");
let readingVerse = document.getElementById("reading-verse");
let errorPane = document.getElementById("error");
let errorMessage = document.getElementById("error-message");

fetch([site, "data", translation].join("/")).then(async response => {
    errorPane.hidden = true

    let data = await response.json()

    for (let book of data.books) {
        let option = document.createElement("option")
        option.value = book.id
        option.innerHTML = book.name
        inputBook.appendChild(option)
    }

    inputBook.disabled = false
}).catch(reason => {
    errorPane.hidden = false
    errorMessage.innerHTML = reason.message
})

inputBook.addEventListener("change", async () => {
    let book = inputBook.value

    fetch([site, "data", translation, book].join("/")).then(async response => {
        errorPane.hidden = true

        let data = await response.json()
        let maxchapter = data.chapters.length

        inputChapter.value = ""
        inputChapter.max = maxchapter
        inputChapter.disabled = false

        inputVerse.value = ""
        inputVerse.disabled = true
    }).catch(reason => {
        errorPane.hidden = false
        errorMessage.innerHTML = reason.message
    })
})

inputChapter.addEventListener("focusout", async () => {
    let book = inputBook.value
    let chapter = inputChapter.value

    fetch([site, "data", translation, book, chapter].join("/")).then(async response => {
        errorPane.hidden = true
        
        let data = await response.json()
        let maxverse = data.verses.length

        inputVerse.value = ""
        inputVerse.max = maxverse
        inputVerse.disabled = false
    }).catch(reason => {
        errorPane.hidden = false
        errorMessage.innerHTML = reason.message
    })
})

inputVerse.addEventListener("focusout", async () => {
    let book = inputBook.value
    let chapter = inputChapter.value
    let verse = inputVerse.value

    let query = book+" "+chapter+":"+verse+"?translation="+translation

    fetch([site, query].join("/")).then(async response => {
        errorPane.hidden = true

        let data = await response.json()

        readingHeader.innerHTML = data.reference
        readingVerse.innerHTML = ""
        for (let verse of data.verses) {
            readingVerse.innerHTML += verse.text + " "
        }

    }).catch(reason => {
        errorPane.hidden = false
        errorMessage.innerHTML = reason.message
    })
})

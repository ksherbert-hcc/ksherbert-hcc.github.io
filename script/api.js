// Remember some commonly recurring strings needed for fetch requests.
const site = "https://bible-api.com"
const translation = "dra"

// Load all relevant DOM objects into variables.
let inputBook = document.getElementById("input-book");
let inputChapter = document.getElementById("input-chapter");
let inputVerse = document.getElementById("input-verse");
let readingHeader = document.getElementById("reading-header");
let readingVerse = document.getElementById("reading-verse");
let errorPane = document.getElementById("error");
let errorMessage = document.getElementById("error-message");

// Fill the list of books.
fetch([site, "data", translation].join("/")).then(async response => {
    // Request successful, so hide the error pane.
    errorPane.hidden = true

    // Fill up <option> elements of the <select> element, using JSON data. 
    let data = await response.json()
    for (let book of data.books) {
        let option = document.createElement("option")
        option.value = book.id
        option.innerHTML = book.name
        inputBook.appendChild(option)
    }

    // Enable the button.
    inputBook.disabled = false
}).catch(reason => {
    // Request failed, so show the error pane.
    errorPane.hidden = false
    errorMessage.innerHTML = reason.message
})

// Fill the list of chapters.
inputBook.addEventListener("change", async () => {
    let book = inputBook.value

    fetch([site, "data", translation, book].join("/")).then(async response => {
        // Request successful, so hide the error pane.
        errorPane.hidden = true

        // How many chapters are in this book?
        let data = await response.json()
        let maxchapter = data.chapters.length

        // Enable the chapter selector.
        inputChapter.value = ""
        inputChapter.max = maxchapter
        inputChapter.disabled = false

        // Disable the verse selector (until a chapter is selected).
        inputVerse.value = ""
        inputVerse.disabled = true
    }).catch(reason => {
        // Request failed, so show the error pane.
        errorPane.hidden = false
        errorMessage.innerHTML = reason.message
    })
})

// Fill the list of verses.
inputChapter.addEventListener("focusout", async () => {
    let book = inputBook.value
    let chapter = inputChapter.value

    fetch([site, "data", translation, book, chapter].join("/")).then(async response => {
        // Request successful, so hide the error pane.
        errorPane.hidden = true
        
        // How many verses are in this book?
        let data = await response.json()
        let maxverse = data.verses.length

        // Enable the verse selector.
        inputVerse.value = ""
        inputVerse.max = maxverse
        inputVerse.disabled = false
    }).catch(reason => {
        // Request failed, so show the error pane.
        errorPane.hidden = false
        errorMessage.innerHTML = reason.message
    })
})

// Display a verse.
inputVerse.addEventListener("focusout", async () => {
    let book = inputBook.value
    let chapter = inputChapter.value
    let verse = inputVerse.value

    let query = book+" "+chapter+":"+verse+"?translation="+translation

    fetch([site, query].join("/")).then(async response => {
        // Request successful, so hide the error pane.
        errorPane.hidden = true

        // Fill the HTML with actual text.
        let data = await response.json()
        readingHeader.innerHTML = data.reference
        readingVerse.innerHTML = ""
        for (let verse of data.verses) {
            readingVerse.innerHTML += verse.text + " "
        }

    }).catch(reason => {
        // Request failed, so show the error pane.
        errorPane.hidden = false
        errorMessage.innerHTML = reason.message
    })
})

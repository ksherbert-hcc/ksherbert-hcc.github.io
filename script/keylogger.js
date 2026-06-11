let keylog = {}         // To track times each key is counted.

window.addEventListener("keyup", logKeys);  // Listen for key-presses.

function logKeys(event) {
    // 1. Whenever the user types a character, update an object which tracks the number of times a given character has been typed.
    let clicked = event.key;
    if (clicked in keylog) {
        keylog[clicked] += 1;
    } else {
        keylog[clicked] = 1;
    }
    
    // 2. Whenever the user types a character, use a for-loop to display the number of times each character has been typed to the console.
    console.log("Keys logged so far:")
    for (let key in keylog) {
        console.log(key+": "+keylog[key]);
    }
    console.log("");

    // 3. Write in some special rules to modify the styling of the homepage once the user types a certain character a certain number of times.
    //    For example, you could cause the background color of your website to change once the user has typed the spacebar 5 times.
    if (keylog[" "] >= 5) {
        document.body.style.setProperty("background-color", "pink");
    }
}
/* This file intentionally omits comments, so that those of you clever enough to find this source code still need to do the work of *understanding* it before you can borrow its techniques for your own website. :) */

exhibits = document.getElementsByClassName("collapsible");
for (let exhibit of exhibits) {
    exhibit.classList.add("expanded");
    let button = document.createElement("button");
    button.textContent = "-";
    button.addEventListener("click", event => toggle(exhibit, event))
    exhibit.prepend(button);
    toggle(exhibit, null);
}

function toggle(exhibit, event) {
    if (exhibit.classList.contains("expanded")) {
        exhibit.classList.remove("expanded");
        exhibit.children[0].textContent = "+";
        for (let i = 3; i < exhibit.children.length; i ++) {
            exhibit.children[i].hidden = true;
        }
    } else {
        exhibit.classList.add("expanded");
        exhibit.children[0].textContent = "-";
        for (let i = 3; i < exhibit.children.length; i ++) {
            exhibit.children[i].hidden = false;
        }
    }
}
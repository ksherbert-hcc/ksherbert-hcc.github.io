/* This file intentionally omits comments, so that those of you clever enough to find this source code still need to do the work of *understanding* it before you can borrow its techniques for your own website. :) */

function toggleExpanded(exhibit, event) {
    exhibit.classList.toggle("expanded");
    setVisibility(exhibit);
}

function setVisibility(exhibit) {
    let expanded = exhibit.classList.contains("expanded");
    exhibit.children[0].textContent = expanded ? "-" : "+";
    for (let i = 1; i < exhibit.children.length; i ++) {
        if (exhibit.children[i].classList.contains("title")) continue;
        if (exhibit.children[i].classList.contains("summary")) {
            exhibit.children[i].hidden = expanded;
        } else {
            exhibit.children[i].hidden = !expanded;
        }
    }
}

exhibits = document.getElementsByClassName("collapsible");
for (let exhibit of exhibits) {
    let button = document.createElement("button");
    button.addEventListener("click", event => toggleExpanded(exhibit, event))
    exhibit.prepend(button);
    setVisibility(exhibit);
}

if (window.location.hash) {
    let startingNode = document.querySelector(window.location.hash);
    if (startingNode.classList.contains("collapsible")) {
        toggle(startingNode, null);
        startingNode.scrollIntoView();
    }
}

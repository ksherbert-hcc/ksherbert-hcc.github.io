// IDENTIFY SERVER 
let server = "http://localhost:5000/submit";

// ALIAS DOCUMENT ELEMENTS
let form = document.forms["form"];
let tableBody = document.querySelector("#table-body");
let addRow = document.querySelector("#add-row");
let removeRow = document.querySelector("#remove-row");
let submit = document.querySelector("#submit");
let feedback = document.querySelector("#feedback");

// ADD A ROW
addRow.addEventListener("click", function() {
    // Copy the last row in the table.
    let lastRow = tableBody.children[tableBody.children.length - 1];
    let newRow = lastRow.cloneNode(true);

    // Modify attributes and values of the new row.
    let newIndex = tableBody.children.length;
    for (let input of newRow.getElementsByClassName("table-input")) {
        // Modify the index label.
        newRow.children[0].textContent = newIndex;

        // Modify the names for each input to use the next index up.
        [field, lastIndex] = input.name.split("-");
        input.name = field + "-" + newIndex;

        // Copy values for the college competency and data source.
        if (field === "CC" || field === "DS") {
            input.value = form[field+"-"+lastIndex].value;
        }
    }

    // Add the row to the table.
    tableBody.appendChild(newRow);
    
    // Enable the remove row button.
    removeRow.disabled = false;
});

// REMOVE A ROW
removeRow.addEventListener("click", function() {
    // Remove the last row in the table.
    let lastRow = tableBody.children[tableBody.children.length - 1];
    tableBody.removeChild(lastRow);

    // Disable the remove row button if there is only one data row left.
    if (tableBody.children.length < 2) {
        removeRow.disabled = true;
    } 
});

// SUBMIT FORM
form.addEventListener("submit", async function(event) {
    // Do not refresh page!
    event.preventDefault();

    // Consolidate all form data into a single JSON object.
    let json = {
        "academic-program": form["academic-program"].value,
        "academic-year": form["academic-year"].value,
        "semester": form["semester"].value,
        "rows": [],
    }

    for (let ix = 0; ix < tableBody.children.length; ix ++) {
        json.rows.push({
            "college-competency": form["CC-"+ix].value,
            "data-source": form["DS-"+ix].value,
            "data-label": form["LB-"+ix].value,
            "advancing": form["Ad-"+ix].value,
            "achieving": form["Ac-"+ix].value,
            "approaching": form["Ap-"+ix].value,
            "emerging": form["Em-"+ix].value,
        });
    }

    // Send JSON to the server.

    // First wrap it into a form. (I've the intuition this shouldn't be necessary, but CORS is throwing off my debugging.)
    let newForm = new FormData();
    newForm.append("json", JSON.stringify(json));

    fetch(server, {
        method: "POST",
        body: newForm,
    }).then(response => response.json()).then(message => {
        if (message !== "success") throw message;
        console.log("Data submitted!");
        feedback.textContent = "Submission successful! Thank you for your effort.";
        submit.disabled = true;
    }).catch(error => {
        console.log("Error in submission procedure:\n"+error);
        feedback.textContent = "Error in submission procedure:<br>"+error;
    })



    
    // Manually send a distinct POST for each row of the table.
    /* I don't like this method because it's conceivable SOME data transfers but not the rest.
       Instead we will wrap all data into a JSON structure and let the server script handle breaking it down row-by-row. */
    /*
    let successes = Array(tableBody.children.length).fill(false);
    for (let ix = 0; ix < tableBody.children.length; ix ++) {
        // Consolidate data for a single POST.
        let newForm = new FormData();
        newForm.append("academic-program", form["academic-program"].value);
        newForm.append("academic-year", form["academic-year"].value);
        newForm.append("semester", form["semester"].value);
        newForm.append("college-competency", form["CC-"+ix].value);
        newForm.append("data-source", form["DS-"+ix].value);
        newForm.append("data-label", form["LB-"+ix].value);
        newForm.append("advancing", form["Ad-"+ix].value);
        newForm.append("achieving", form["Ac-"+ix].value);
        newForm.append("approaching", form["Ap-"+ix].value);
        newForm.append("emerging", form["Em-"+ix].value);

        // Send the POST.
        try {
            let response = await fetch(server, {
                method: "POST",
                body: newForm,
            });
            let responseData = await response.json();
            if (responseData !== "success") throw "error";
            successes[ix] = true;
        } catch(error) {
            console.log("Failure for row "+ix+":\n"+error);
        }
    }


    if (successes.every(x => x)) {
        // TODO: Display a message saying form was sent.
    } else if (successes.some(x => x)) {
        // TODO: Indicate which rows were unsuccessful.
        // NOTE: handling this situation is where I despaired of the POST protocol, and switched to JSON.
    } else {
        // TODO: Display a message saying form failed to send.
    }
    */

});
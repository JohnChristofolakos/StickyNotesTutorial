function makeEditable(note) {
    var actionBar = note.getElementsByClassName("action")[0];

    var editButton = document.createElement("img");
    editButton.src = "images/ic_edit_black_24px.svg";
    editButton.className = "edit button";
    editButton.onclick = startEdit;
    actionBar.appendChild(editButton);

    var cancelButton = document.createElement("img");
    cancelButton.src = "images/ic_clear_black_24px.svg";
    cancelButton.className = "cancel button button_hidden";
    cancelButton.onclick = cancelEdit;
    actionBar.appendChild(cancelButton);

    var doneButton = document.createElement("img");
    doneButton.src = "images/ic_done_black_24px.svg";
    doneButton.className = "done button button_hidden";
    doneButton.onclick = saveEdit;
    actionBar.appendChild(doneButton);
}

function startEdit() {
    var actionBar = this.parentElement;
    var note = actionBar.parentElement;

    // make the textarea editable
    note.querySelector("textarea").readOnly = false;

    // update button visibility
    actionBar.querySelector(".edit").classList.add("button_hidden");
    actionBar.querySelector(".done").classList.remove("button_hidden");
    actionBar.querySelector(".cancel").classList.remove("button_hidden");
}

function saveEdit() {
    // TODO
}

function cancelEdit() {
    // TODO
}

window.onload = function() {
    for (var note of document.getElementsByClassName("note")) {
        makeEditable(note);
    }
}

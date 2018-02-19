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

var savedText;

function startEdit() {
    var actionBar = this.parentElement;
    var note = actionBar.parentElement;

    // make the textarea editable
    note.querySelector("textarea").readOnly = false;

    // update button visibility
    actionBar.querySelector(".edit").classList.add("button_hidden");
    actionBar.querySelector(".done").classList.remove("button_hidden");
    actionBar.querySelector(".cancel").classList.remove("button_hidden");
    
    // save the current text
    savedText = note.querySelector("textarea").value;
}

function saveEdit() {
    var actionBar = this.parentElement;
    var note = actionBar.parentElement;

    // update button visibility
    actionBar.querySelector(".edit").classList.remove("button_hidden");
    actionBar.querySelector(".done").classList.add("button_hidden");
    actionBar.querySelector(".cancel").classList.add("button_hidden");

    // make the textarea uneditable
    note.querySelector("textarea").readOnly = true;
}

function cancelEdit() {
    var actionBar = this.parentElement;
    var note = actionBar.parentElement;
    note.querySelector("textarea").value = savedText;

    actionBar.querySelector(".done").onclick();
}

var prevOnload = window.onload;
window.onload = function() {
    for (var note of document.getElementsByClassName("note")) {
        makeEditable(note);
    }
    if (prevOnload) {
        prevOnload.apply(this, arguments);
    }
}

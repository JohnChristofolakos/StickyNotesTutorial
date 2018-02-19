function makeEditable(note) {
    var actionBar = note.getElementsByClassName("action")[0];

    var editButton = document.createElement("img");
    editButton.src = "images/ic_edit_black_24px.svg";
    editButton.className = "edit button";
    editButton.onclick = startEdit;
    actionBar.appendChild(editButton);
}

function startEdit() {
    // TODO
}

window.onload = function() {
    for (var note of document.getElementsByClassName("note")) {
        makeEditable(note);
    }
}

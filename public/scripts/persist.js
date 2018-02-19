var persist = function() {
    function saveNotes() {
        var notes = [];    // build an array containing note text and positions
        Array.from(document.getElementsByClassName("note")).forEach( function(note) {
            var textArea = note.querySelector("textarea");
            notes.push({
                text: textArea.value,
                top: note.offsetTop,
                left: note.offsetLeft
            });
        });

        // send it to the server
        xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/notes");
        xhr.send( JSON.stringify(notes) );
        }

    function loadNotes() {
        xhr = new XMLHttpRequest();
        xhr.onload = loadRequestReady;
        xhr.open("GET", "/api/notes");
        xhr.send();
    }
    
    function loadRequestReady() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                rebuildNotes(JSON.parse(xhr.responseText));
            }
            else {
                alert("Cannot load notes, status = " + xhr.status);
            }
        }
    }

    function rebuildNotes(notesArray) {
        // get rid of the existing notes
        Array.from(document.getElementsByClassName("note")).forEach( function(note) {
            note.remove();
        });

        // rebuild each download note and add to the document
        notesArray.forEach( function(noteObj) {
            // create the <div> for the note
            var noteElem = document.createElement("div");
            noteElem.className = "note";
            noteElem.style.top = noteObj.top + "px";
            noteElem.style.left = noteObj.left + "px";

            // create the <div> for the action bar and add it to the note
            var actionBar = document.createElement("div");
            actionBar.className = "action";
            noteElem.appendChild(actionBar);

            // create the note's text area and add it to the note
            var textArea = document.createElement("textarea");
            textArea.readOnly = true;
            textArea.value = noteObj.text;
            noteElem.appendChild(textArea);
    
            // make the note draggable and editable
            editable.makeEditable(noteElem);
            draggable.makeDraggable(noteElem);

            // add the note to the document body
            document.body.appendChild(noteElem);
        });
    }
    
    var prevOnload = window.onload;
    window.onload = function() {
        loadNotes();

        if (prevOnload) {
            prevOnload.apply(this, arguments);
        }
    }

    return {
        saveNotes: saveNotes
    };
} ()

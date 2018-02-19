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
                alert(xhr.responseText);            // TODO
            }
            else {
                alert("Cannot load notes, status = " + xhr.status);
            }
        }
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

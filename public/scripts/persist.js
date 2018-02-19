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

    return {
        saveNotes: saveNotes
    };
} ()

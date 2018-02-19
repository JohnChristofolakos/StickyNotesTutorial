var draggable = (function() {
    function makeUndraggable(elem) {
        elem.onmousedown = null;
    }

    function makeDraggable(elem) {
        var currX, currY;

        elem.onmousedown = startDragging;

        function startDragging(e) {
            e = e || window.event;

            // get the current mouse cursor position
            currX = e.clientX;
            currY = e.clientY;

            // set handlers for mouse move, up
            document.onmousemove = continueDragging;
            document.onmouseup = endDragging;
        }

        function continueDragging(e) {
            e = e || window.event;

            // calculate the mouse movement
            offsetX = e.clientX - currX;
            offsetY = e.clientY - currY;
            currX = e.clientX;
            currY = e.clientY;

            // set the element's new position:
            elem.style.top = (elem.offsetTop + offsetY) + "px";
            elem.style.left = (elem.offsetLeft + offsetX) + "px";
        }

        function endDragging(e) {
            e = e || window.event;     

            // clear the handlers when the mouse button is released
            document.onmousemove = null;
            document.onmouseup = null;
    
            // save the notes
            persist.saveNotes();
        }
    }

    var prevOnload = window.onload;
    window.onload = function() {
        for (var elem of document.getElementsByClassName("note")) {
            makeDraggable(elem);
        }
        if (prevOnload) {
            prevOnload.apply(this, arguments);
        }
    }

    return {
        makeDraggable: makeDraggable,
        makeUndraggable: makeUndraggable
    };
} () )

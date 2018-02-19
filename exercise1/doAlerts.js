function doAlerts(n) { 
    for (var i = 0; i < n; i++ ) {
        setTimeout( function() { alert("Alert number " + i); },
            i * 100
        );
    };
}
doAlerts(3);

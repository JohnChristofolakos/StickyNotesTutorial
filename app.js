var fs = require("fs-extra");
var path = require("path");
var express = require("express");
var app = express();

app.use(express.static("public"));

app.get("/api/notes", function(req, res) {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

    var notes = fs.readJsonSync(path.resolve(__dirname, "notes.json"));
    res.json(notes);
});

var server = app.listen(3000);
